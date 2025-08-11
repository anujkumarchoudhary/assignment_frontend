"use client"
import { headerData } from '@/mockdata/Header'
import React, { useState } from 'react'
import LoginAndSignUp from './form/LoginAndSignUp';
import BookFrom from './form/BookFrom';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import UserProfile from './UserProfile';

const Heading = () => {
    const router = useRouter()
    const { icon, name } = headerData?.leftSide;
    const [loginAndSignUpOpen, setLoginAndSignUp] = useState(false);
    const [openBookForm, setOpenBookForm] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)

    const userInfo = useSelector((state) => state?.global?.user)

    const userToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    return (
        <div className='flex justify-between bg-amber-10w0 border-b border-b-slate-200  px-8 py-2.5'>
            <div onClick={() => router.push("/")} className='flex gap-2 cursor-pointer'>
                <span className='my-auto text-[#836542]'> {icon}</span>
                <p className='hidden md:block text-2xl font-bold'>{name}</p>
            </div>
            <div className='flex gap-8 my-auto'>
                {userInfo?.role && <>{headerData?.centerSide
                    // .filter(item => {
                    //     if (item?.label === "My Books" && userInfo?.user?.role !== "user") {
                    //         return false;
                    //     }
                    //     return true;
                    // })
                    .map((item, idx) => (
                        <div key={idx}>
                            <p
                                onClick={() => router.push(`/${userInfo?.role}/${item.path}`)}
                                className="text-md cursor-pointer"
                            >
                                {item.label}
                            </p>
                        </div>
                    ))}</>}
            </div>
            <div className='relative flex gap-2 my-auto'>
                {headerData.rightSide
                    ?.filter(item => {
                        if (item.name === "Add Book") {
                            return userInfo?.role === "librarian";
                        }
                        return true; // keep other items
                    })
                    .map((item, idx) => {
                        const isAddBook = item?.name === "Add Book";
                        const handleClick = () => {
                            if (isAddBook) {
                                setOpenBookForm(!openBookForm);
                            } else {
                                if (userToken) {
                                    console.log(userInfo?.token, "userInfo?.tokenhitete");
                                    setOpenProfile(!openProfile);
                                } else {
                                    setLoginAndSignUp(!loginAndSignUpOpen);
                                }
                            }
                        };

                        return (
                            <div
                                onClick={handleClick}
                                key={idx}
                                className={`flex ${isAddBook && "gap-1"} bg-[#836542] text-[#FFFFFF] px-3 py-2 rounded-sm cursor-pointer`}
                            >
                                <span className="my-auto">{item?.icon}</span>
                                <p className="hidden md:block text-md">{item?.name}</p>
                            </div>
                        );
                    })}

                {openProfile &&
                    <div className='absolute top-14 right-12'>
                        <UserProfile handleClose={() => setOpenProfile(false)} />
                    </div>}
            </div>
            {openBookForm && <BookFrom handleClose={() => setOpenBookForm(false)} />}
            {loginAndSignUpOpen && <LoginAndSignUp handleClose={() => setLoginAndSignUp(false)} />}

        </div>
    )
}

export default Heading
