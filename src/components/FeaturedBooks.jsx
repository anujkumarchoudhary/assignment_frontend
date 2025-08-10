"use client"
import React, { useState } from 'react'
import CommonHeading from './CommonHeading'
import BookCard from './card/BookCard'
import BookFrom from './form/BookFrom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBook, getSingleBook, requestBook, updateStatus } from '@/redux/slices/bookSlice'
import { toast } from 'react-toastify'
import { triggerRefresh } from '@/redux/slices/globalSlice'

const FeaturedBooks = ({ title, data }) => {
    const dispatch = useDispatch()
    const [openBookForm, setOpenBookForm] = useState(false)
    const [open, setOpen] = useState(null);
    const token = useSelector((state) => state?.global?.user?.token)
    const handleToggle = (name) => {
        setOpenBookForm(!openBookForm)
    };
    const handleClick = async (id, itemId) => {
        if (id === 0) {
            setOpenBookForm(!openBookForm)
            await dispatch(getSingleBook({ id: itemId, token })).unwrap()

        } else {
            const res = await dispatch(deleteBook({ id: itemId, token })).unwrap()
            toast.success(res?.message)
            await dispatch(triggerRefresh())
        }
    }
    const handleAcceptAndDeclined = async (name, id) => {
        const body = {
            status: name === "accept" ? "accepted" : "declined"
        }
        try {
            const res = await dispatch(updateStatus({ id, body, token })).unwrap();
            toast.success(res?.message)
            await dispatch(triggerRefresh())
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleRequest = async (id) => {
        const res = await dispatch(requestBook({ id, token })).unwrap()
        toast.success(res?.message)
        await dispatch(triggerRefresh())
    }
    return (
        <div className='px-10 py-12 bg-[#F8F8F6]'>
            <div className='flex justify-center w-full'>
                <div className='w-full md:w-[40%] flex justify-between items-center'>
                    <CommonHeading
                        textSize="text-3xl"
                        title={title}
                        description={"Discover amazing books shared by our community. Find your next great read and connect with fellow book enthusiasts."}
                    />
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
                {data?.length > 0 && data?.map((item, idx) => {
                    return (
                        <div key={idx}>
                            <BookCard
                                idx={idx}
                                img={item?.image}
                                name={item?.title}
                                author={item.author}
                                status={item?.status}
                                condition={item?.condition}
                                id={item?._id}
                                open={open}
                                handleToggle={handleToggle}
                                handleClick={(id) => handleClick(id, item?._id)}
                                handleAcceptAndDeclined={(name) => handleAcceptAndDeclined(name, item?._id)}
                                handleRequest={() => handleRequest(item?._id)}
                            />
                        </div>
                    )
                })}
            </div>
            {openBookForm && <BookFrom isUpdate={openBookForm} handleClose={() => setOpenBookForm(false)} />}
        </div>
    )
}

export default FeaturedBooks
