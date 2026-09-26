declare module "virtual:starlight-plugins-docs-components/config" {
  const StarlightPluginsDocsComponentsConfig: import("./libs/config").StarlightPluginsDocsComponentsConfig;

  export default StarlightPluginsDocsComponentsConfig;
}

declare module "virtual:starlight-plugins-docs-components/context" {
  const StarlightPluginsDocsComponentsContext: import("./libs/i18n").StarlightPluginsDocsComponentsI18nContext;

  export default StarlightPluginsDocsComponentsContext;
}

declare module "virtual:starlight-plugins-docs-components/images" {
  type ImageMetadata = import("astro").ImageMetadata;

  export const thumbnails: ImageMetadata[];
}
