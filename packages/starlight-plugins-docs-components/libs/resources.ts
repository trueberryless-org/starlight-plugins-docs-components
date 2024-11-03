const resourcesUrl =
    "https://gist.githubusercontent.com/trueberryless/7ed4110d6f4cf4d2517d98dfcc035705/raw";

let resources: Resources | undefined = undefined;

export async function getResourceTypes(): Promise<ResourceType[]> {
    const resources = await getResources();
    return Object.keys(resources);
}

export async function getResourcesByType(type: ResourceType): Promise<Resource[] | undefined> {
    const resources = await getResources();
    return resources[type];
}

export async function getResources(): Promise<Resources> {
    if (resources) {
        return resources;
    }

    try {
        const response = await fetch(resourcesUrl);
        resources = (await response.json()) as Resources;
        return resources;
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
