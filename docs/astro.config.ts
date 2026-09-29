import starlight from "@astrojs/starlight";
import starlightPluginsDocsComponents from "@trueberryless-org/starlight-plugins-docs-components";
import { defineConfig } from "astro/config";
import starlightLinksValidator from "starlight-links-validator";

const site =
  (process.env.CONTEXT === "deploy-preview" ||
  process.env.CONTEXT === "branch-deploy"
    ? process.env.DEPLOY_PRIME_URL
    : process.env.URL) ??
  "https://starlight-plugins-docs-components.netlify.app";

export default defineConfig({
  site,
  integrations: [
    starlight({
      credits: true,
      components: {
        Footer: "./src/components/Footer.astro",
      },
      title: "Starlight Plugins Docs Components",
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: new URL("og.png", site).href,
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image:alt",
            content: "Components for Starlight plugin docs.",
          },
        },
      ],
      editLink: {
        baseUrl:
          "https://github.com/trueberryless-org/starlight-plugins-docs-components/edit/main/docs/",
      },
      customCss: ["./src/styles/custom.css"],
      plugins: [
        starlightLinksValidator({
          exclude: ({ link }) => {
            if (link.startsWith("/resources/")) return true;
            const hash = link.split("#")[1];
            if (hash && hash == "_top") return true;
            return false;
          },
        }),
        starlightPluginsDocsComponents({
          pluginName: "starlight-plugins-docs-components",
          showcaseProps: {
            entries: [
              {
                thumbnail:
                  "./src/assets/showcase/starlight-sidebar-topics-dropdown.png",
                href: "https://github.com/trueberryless-org/starlight-sidebar-topics-dropdown",
                title: "Starlight Sidebar Topics Dropdown",
                description:
                  "Split your docs page into multiple subpages and switch between them with a dropdown menu in the sidebar.",
              },
              {
                thumbnail: "./src/assets/showcase/starlight-view-modes.png",
                href: "https://github.com/trueberryless-org/starlight-view-modes",
                title: "Starlight View Modes",
                description:
                  "Add different view mode capabilities to your documentation website.",
              },
            ],
          },
        }),
      ],
      expressiveCode: {
        defaultProps: {
          wrap: true,
        },
      },
      sidebar: [
        {
          label: "Start Here",
          items: [
            { slug: "getting-started" },
            { slug: "add-showcase" },
            { slug: "add-hideoo" },
            { slug: "components" },
          ],
        },
      ],
      social: [
        {
          icon: "blueSky",
          label: "BlueSky",
          href: "https://bsky.app/profile/felixs.dev",
        },
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/trueberryless-org/starlight-plugins-docs-components",
        },
      ],
    }),
  ],
});
