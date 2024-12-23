
export default function ProgressBar({progress}:{progress:number}) {
  return (
    <div className="progressbar_wrapper">
        <div className="progressbar_fill" style={{transform:`translateX(calc(${progress}% - 100%))`}}></div>
    </div>
  )
}
