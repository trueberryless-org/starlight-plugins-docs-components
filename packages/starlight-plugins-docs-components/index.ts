import type { StarlightPlugin } from "@astrojs/starlight/types";
import {
    type StarlightPluginsDocsComponentsConfig,
    validateConfig,
    type StarlightPluginsDocsComponentsUserConfig,
} from "./libs/config";

export type { StarlightPluginsDocsComponentsConfig, StarlightPluginsDocsComponentsUserConfig };

export default function starlightPluginsDocsComponents(
    userConfig?: StarlightPluginsDocsComponentsUserConfig
): StarlightPlugin {
    const config = validateConfig(userConfig);

    return {
        name: "@trueberryless-org/starlight-plugins-docs-components",
        hooks: {
            setup({
                addIntegration,
                logger,
                config: starlightConfig,
                updateConfig: updateStarlightConfig,
            }) {
                /**
                 * This is the entry point of your Starlight plugin.
                 * The `setup` hook is called when Starlight is initialized (during the Astro `astro:config:setup` integration
                 * hook).
                 * To learn more about the Starlight plugin API and all available options in this hook, check the Starlight
                 * plugins reference.
                 *
                 * @see https://starlight.astro.build/reference/plugins/
                 */
                logger.info(
                    "Hello from the @trueberryless-org/starlight-plugins-docs-components plugin!"
                );

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
                                pattern: "/resources/sites",
                                entrypoint:
                                    "@trueberryless-org/starlight-plugins-docs-components/routes/Sites.astro",
                                prerender: true,
                            });

                            injectRoute({
                                pattern: "/resources/plugins",
                                entrypoint:
                                    "@trueberryless-org/starlight-plugins-docs-components/routes/Plugins.astro",
                                prerender: true,
                            });

                            // injectRoute({
                            //     pattern: "/resources/hideoo",
                            //     entrypoint: "@trueberryless-org/starlight-plugins-docs-components/routes/Hideoo.astro",
                            //     prerender: true,
                            // });
                        },
                    },
                });
            },
        },
    };
}
