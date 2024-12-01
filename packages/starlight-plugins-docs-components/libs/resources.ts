const defaultResourcesUrl =
  "https://gist.githubusercontent.com/trueberryless/7ed4110d6f4cf4d2517d98dfcc035705/raw";

export async function getResourceTypes(
  resourcesUrl: string = defaultResourcesUrl
): Promise<ResourceType[]> {
  const resources = await getResources(resourcesUrl);
  return Object.keys(resources);
}

export async function getResourcesByType(
  type: ResourceType,
  resourcesUrl: string = defaultResourcesUrl
): Promise<Resource[] | undefined> {
  const resources = await getResources(resourcesUrl);
  return resources[type];
}

async function getResources(
  resourcesUrl: string = defaultResourcesUrl
): Promise<Resources> {
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

export type ResourceType = string;

type Resources = Record<ResourceType, Resource[]>;
