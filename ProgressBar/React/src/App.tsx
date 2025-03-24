
import { useEffect, useRef, useState } from 'react'
import './App.css'
import ProgressBar from './ProgressBar/ProgressBar'
const totalms=10*1000;
const interval=1*1000;
//10
const totalcycles=Math.floor(totalms/interval);
//10
const progressmade=(interval/totalms)*100;
function App() {
  const [progreess, setProgreess] = useState<number>(0)
  const cyclecount=useRef<number>(0);
  const timerRef=useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    timerRef.current=setInterval(() => {
      console.log(`cycle ${cyclecount.current}`)
      setProgreess((prev)=>prev+progressmade)
      cyclecount.current+=1;
      if (cyclecount.current===totalcycles) {
        clearInterval(timerRef.current as number)
      }
    }, interval);
    return ()=>{
      clearInterval(timerRef.current as number)
    }
  }, [])
  
  return (
    <>
    <ProgressBar progress={progreess}/>
    </>
  )
}

export default App
