import type { StarlightPlugin } from "@astrojs/starlight/types";

import {
  type StarlightPluginsDocsComponentsConfig,
  type StarlightPluginsDocsComponentsUserConfig,
  validateConfig,
} from "./libs/config";
import { getResourcesRoutes, getResourcesSidebar } from "./libs/starlight";
import { vitePluginStarlightPluginsDocsComponents } from "./libs/vite";

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
        if (starlightConfig.sidebar) {
          updateStarlightConfig({
            sidebar: getResourcesSidebar(starlightConfig.sidebar),
          });
        }

        addIntegration({
          name: "@trueberryless-org/starlight-plugins-docs-components-integration",
          hooks: {
            "astro:config:setup": ({
              config: astroConfig,
              injectRoute,
              updateConfig,
            }) => {
              for (const route of getResourcesRoutes()) {
                injectRoute(route);
              }

              updateConfig({
                vite: {
                  plugins: [
                    vitePluginStarlightPluginsDocsComponents(
                      config,
                      starlightConfig,
                      astroConfig
                    ),
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
