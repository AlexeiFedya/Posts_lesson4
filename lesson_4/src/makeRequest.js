export async function makeRequest(url) {
    const response = await fetch(url);
  
    if (
      response.ok &&
      response.headers.get("content-type").startsWith("application/json")
    ) {
      const data = await response.json();
      return data;
    }
  
    throw new Error("Unexpected error.");
  }