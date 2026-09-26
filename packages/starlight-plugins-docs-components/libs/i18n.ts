import type { StarlightUserConfig } from "@astrojs/starlight/types";

const RootLocale = "root";

export function getI18nContext(
  starlightConfig: Pick<StarlightUserConfig, "defaultLocale" | "locales">
): StarlightPluginsDocsComponentsI18nContext {
  const localeKeys = Object.keys(starlightConfig.locales ?? {});

  if (!hasConfiguredLocales(localeKeys)) {
    return { defaultLocale: undefined, isMultilingual: false, localeKeys: [] };
  }

  return {
    defaultLocale: getLocale(starlightConfig.defaultLocale),
    isMultilingual: localeKeys.length > 1,
    localeKeys,
  };
}

export function resolveLocales(
  context: StarlightPluginsDocsComponentsI18nContext
): Locale[] {
  if (!context.isMultilingual) return [context.defaultLocale];

  return context.localeKeys.map(getLocale);
}

function hasConfiguredLocales(localeKeys: string[]): boolean {
  return (
    localeKeys.length > 1 ||
    (localeKeys.length === 1 && localeKeys[0] !== RootLocale)
  );
}

function getLocale(localeKey: string | undefined): Locale {
  return localeKey === RootLocale ? undefined : localeKey;
}

export type Locale = string | undefined;

export interface StarlightPluginsDocsComponentsI18nContext {
  defaultLocale: Locale;
  isMultilingual: boolean;
  localeKeys: string[];
}
