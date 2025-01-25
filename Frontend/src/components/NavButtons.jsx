import React from 'react'
import { CheckCircle2, ListTodo } from 'lucide-react';
const NavButtons = ({ navBtn, setNavBtn, children }) => {


    const btnColor = navBtn ? 'bg-[#1d4ed8] border-b-2 border-white' : 'bg-[#2563eb]'
    const btnColor2 = navBtn ? 'bg-[#2563eb]' : 'bg-[#1d4ed8] border-b-2 border-white'

    return (
        <>
            <button onClick={() => {
                setNavBtn(true)
            }} class={`text-white ${btnColor} font-medium text-lg px-2 py-3 flex flex-row justify-center items-center gap-1 `}><ListTodo /> <span>Create Task</span></button>
            <button onClick={() => {
                setNavBtn(false)
            }} class={`text-white ${btnColor2} font-medium text-lg px-4 py-3 flex flex-row justify-center items-center gap-1`}><CheckCircle2 />Completed Task</button>
        </>
    )
}

export default NavButtons