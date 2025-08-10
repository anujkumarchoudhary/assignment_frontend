import React from 'react'
import { GoArrowRight } from 'react-icons/go'

const SimpleButton = ({ handleClick,name, className }) => {
    return (
        <button onClick={handleClick} className={`${className} bg-[#836542] w-full flex justify-center gap-4 text-[#FFFFFF] px-5 py-2 rounded-sm cursor-pointer`}>
            {name}
        </button>
    )
}

export default SimpleButton
