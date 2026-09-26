import { z } from "astro/zod";

import { throwPluginError } from "./error";

const showcaseEntrySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  thumbnail: z.string(),
  href: z.string(),
});

const configSchema = z.object({
  githubOwner: z.string().default("trueberryless-org"),
  pluginName: z.string(),
  showcaseFilepath: z.string().default("./docs/astro.config.ts"),
  showcaseProps: z
    .object({
      entries: z.array(showcaseEntrySchema).default([]),
    })
    .prefault({}),
});

export function validateConfig(
  userConfig: unknown
): StarlightPluginsDocsComponentsConfig {
  const config = configSchema.safeParse(userConfig);

  if (!config.success) {
    throwPluginError(`Invalid @trueberryless-org/starlight-plugins-docs-components configuration:

${z.prettifyError(config.error)}
`);
  }

  return config.data;
}

export type ShowcaseEntryConfig = z.output<typeof showcaseEntrySchema>;

export type StarlightPluginsDocsComponentsUserConfig = z.input<
  typeof configSchema
>;
export type StarlightPluginsDocsComponentsConfig = z.output<
  typeof configSchema
>;
