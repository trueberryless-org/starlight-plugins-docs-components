import type { MarkdownHeading } from "astro";
import context from "virtual:starlight-plugins-docs-components/context";

import {
  type StarlightPluginsDocsComponentsI18nContext,
  resolveLocales,
} from "./i18n";
import {
  type ResourceType,
  getResourceTypes,
  hideooResourcesUrl,
  resolveResourceHeadings,
} from "./resources";
import { humanizeList, toCapitalCase } from "./text";

export function getLocaleStaticPaths() {
  return resolveLocaleStaticPaths(context);
}

export async function getPluginsPage(): Promise<ResourcesPage> {
  return resolvePluginsPage(await getResourceTypes());
}

export async function getHiDeooPage(): Promise<ResourcesPage> {
  return resolveHiDeooPage(await getResourceTypes(hideooResourcesUrl));
}

export function resolveLocaleStaticPaths(
  context: StarlightPluginsDocsComponentsI18nContext
) {
  return resolveLocales(context).map((locale) => ({
    params: { prefix: locale },
  }));
}

export function resolvePluginsPage(types: ResourceType[]): ResourcesPage {
  return {
    frontmatter: {
      title: `Starlight ${humanizeList(types.map(toCapitalCase))}`,
      description: `A collection of ${humanizeList(types)} created by trueberryless-org`,
      sidebar: { order: 2 },
    },
    headings: resolveResourceHeadings(types),
  };
}

export function resolveHiDeooPage(types: ResourceType[]): ResourcesPage {
  return {
    frontmatter: {
      title: "Content from HiDeoo",
      description:
        "Discover other Starlight plugins, components and tools developed by HiDeoo.",
      sidebar: { order: 3 },
    },
    headings: resolveResourceHeadings(types),
  };
}

export interface PageFrontmatter {
  title: string;
  description: string;
  sidebar: { order: number };
}

export interface ResourcesPage {
  frontmatter: PageFrontmatter;
  headings: MarkdownHeading[];
}
