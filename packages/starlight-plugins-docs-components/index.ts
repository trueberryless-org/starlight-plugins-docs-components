import type { StarlightPlugin } from "@astrojs/starlight/types";
import {
  type StarlightPluginsDocsComponentsConfig,
  validateConfig,
  type StarlightPluginsDocsComponentsUserConfig,
} from "./libs/config";
import { vitePluginStarlightPluginsDocsComponentsConfig } from "./libs/vite";

export type {
  StarlightPluginsDocsComponentsConfig,
  StarlightPluginsDocsComponentsUserConfig,
};

export default function starlightPluginsDocsComponents(
  userConfig?: StarlightPluginsDocsComponentsUserConfig
): StarlightPlugin {
  const config = validateConfig(userConfig);

  return {
    name: "@trueberryless-org/starlight-plugins-docs-components",
    hooks: {
      "config:setup"({
        addIntegration,
        config: starlightConfig,
        updateConfig: updateStarlightConfig,
      }) {
        const resourceItems = [
          { label: "Showcase", link: "resources/sites" },
          { label: "Plugins", link: "resources/plugins" },
          { label: "Content from HiDeoo", link: "resources/hideoo" },
        ];

        starlightConfig.sidebar?.push({
          label: "Resources",
          items: resourceItems,
        });

        updateStarlightConfig({
          sidebar: starlightConfig.sidebar,
        });

        addIntegration({
          name: "@trueberryless-org/starlight-plugins-docs-components-integration",
          hooks: {
            "astro:config:setup": ({ injectRoute, updateConfig }) => {
              injectRoute({
                pattern: "[...prefix]/resources/sites",
                entrypoint:
                  "@trueberryless-org/starlight-plugins-docs-components/routes/Sites.astro",
                prerender: true,
              });

              injectRoute({
                pattern: "[...prefix]/resources/plugins",
                entrypoint:
                  "@trueberryless-org/starlight-plugins-docs-components/routes/Plugins.astro",
                prerender: true,
              });

              injectRoute({
                pattern: "[...prefix]/resources/hideoo",
                entrypoint:
                  "@trueberryless-org/starlight-plugins-docs-components/routes/HiDeoo.astro",
                prerender: true,
              });

              updateConfig({
                vite: {
                  plugins: [
                    vitePluginStarlightPluginsDocsComponentsConfig(config),
                  ],
                },
              });
            },
          },
        });
      },
    },
  };
}
