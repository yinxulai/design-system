import { readFile, readdir } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const componentRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
)
const sourceRoot = path.join(componentRoot, "source")
const categories = await readdir(sourceRoot, { withFileTypes: true })
const registryPaths = categories
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(sourceRoot, entry.name, "registry.json"))

const items = new Map()
const targetToItem = new Map()

for (const registryPath of registryPaths) {
  let registry
  try {
    registry = JSON.parse(await readFile(registryPath, "utf8"))
  } catch (error) {
    if (error?.code === "ENOENT") continue
    throw error
  }

  for (const item of registry.items ?? []) {
    if (items.has(item.name)) {
      throw new Error(`Duplicate registry item: ${item.name}`)
    }

    const record = { ...item, registryPath }
    items.set(item.name, record)
    for (const file of item.files ?? []) {
      if (file.target) {
        targetToItem.set(file.target.replace(/\.(?:ts|tsx)$/, ""), item.name)
      }
    }
  }
}

const errors = []

function packageName(specifier) {
  if (!specifier.startsWith("@")) return specifier.split("/")[0]
  return specifier.split("/").slice(0, 2).join("/")
}

function collectDependencies(itemName, visited = new Set()) {
  if (visited.has(itemName)) return new Set()
  visited.add(itemName)

  const item = items.get(itemName)
  if (!item) return new Set()

  const dependencies = new Set(
    (item.dependencies ?? []).map((dependency) =>
      dependency.startsWith("@")
        ? dependency.split("@").slice(0, 2).join("@")
        : dependency.split("@")[0]
    )
  )

  for (const dependencyName of item.registryDependencies ?? []) {
    for (const dependency of collectDependencies(dependencyName, visited)) {
      dependencies.add(dependency)
    }
  }

  return dependencies
}

for (const [itemName, item] of items) {
  const registryDependencies = new Set(item.registryDependencies ?? [])
  for (const dependencyName of registryDependencies) {
    if (!items.has(dependencyName)) {
      errors.push(`${itemName}: unknown registry dependency "${dependencyName}"`)
    }
  }

  const availablePackages = collectDependencies(itemName)
  for (const file of item.files ?? []) {
    const sourcePath = path.join(path.dirname(item.registryPath), file.path)
    const source = await readFile(sourcePath, "utf8")
    const imports = source.matchAll(/from\s+["']([^"']+)["']/g)

    for (const [, specifier] of imports) {
      if (specifier.startsWith("@aurora/")) {
        const dependencyName = targetToItem.get(specifier)
        if (!dependencyName) {
          errors.push(`${itemName}: unresolved internal import "${specifier}"`)
        } else if (
          dependencyName !== itemName &&
          !registryDependencies.has(dependencyName)
        ) {
          errors.push(
            `${itemName}: internal import "${specifier}" requires registry dependency "${dependencyName}"`
          )
        }
        continue
      }

      if (specifier.startsWith(".") || ["react", "lucide-react"].includes(specifier)) {
        continue
      }

      const dependency = packageName(specifier)
      if (!availablePackages.has(dependency)) {
        errors.push(
          `${itemName}: package import "${dependency}" is not declared by the item or its registry dependencies`
        )
      }
    }
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"))
  process.exitCode = 1
} else {
  console.log(`Validated ${items.size} registry items.`)
}
