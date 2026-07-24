# Registry deployment

The repository is prepared for a Cloudflare Pages project connected to GitHub. Cloudflare watches the repository, builds every design system registry, and publishes the static JSON output from `output/`.

## Connect Cloudflare Pages

1. In Cloudflare, open **Workers & Pages**, create a Pages project, and connect this GitHub repository.
2. Use `main` as the production branch.
3. Set the build command to `npm run build`.
4. Set the build output directory to `output` and leave the root directory at the repository root.
5. Set `NODE_VERSION` to `22` if the build settings do not detect `.node-version` automatically.
6. Keep automatic production and preview branch deployments enabled.

If the Cloudflare build settings show a separate **Deploy command** field, set it to `npm run deploy`. Do not use `npx wrangler deploy`: that command targets Workers, while this repository is configured as a Pages project.

Leave build watch paths at their default (watch the whole repository). If you later narrow them, include `*/component/**`, `scripts/**`, `package.json`, `package-lock.json`, `wrangler.jsonc`, and `.node-version` so changes to any design system or the shared builder trigger a deployment.

The checked-in `wrangler.jsonc` uses the project name `design-system-registry`. If the Pages project uses another name, update the `name` field to match it before the first deployment.

After the Git integration is connected, each push to `main` publishes production. Other branches and pull requests receive isolated preview deployments.

## Output URLs

For a Pages domain such as `https://design-system-registry.pages.dev`, the generated endpoints are:

```text
https://design-system-registry.pages.dev/registries.json
https://design-system-registry.pages.dev/aurora/r/registry.json
https://design-system-registry.pages.dev/aurora/r/button.json
```

The `_headers` file enables cross-origin requests and applies a short browser cache with a longer Cloudflare edge cache to all published files.

## Add another design system

Create a sibling directory using this contract:

```text
new-system/
  component/
    package.json
    package-lock.json
    registry.json
    source/
```

The directory name must be lowercase kebab-case. The component package must provide `check` and `build` scripts, and its `build` script must pass additional CLI arguments through to `shadcn build`. The root builder discovers it automatically and publishes it at `/new-system/r/`.

Run the same build locally before pushing:

```bash
npm run build
```
