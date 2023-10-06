import { SearchIndexClient, AzureKeyCredential } from "@azure/search-documents";

export async function listIndexes(): Promise<Array<{value: string, label: string}>> {
  const endpoint = process.env.AZURE_SEARCH_NAME || "";
  const apiKey = process.env.AZURE_SEARCH_API_KEY || "";
  
  // complete endpoint 
  const completeEndpoint = `https://azurecogsearchazchatgpt.search.windows.net/`;

  const client = new SearchIndexClient(completeEndpoint, new AzureKeyCredential("NO31IQr2kJFBAfBUFn55YyeZN01AOkkocbeJOPzwE7AzSeCODuKk"));
  const result = await client.listIndexes();
  let listOfIndexes = await result.next();
  
  const options = [];
  while (!listOfIndexes.done) {
    options.push({
      value: listOfIndexes.value.name,
      label: listOfIndexes.value.name,
    });
    listOfIndexes = await result.next();
  }
  return options;
}
