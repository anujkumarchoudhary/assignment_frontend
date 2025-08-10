import { clearUserData } from '@/redux/slices/globalSlice';
import { useRouter } from 'next/navigation';
import React from 'react'
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';

const UserProfile = ({ handleClose }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state?.global)
    console.log(userInfo, " userInfoewqe")
    const handleLogout = async () => {
        dispatch(clearUserData)
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        localStorage.removeItem("name")
        localStorage.removeItem("email")
        router.push("/")
        handleClose()
    }

    return (
        <div className='bg-[#FFFFFF] space-y-2 px-6 py-2'>
            <p className='whitespace-nowrap'>Name: {userInfo?.user?.name}, ({userInfo?.user?.role})</p>
            <span></span>
            <p className='whitespace-nowrap'>Email: {userInfo?.user?.email}</p>
            <IoMdLogOut onClick={handleLogout} className='cursor-pointer text-red-500' />
        </div>
    )
}

export default UserProfile
