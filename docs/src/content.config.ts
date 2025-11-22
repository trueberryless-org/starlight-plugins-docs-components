import { defineCollection, z } from 'astro:content'
import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        banner: z.object({ content: z.string() }).default({
          content: 'This package is depricated. Please migrate your project following [this blog](https://blog.trueberryless.org/blog/starlight-customize-toc-overview-title/)',
        }),
      }),
    }),
  }),
}
