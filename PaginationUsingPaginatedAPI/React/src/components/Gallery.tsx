import { photo } from "../types";
import PhotoCard from "./PhotoCard";

export default function Gallery({photos}:{photos:photo[]}) {
  return (
    <div className="gallery">
        {photos.map((p,idx)=><PhotoCard key={idx} {...p}/>)}
    </div>
  )
}
