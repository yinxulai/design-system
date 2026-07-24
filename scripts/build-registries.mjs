import { spawn } from "node:child_process"
import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const outputDirectory = path.join(rootDirectory, "output")

function run(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: process.env,
      stdio: "inherit",
    })

    child.on("error", reject)
    child.on("exit", (code, signal) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(
        new Error(
          `${command} ${args.join(" ")} failed${
            signal ? ` with signal ${signal}` : ` with exit code ${code}`
          }`,
        ),
      )
    })
  })
}

async function discoverRegistries() {
  const entries = await readdir(rootDirectory, { withFileTypes: true })
  const registries = []

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith(".")) continue

    const componentDirectory = path.join(rootDirectory, entry.name, "component")
    const registryPath = path.join(componentDirectory, "registry.json")
    const packagePath = path.join(componentDirectory, "package.json")
    const lockfilePath = path.join(componentDirectory, "package-lock.json")
    const metadataPath = path.join(componentDirectory, "site.json")

    try {
      const [registrySource, packageSource] = await Promise.all([
        readFile(registryPath, "utf8"),
        readFile(packagePath, "utf8"),
        readFile(lockfilePath, "utf8"),
      ])
      const registry = JSON.parse(registrySource)
      const packageJson = JSON.parse(packageSource)
      let metadata = {}

      try {
        metadata = JSON.parse(await readFile(metadataPath, "utf8"))
      } catch (metadataError) {
        if (metadataError?.code !== "ENOENT") throw metadataError
      }

      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.name)) {
        throw new Error(
          `Design system directory "${entry.name}" must use a lowercase kebab-case name.`,
        )
      }
      if (!packageJson.scripts?.build || !packageJson.scripts?.check) {
        throw new Error(
          `${path.relative(rootDirectory, packagePath)} must define "build" and "check" scripts.`,
        )
      }

      registries.push({
        id: entry.name,
        name: registry.name ?? entry.name,
        componentDirectory,
        metadata,
      })
    } catch (error) {
      if (error?.code === "ENOENT") continue
      throw error
    }
  }

  if (registries.length === 0) {
    throw new Error("No registries found. Expected <design-system>/component/registry.json.")
  }

  return registries.sort((left, right) => left.id.localeCompare(right.id))
}

async function buildRegistry(registry) {
  const relativeDirectory = path.relative(rootDirectory, registry.componentDirectory)
  const registryOutput = path.join(outputDirectory, registry.id, "r")

  console.log(`\nBuilding ${registry.name} from ${relativeDirectory}`)
  await run("npm", ["ci", "--no-audit", "--no-fund"], registry.componentDirectory)
  await run("npm", ["run", "check"], registry.componentDirectory)
  await run(
    "npm",
    ["run", "build", "--", "--output", registryOutput],
    registry.componentDirectory,
  )

  const builtRegistry = JSON.parse(
    await readFile(path.join(registryOutput, "registry.json"), "utf8"),
  )

  const previewDirectory = path.join(path.dirname(registry.componentDirectory), "preview")
  try {
    await cp(previewDirectory, path.join(outputDirectory, registry.id, "preview"), {
      recursive: true,
    })
  } catch (error) {
    if (error?.code !== "ENOENT") throw error
  }

  return {
    id: registry.id,
    name: registry.name,
    registry: `/${registry.id}/r/registry.json`,
    itemTemplate: `/${registry.id}/r/{name}.json`,
    items: Array.isArray(builtRegistry.items) ? builtRegistry.items.length : 0,
    ...registry.metadata,
  }
}

async function main() {
  const registries = await discoverRegistries()

  await rm(outputDirectory, { recursive: true, force: true })
  await mkdir(outputDirectory, { recursive: true })

  const catalog = []
  for (const registry of registries) {
    catalog.push(await buildRegistry(registry))
  }

  await Promise.all([
    cp(path.join(rootDirectory, "site"), outputDirectory, { recursive: true }),
    writeFile(
      path.join(outputDirectory, "registries.json"),
      `${JSON.stringify({ version: 1, registries: catalog }, null, 2)}\n`,
    ),
    writeFile(
      path.join(outputDirectory, "_headers"),
      "/*\n  Access-Control-Allow-Origin: *\n  X-Content-Type-Options: nosniff\n  Cache-Control: public, max-age=300, s-maxage=3600\n",
    ),
  ])

  console.log(`\nBuilt ${catalog.length} registry to ${path.relative(rootDirectory, outputDirectory)}/`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
