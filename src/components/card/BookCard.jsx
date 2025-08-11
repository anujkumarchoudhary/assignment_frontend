"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import { PiDotsThreeBold } from "react-icons/pi";
import Dropdown from '../ui/Dropdown';
import { useSelector } from 'react-redux';

const BookCard = ({ id, idx, img, name, author, condition, status, handleAcceptAndDeclined, handleRequest, handleClick }) => {
    console.log(status, "statusee")
    const [open, setOpen] = useState(null)
    const userInfo = useSelector((state) => state?.global?.user);
    const { role } = userInfo
    console.log(userInfo, role, "userInfoerhwe")
    const handleOpen = (name) => {
        setOpen(prev => (prev === name ? null : name))
        console.log(id, idx, "idUHRJW")
    }
    return (
        <div className='bg-[#FFFFFF] rounded-lg'>
            <div className='w-full h-[10rem] overflow-hidden'>
                {img ? (
                    <Image
                        src={img}
                        width={900}
                        height={900}
                        alt={name || "Book"}
                        className="overflow-auto"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                        No Image
                    </div>
                )}
            </div>
            <div className=' relative p-4'>
                <p className='text-xl font-semi-bold'>{name && name?.slice(0, 25)}</p>
                <p className='text-xs text-[#847062] py-2'>Condition: {condition && condition.slice(0, 20)}</p>

                <div className='flex justify-between'>
                    <p className='text-xs text-[#847062] py-2'>{author && author.slice(0, 15)}</p>
                    {role === "librarian" ? <div className='flex gap-1'>
                        <p onClick={() => handleAcceptAndDeclined("accept")} className={`${status === "accepted" ? "bg-[#593B26] text-[#FFFFFF]" : "bg-[#F8F8F6]"} text-xs w-fit px-4 py-1 rounded-full my-auto cursor-pointer`}>Accepted</p>
                        <p onClick={() => handleAcceptAndDeclined("declined")} className={`${status === "declined" ? "bg-[#593B26] text-[#FFFFFF]" : "bg-[#F8F8F6]"} text-xs w-fit px-4 py-1 rounded-full my-auto cursor-pointer`}>Declined</p>
                    </div> :
                        <p onClick={(status === null && userInfo?.role === "user") && handleRequest} className={`${(status === "pending" && userInfo?.role === "librarian") ? "bg-[#593B26] text-[#FFFFFF]" : "bg-[#F8F8F6]"} text-xs w-fit px-4 py-1 rounded-full my-auto cursor-pointer`}>{status === null ? "Request" : status}</p>
                    }
                </div>
                {userInfo?.role === "librarian" && <PiDotsThreeBold onClick={() => handleOpen(id)} className='absolute top-3.5 right-3 cursor-pointer' />}
                {(open === id) && <Dropdown handleClick={handleClick} className={"shadow bg-[#FFFFFF] absolute top-6 right-7"} />}
            </div>
        </div>
    )
}

export default BookCard
