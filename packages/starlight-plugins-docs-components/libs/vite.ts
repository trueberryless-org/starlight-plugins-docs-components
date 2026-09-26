import type { StarlightUserConfig } from "@astrojs/starlight/types";
import type { AstroConfig, ViteUserConfig } from "astro";
import { fileURLToPath } from "node:url";

import type { StarlightPluginsDocsComponentsConfig } from "./config";
import { getI18nContext } from "./i18n";

export function vitePluginStarlightPluginsDocsComponents(
  config: StarlightPluginsDocsComponentsConfig,
  starlightConfig: Pick<StarlightUserConfig, "defaultLocale" | "locales">,
  astroConfig: Pick<AstroConfig, "root">
): VitePlugin {
  const context = getI18nContext(starlightConfig);

  const modules = {
    "virtual:starlight-plugins-docs-components/config": `export default ${JSON.stringify(config)};`,
    "virtual:starlight-plugins-docs-components/context": `export default ${JSON.stringify(context)};`,
    "virtual:starlight-plugins-docs-components/images": getImagesVirtualModule(
      config,
      astroConfig
    ),
  };

  const moduleResolutionMap = Object.fromEntries(
    (Object.keys(modules) as (keyof typeof modules)[]).map((key) => [
      resolveVirtualModuleId(key),
      key,
    ])
  );

  return {
    name: "vite-plugin-starlight-plugins-docs-components",
    load(id) {
      const moduleId = moduleResolutionMap[id];
      return moduleId ? modules[moduleId] : undefined;
    },
    resolveId(id) {
      return Object.hasOwn(modules, id)
        ? resolveVirtualModuleId(id)
        : undefined;
    },
  };
}

function getImagesVirtualModule(
  config: StarlightPluginsDocsComponentsConfig,
  astroConfig: Pick<AstroConfig, "root">
): string {
  const moduleIds = config.showcaseProps.entries.map((entry) =>
    resolveModuleId(entry.thumbnail, astroConfig)
  );

  const imports = moduleIds.map(
    (moduleId, index) =>
      `import thumbnail${index} from ${JSON.stringify(moduleId)};`
  );
  const thumbnails = moduleIds.map((_, index) => `thumbnail${index}`);

  return `${imports.join("\n")}

export const thumbnails = [${thumbnails.join(", ")}];`;
}

function resolveModuleId(
  id: string,
  astroConfig: Pick<AstroConfig, "root">
): string {
  return id.startsWith(".") ? fileURLToPath(new URL(id, astroConfig.root)) : id;
}

function resolveVirtualModuleId<TModuleId extends string>(
  id: TModuleId
): `\0${TModuleId}` {
  return `\0${id}`;
}

type VitePlugin = NonNullable<ViteUserConfig["plugins"]>[number];
