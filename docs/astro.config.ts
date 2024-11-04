import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightLinksValidator from "starlight-links-validator";

export default defineConfig({
    integrations: [
        starlight({
            editLink: {
                baseUrl:
                    "https://github.com/trueberryless-org/starlight-plugins-docs-components/edit/main/docs/",
            },
            customCss: ["./src/styles/custom.css"],
            plugins: [starlightLinksValidator()],
            sidebar: [
                {
                    label: "Start Here",
                    items: [
                        { slug: "getting-started" },
                        { slug: "add-hideoo" },
                        { slug: "components" },
                    ],
                },
                {
                    label: "Resources",
                    autogenerate: { directory: "resources" },
                },
            ],
            social: {
                github: "https://github.com/trueberryless-org/starlight-plugins-docs-components",
            },
            title: "Starlight Plugins Docs Components",
        }),
    ],
});
