import { AzureKeyCredential, SearchIndexClient } from "@azure/search-documents";

export async function GET(): Promise<Response> {
    const endpoint = process.env.AZURE_SEARCH_NAME || "";
    const apiKey = process.env.AZURE_SEARCH_API_KEY || "";

    const fullEndpoint = `https://${endpoint}.search.windows.net/`;
    
    const client = new SearchIndexClient(fullEndpoint, new AzureKeyCredential(apiKey), {apiVersion: "2023-10-01-Preview"});

    try {
        const result = await client.listIndexes();
        const indexes = [];

        while (true) {
            const { done, value } = await result.next();
            if (done) {
                break;
            }
            indexes.push(value.name);

        }
        
        return new Response(JSON.stringify(indexes), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'An error occurred while fetching indexes.' }), { status: 500 });
    }
}