import type { ViteUserConfig } from "astro";

import type { StarlightPluginsDocsComponentsConfig } from "..";

export function vitePluginStarlightPluginsDocsComponentsConfig(
    config: StarlightPluginsDocsComponentsConfig
): VitePlugin {
    const moduleId = "virtual:starlight-plugins-docs-components-config";
    const resolvedModuleId = `\0${moduleId}`;
    const moduleContent = `export default ${JSON.stringify(config)}`;

    return {
        name: "vite-plugin-starlight-plugins-docs-components-config",
        load(id) {
            return id === resolvedModuleId ? moduleContent : undefined;
        },
        resolveId(id) {
            return id === moduleId ? resolvedModuleId : undefined;
        },
    };
}

type VitePlugin = NonNullable<ViteUserConfig["plugins"]>[number];
