import React, { useState } from 'react'

import NavButtons from './NavButtons';

const NavigationBar = ({navBtn, setNavBtn}) => {
    

    return (
        <div>
            <nav class="bg-[#2563eb] relative w-full flex flex-col justify-end shadow-sm">
                <h1 className='text-2xl font-bold text-white block w-full py-6 px-14'>Todo Application</h1>
                <div className='flex flex-row ml-8 '>
                    <NavButtons navBtn={navBtn} setNavBtn={setNavBtn} />
                </div>
            </nav>

            {/* Now for the todo form */}

            

        </div>
    )
}

export default NavigationBar