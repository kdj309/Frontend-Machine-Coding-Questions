
export default function PhotoCard({src,alt}:{src:string,alt:string}) {
  return (
    <div className="gallery_item">
        <img src={src} alt={alt}  />
    </div>
  )
}
