import type { ImageMetadata } from "astro";
import config from "virtual:starlight-plugins-docs-components/config";
import { thumbnails } from "virtual:starlight-plugins-docs-components/images";

import type {
  ShowcaseEntryConfig,
  StarlightPluginsDocsComponentsConfig,
} from "./config";
import type { PageFrontmatter } from "./page";
import { toCapitalCase, toKebabCase } from "./text";

export function getSitesPage(): SitesPage {
  return resolveSitesPage(config, thumbnails);
}

export function resolveSitesPage(
  config: StarlightPluginsDocsComponentsConfig,
  thumbnails: ImageMetadata[]
): SitesPage {
  const pluginLabel = toCapitalCase(config.pluginName);
  const entries = resolveShowcaseEntries(
    config.showcaseProps.entries,
    thumbnails
  );

  return {
    frontmatter: {
      title: "Site Showcase",
      description: `A collection of sites using the ${pluginLabel} plugin.`,
      sidebar: { order: 1 },
    },
    cta: `Have you built a website using ${pluginLabel}?`,
    editHref: `https://github.com/${config.githubOwner}/${toKebabCase(config.pluginName)}/edit/main/${config.showcaseFilepath}`,
    entries,
    pluginLabel,
  };
}

function resolveShowcaseEntries(
  entries: ShowcaseEntryConfig[],
  thumbnails: ImageMetadata[]
): ShowcaseEntry[] {
  return entries.flatMap((entry, index) => {
    const thumbnail = thumbnails[index];

    if (!thumbnail) return [];

    return [
      {
        href: entry.href,
        title: entry.title,
        thumbnail: Promise.resolve({ default: thumbnail }),
        ...(entry.description !== undefined && {
          description: entry.description,
        }),
      },
    ];
  });
}

export interface ShowcaseEntry {
  description?: string;
  href: string;
  thumbnail: Promise<{ default: ImageMetadata }>;
  title: string;
}

export interface SitesPage {
  frontmatter: PageFrontmatter;
  cta: string;
  editHref: string;
  entries: ShowcaseEntry[];
  pluginLabel: string;
}
