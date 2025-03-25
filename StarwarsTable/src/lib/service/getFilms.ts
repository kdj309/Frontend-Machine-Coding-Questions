
export default async  function getFilm(url:string) {
try {
    const response=await fetch(url);
    if (!response.ok) {
        throw new Error(response.statusText);
        
    }
    const results=await response.json();
    return results.title
} catch (error) {
    if (error instanceof Error) {
        throw new Error(error.message);
            
        }
}
}
