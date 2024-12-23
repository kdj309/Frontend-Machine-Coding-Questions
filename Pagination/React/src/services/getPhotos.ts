import { PER_PAGE } from "../constants";

export async function getPhotos(currentPage:number) {
    try {
        const response = await fetch(
          `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${PER_PAGE}`,
          {
            headers: {
              Authorization: import.meta.env.VITE_API_KEY,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network Error");
        }
        const data = await response.json();
        //@ts-ignore
        return { photos: data.photos.map((pic)=>({src:pic.src.medium,alt:pic.alt} as {src:string,alt:src})), picslength: data.total_results };
      } catch (error) {
        return { photos: [], picslength: 0 };
      }
}