import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightLinksValidator from "starlight-links-validator";
import starlightPluginsDocsComponents from "@trueberryless-org/starlight-plugins-docs-components";

export default defineConfig({
    integrations: [
        starlight({
            editLink: {
                baseUrl:
                    "https://github.com/trueberryless-org/starlight-plugins-docs-components/edit/main/docs/",
            },
            customCss: ["./src/styles/custom.css"],
            plugins: [
                starlightLinksValidator(),
                starlightPluginsDocsComponents({
                    pluginName: "starlight-plugins-docs-components",
                    showcaseProps: {
                        entries: [
                            {
                                thumbnail: "./src/assets/starlight-sidebar-topics-dropdown.png",
                                href: "https://github.com/trueberryless-org/starlight-sidebar-topics-dropdown",
                                title: "Starlight Sidebar Topics Dropdown",
                                description:
                                    "Split your docs page into multiple subpages and switch between them with a dropdown menu in the sidebar.",
                            },
                            {
                                thumbnail: "./src/assets/starlight-view-modes.png",
                                href: "https://github.com/trueberryless-org/starlight-view-modes",
                                title: "Starlight View Modes",
                                description:
                                    "Add different view mode capabilities to your documentation website.",
                            },
                        ],
                    },
                }),
            ],
            sidebar: [
                {
                    label: "Start Here",
                    items: [
                        { slug: "getting-started" },
                        { slug: "add-hideoo" },
                        { slug: "components" },
                    ],
                },
            ],
            social: {
                github: "https://github.com/trueberryless-org/starlight-plugins-docs-components",
            },
            title: "Starlight Plugins Docs Components",
        }),
    ],
});
