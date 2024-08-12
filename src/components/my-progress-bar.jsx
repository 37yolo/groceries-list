import { useEffect, useMemo, useState } from "react";
import { Progress } from "./ui/progress";
export default function MyProgressBar() {

    const[scrollPercentage,setScrollPercentage]=useState(0)
    window.addEventListener('scroll', ()=>{setScrollPercentage(window.scrollY)})


    const progress = useMemo(()=>{
        const winHeigth = window.innerHeight;
        const docHeigth = document.documentElement.scrollHeight
        const  scrollY = window.scrollY
        const scrolled = (scrollY/(docHeigth-winHeigth))*100
        
        return Math.round(scrolled);
        
    },[scrollPercentage])



    return<>
        <Progress value={progress} className="fixed top-0 right-0 h-1 rounded-none"/>
    </>
}