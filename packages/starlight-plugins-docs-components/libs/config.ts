import { AstroError } from "astro/errors";
import {
    z,
    type ZodLiteral,
    type ZodNumber,
    type ZodObject,
    type ZodString,
    type ZodUnion,
} from "astro/zod";

const configSchema = z.object({
    /**
     * The owner of the GitHub repository.
     *
     * @default "trueberryless-org"
     */
    githubOwner: z.string().default("trueberryless-org"),

    /**
     * The name of the plugin.
     */
    pluginName: z.string(),

    /**
     * The path to the showcase page.
     *
     * @default "./docs/astro.config.ts"
     */
    showcaseFilepath: z.string().default("./docs/astro.config.ts"),

    /**
     * The props for the showcase page.
     */
    showcaseProps: z
        .object({
            /**
             * A list of showcase entries to be displayed in the showcase page.
             *
             * @default []
             * @see {@link ShowcaseImageProps}
             */
            entries: z
                .array(
                    z.object({
                        /**
                         * The name of the project which uses your plugin.
                         *
                         * @see {@link ShowcaseImageCardProps.title}
                         */
                        title: z.string(),

                        /**
                         * The description of the project which uses your plugin.
                         *
                         * @see {@link ShowcaseImageCardProps.description}
                         */
                        description: z.string().optional(),

                        /**
                         * The thumbnail of the project which uses your plugin.
                         *
                         * @see {@link ShowcaseImageCardProps.thumbnail}
                         */
                        thumbnail: z.string(),

                        /**
                         * The URL of the project which uses your plugin.
                         *
                         * @see {@link ShowcaseImageCardProps.href}
                         */
                        href: z.string(),
                    })
                )
                .default([]),
        })
        .default({}),
});

export function validateConfig(userConfig: unknown): StarlightPluginsDocsComponentsConfig {
    const config = configSchema.safeParse(userConfig);

    if (!config.success) {
        const errors = config.error.flatten();

        throw new AstroError(
            `Invalid @trueberryless-org/starlight-plugins-docs-components configuration:

${errors.formErrors.map((formError) => ` - ${formError}`).join("\n")}
${Object.entries(errors.fieldErrors)
    .map(([fieldName, fieldErrors]) => ` - ${fieldName}: ${fieldErrors.join(" - ")}`)
    .join("\n")}
  `,
            `See the error report above for more informations.\n\nIf you believe this is a bug, please file an issue at https://github.com/trueberryless-org/starlight-plugins-docs-components/issues/new`
        );
    }

    return config.data;
}

export type StarlightPluginsDocsComponentsUserConfig = z.input<typeof configSchema>;
export type StarlightPluginsDocsComponentsConfig = z.output<typeof configSchema>;
