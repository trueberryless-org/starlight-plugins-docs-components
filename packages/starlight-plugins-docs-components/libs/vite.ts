import type { ImageMetadata, ViteUserConfig } from "astro";

import type { StarlightPluginsDocsComponentsConfig } from "..";

export function vitePluginStarlightPluginsDocsComponentsConfig(
    config: StarlightPluginsDocsComponentsConfig
): VitePlugin {
    const modules = {
        "virtual:starlight-plugins-docs-components-context": `export default {
            githubOwner: ${JSON.stringify(config.githubOwner)},
            pluginName: ${JSON.stringify(config.pluginName)},
            showcaseFilepath: ${JSON.stringify(config.showcaseFilepath)},
            showcaseProps: {
                entries: [
                    ${config.showcaseProps.entries
                        .map(
                            (entry) => `{
                                thumbnail: await import(${JSON.stringify(entry.thumbnail)}),
                                href: ${JSON.stringify(entry.href)},
                                title: ${JSON.stringify(entry.title)},
                                description: ${JSON.stringify(entry.description)}
                            }`
                        )
                        .join(",")}
                ]
            }
        }`,
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
            return id in modules ? resolveVirtualModuleId(id) : undefined;
        },
    };
}

function resolveVirtualModuleId<TModuleId extends string>(id: TModuleId): `\0${TModuleId}` {
    return `\0${id}`;
}

export interface StarlightPluginsDocsComponentsContext {
    githubOwner: string;
    pluginName: string;
    showcaseFilepath: string;
    showcaseProps: {
        entries: {
            thumbnail: Promise<{
                default: ImageMetadata;
            }>;
            href: string;
            title: string;
            description?: string;
        }[];
    };
}

type VitePlugin = NonNullable<ViteUserConfig["plugins"]>[number];
