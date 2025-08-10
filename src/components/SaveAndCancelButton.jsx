import React from 'react'
import { GoArrowRight } from "react-icons/go";
import { useSelector } from 'react-redux';

const SaveAndCancelButton = () => {
        const userInfo = useSelector((state) => state?.global?.user)

    return (
        <div className=' flex gap-2 justify-between'>
            <button className='bg-[#836542] flex gap-4 text-[#FFFFFF] px-5 py-2 rounded-sm'>
                Start Swapping
                <GoArrowRight className='my-auto'/>
            </button>
            <button className='bg-[#FFFFFF] px-5 py-2 rounded-sm'>
                Browse Books
            </button>
        </div>
    )
}

export default SaveAndCancelButton
