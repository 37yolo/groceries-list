import { useEffect, useRef, useState } from "react";
import { Progress } from "./ui/progress";
export default function MyProgressBar() {

    const [windowScroll, setWindowScroll] = useState(null)
    window.addEventListener('scroll', ()=>{setWindowScroll(window.scrollY)})
    const scrollRef = useRef(null)


    useEffect(()=>{
        const winHeigth = document.documentElement.clientHeight;
        const docHeigth = document.documentElement.scrollHeight
        const  scrollY = window.scrollY
        const scrolled = (scrollY/(docHeigth-winHeigth))*100
        
        scrollRef.current = Math.round(scrolled)

    },[windowScroll])



    return<>
        <Progress value={scrollRef.current} className="fixed top-0 right-0 h-1 rounded-none z-[999]"/>
    </>
}