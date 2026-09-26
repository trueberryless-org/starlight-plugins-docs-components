import type { MarkdownHeading } from "astro";

import { toCapitalCase } from "./text";

export const trueberrylessResourcesUrl =
  "https://gist.githubusercontent.com/trueberryless/7ed4110d6f4cf4d2517d98dfcc035705/raw";

export const hideooResourcesUrl =
  "https://gist.githubusercontent.com/HiDeoo/3882c01c3618180c9a834b8d06a9e7c5/raw";

export async function getResourceTypes(
  resourcesUrl: string = trueberrylessResourcesUrl
): Promise<ResourceType[]> {
  const resources = await fetchResources(resourcesUrl);
  return Object.keys(resources);
}

export async function getResourceEntries(
  type: ResourceType,
  resourcesUrl: string = trueberrylessResourcesUrl,
  githubOrg: string = "trueberryless-org"
): Promise<ResourceEntry[]> {
  const resources = await fetchResources(resourcesUrl);
  return resolveResourceEntries(resources[type] ?? [], githubOrg);
}

export async function getResourceSections(
  resourcesUrl: string = trueberrylessResourcesUrl
): Promise<ResourceSection[]> {
  return resolveResourceSections(await getResourceTypes(resourcesUrl));
}

export function resolveResourceEntries(
  resources: Resource[],
  githubOrg: string
): ResourceEntry[] {
  return resources.map((resource) => ({
    href: resource.url ?? `https://github.com/${githubOrg}/${resource.name}`,
    title: resource.name,
    description: resource.description,
  }));
}

export function resolveResourceSections(
  types: ResourceType[]
): ResourceSection[] {
  return types.map((type) => ({ type, label: toCapitalCase(type) }));
}

export function resolveResourceHeadings(
  types: ResourceType[]
): MarkdownHeading[] {
  return resolveResourceSections(types).map(({ type, label }) => ({
    depth: 2,
    slug: type,
    text: label,
  }));
}

async function fetchResources(resourcesUrl: string): Promise<Resources> {
  try {
    const response = await fetch(resourcesUrl);
    return (await response.json()) as Resources;
  } catch (error) {
    throw new Error("Failed to fetch resources.", { cause: error });
  }
}

interface Resource {
  name: string;
  description: string;
  url?: string;
}

export interface ResourceEntry {
  href: string;
  title: string;
  description: string;
}

export interface ResourceSection {
  type: ResourceType;
  label: string;
}

export type ResourceType = string;

type Resources = Record<ResourceType, Resource[]>;
