
async function getCharacters() {
  try {
    const response=await fetch("https://swapi.dev/api/people");
    if (!response.ok) {
        throw new Error(response.statusText);
        
    }
    const results=await response.json();
    return results.results
  } catch (error) {
    if (error instanceof Error) {
    throw new Error(error.message);
        
    }
  }
}

export default getCharacters