import { GraphQLClient } from 'graphql-request';

export type DatoCMSClientParams = {
  preview?: boolean;
};

export function createDatoCMSClient({
  preview = false,
}: DatoCMSClientParams = {}) {
  return new GraphQLClient('https://graphql.datocms.com', {
    headers: {
      Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
      ...(preview && { 'X-Include-Drafts': 'true' }),
    },
  });
}

export async function fetchFromDatoCMS<T = Record<string, unknown>>({
  query,
  variables = {},
  preview = false,
}: {
  query: string;
  variables?: Record<string, unknown>;
  preview?: boolean;
}): Promise<T> {
  try {
    const client = createDatoCMSClient({ preview });
    return await client.request<T>(query, variables);
  } catch (error) {
    console.error('Error fetching from DatoCMS:', error);
    throw new Error('Failed to fetch data from DatoCMS');
  }
}
