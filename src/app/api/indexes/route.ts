import { AzureKeyCredential, SearchIndexClient } from "@azure/search-documents";

export async function GET(): Promise<Response> {
    const endpoint = process.env.AZURE_SEARCH_NAME || "";
    const apiKey = process.env.AZURE_SEARCH_API_KEY || "";

    const fullEndpoint = `https://${endpoint}.search.windows.net/`;
    
    const client = new SearchIndexClient(fullEndpoint, new AzureKeyCredential(apiKey), {apiVersion: "2023-10-01-Preview"});

    // console.log(client);

//     const result = await client.listIndexes();
//     let listOfIndexes = await result.next();

//     console.log(`List of Indexes`);
//     console.log(`***************`);
//     while (!listOfIndexes.done) {
//         const { similarity } = listOfIndexes.value;
//         console.log(`Name: ${listOfIndexes.value.name}`);
//         console.log(`Similarity Algorithm: ${similarity && similarity.odatatype}`);
//         console.log();
//         listOfIndexes = await result.next();
//   }

    // console.log(result);

    // return new Response(JSON.stringify({}), { status: 200 });

    try {
        const result = await client.listIndexes();
        const indexes = [];
        // console.log(result);

        while (true) {
            const { done, value } = await result.next();
            if (done) {
                break;
            }
            indexes.push(value.name);
            // console.log(value);
        }
        
        return new Response(JSON.stringify(indexes), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'An error occurred while fetching indexes.' }), { status: 500 });
    }
}