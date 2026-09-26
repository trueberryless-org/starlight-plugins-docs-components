import type { StarlightUserConfig } from "@astrojs/starlight/types";
import type { InjectedRoute } from "astro";

const packageName = "@trueberryless-org/starlight-plugins-docs-components";

const resourcesRoutes = [
  { slug: "sites", label: "Showcase", entrypoint: "Sites" },
  { slug: "plugins", label: "Plugins", entrypoint: "Plugins" },
  { slug: "hideoo", label: "Content from HiDeoo", entrypoint: "HiDeoo" },
] as const;

export function getResourcesSidebar(
  sidebar: NonNullable<StarlightUserConfig["sidebar"]>
): NonNullable<StarlightUserConfig["sidebar"]> {
  return [
    ...sidebar,
    {
      label: "Resources",
      items: resourcesRoutes.map(({ slug, label }) => ({
        label,
        link: `resources/${slug}`,
      })),
    },
  ];
}

export function getResourcesRoutes(): InjectedRoute[] {
  return resourcesRoutes.map(({ slug, entrypoint }) => ({
    pattern: `[...prefix]/resources/${slug}`,
    entrypoint: `${packageName}/routes/${entrypoint}.astro`,
    prerender: true,
  }));
}
