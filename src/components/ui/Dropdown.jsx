import React from 'react'
import { MdOutlineEdit, MdOutlineDelete, } from "react-icons/md";

const Dropdown = ({ className , handleClick }) => {
    const list = [
        {
            id: 1,
            icon: <MdOutlineEdit className='text-blue-500' />,
            label: "Edit",
        },
        {
            id: 2,
            icon: <MdOutlineDelete className='text-red-500' />,
            label: "Delete",
        }
    ]
    return (
        <div className={className}>
            {list?.map((item, idx) => {
                return (
                    <div key={idx} onClick={()=>handleClick(idx)} className='flex gap-2 px-3 py-1 hover:bg-[#F8F8F6]'>
                        <span className='my-auto'>{item?.icon}</span>
                        <p className='text-xs cursor-pointer py-1'>{item?.label}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Dropdown
