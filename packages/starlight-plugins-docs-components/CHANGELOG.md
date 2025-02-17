# @trueberryless-org/starlight-plugins-docs-components

## 0.4.1

### Patch Changes

- [#25](https://github.com/trueberryless-org/starlight-plugins-docs-components/pull/25) [`a1e806d`](https://github.com/trueberryless-org/starlight-plugins-docs-components/commit/a1e806d87e37298385849fe5c020821a5600558a) Thanks [@trueberryless-org](https://github.com/apps/trueberryless-org)! - Fix Dockerfile

## 0.4.0

### Minor Changes

- [#22](https://github.com/trueberryless-org/starlight-plugins-docs-components/pull/22) [`5a66083`](https://github.com/trueberryless-org/starlight-plugins-docs-components/commit/5a660837a0e5fe7fa098a4c3f50450720e1ba020) Thanks [@trueberryless](https://github.com/trueberryless)! - ⚠️ **BREAKING CHANGE:** The minimum supported version of Starlight is now version `0.32.0`.

  Please use the `@astrojs/upgrade` command to upgrade your project:

  ```sh
  npx @astrojs/upgrade
  ```

## 0.3.0

### Minor Changes

- [#12](https://github.com/trueberryless-org/starlight-plugins-docs-components/pull/12) [`e14a7c7`](https://github.com/trueberryless-org/starlight-plugins-docs-components/commit/e14a7c7575c4864ebf166c34043292dd415d33d0) Thanks [@trueberryless](https://github.com/trueberryless)! - Adds support for Astro v5, drops support for Astro v4.

  ⚠️ **BREAKING CHANGE:** The minimum supported version of Starlight is now `0.30.0`.

  Please follow the [upgrade guide](https://github.com/withastro/starlight/releases/tag/%40astrojs/starlight%400.30.0) to update your project.

  Note that the [`legacy.collections` flag](https://docs.astro.build/en/reference/legacy-flags/#collections) is not supported by this plugin and you should update your collections to use Astro's new Content Layer API.
