"use client"
import React, { useEffect, useState } from 'react'
import SaveAndCancelButton from './SaveAndCancelButton'
import img from '../../public/img/hero-books.jpg'
import Image from 'next/image'
import { HereComData } from '@/mockdata/hereComData'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBook } from '@/redux/slices/bookSlice'
import { MdPublishedWithChanges } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { getAllUser } from '@/redux/slices/userSlice'

const HeroCom = () => {
    const router = useRouter()
    const { title, description } = HereComData;

    const dispatch = useDispatch()
    const [availableBook, setAvailableBook] = useState([])
    const [activeMembers, setActiveMembers] = useState([])
    const [booksExchanged, setBooksExchanged] = useState([])

    const userInfo = useSelector((state) => state.global.user)
    const { refresh } = useSelector(state => state.global);

    const fetchAllBooks = async (token) => {
        try {
            const res = await dispatch(getAllBook({ token })).unwrap()
            if (res?.data) {
                const books = res?.data.length;
                const requestedBook = res?.data?.filter((item) => item?.status === "accepted")
                setBooksExchanged(requestedBook?.length)
                setAvailableBook(books)
            }
        }
        catch (err) {
            console.log(err)
        }

    }
    const fetchAllUser = async (token) => {
        try {
            const res = await dispatch(getAllUser({ token })).unwrap()
            if (res?.data) {
                const users = res?.data.length;
                setActiveMembers(users)
            }
        }
        catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        if (userInfo?.token) {
            fetchAllBooks(userInfo?.token)
        }
        fetchAllUser()
    }, [userInfo, refresh, dispatch])

    const data = [
        {
            icon: <IoBookOutline size={25} />,
            total: availableBook,
            label: "Books Available",
        },
        {
            icon: <LuUserRound size={25} />,
            total: activeMembers,
            label: "Active Members",
        },
        {
            icon: <MdPublishedWithChanges size={25} />,
            total: booksExchanged,
            label: "Books Exchanged",
        }
    ]
    return (
        <div className=' bg-[#F3F1EC] px-10 py-12'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-15'>
                <div>
                    <h2 className='text-5xl font-bold'>{title}</h2>
                    <p className='my-6 text-md'>{description}</p>
                    <div className='w-fit'>
                        <SaveAndCancelButton handleBookSwap={() => router.push("")} />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 mt-15'>
                        {
                            data?.map((item, idx) => {
                                return (
                                    <div key={idx} className='flex gap-2.5 my-auto py-1 md:py-0'>
                                        <span className='my-auto bg-[#E2DED6] p-3 rounded-full'>{item?.icon}</span>
                                        <div className="flex justify-between w-full md:flex-col md:items-start">
                                            <p className='my-auto'>{item?.label}</p>
                                            <p className="font-bold my-auto">{item?.total || 0}</p>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <div>
                    <Image src={img} width={"100%"} height={"100%"} alt='hero' className='rounded-xl' />
                </div>
            </div>
        </div>
    )
}

export default HeroCom
