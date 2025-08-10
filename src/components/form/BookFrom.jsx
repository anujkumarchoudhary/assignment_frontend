import React, { useEffect, useState } from 'react';
import InputField from '../ui/InputField';
import SimpleButton from '../ui/SimpleButton';
import { IoCloseOutline } from "react-icons/io5";
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { postBook, updateBook } from '@/redux/slices/bookSlice';
import { triggerRefresh } from '@/redux/slices/globalSlice';
const BookFrom = ({ isUpdate, handleClose }) => {
    const dispatch = useDispatch()

    const [inputVal, setInputVal] = useState({
        image: "",
        title: "",
        author: "",
        condition: ""
    })
    const userInfo = useSelector((state) => state.global.user)
    const singleBook = useSelector((state) => state.book.singleBook);

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === "file") {
            setInputVal({ ...inputVal, [name]: files[0] });
        } else {
            setInputVal({ ...inputVal, [name]: value });
        }
    };

    const handleClick = async () => {
        if (!inputVal?.title || !inputVal?.author || !inputVal?.condition) {
            return toast.error("Please fill required fill!")
        };

        const formData = new FormData();
        formData.append("image", inputVal.image);
        formData.append("title", inputVal.title);
        formData.append("author", inputVal.author);
        formData.append("condition", inputVal.condition);

        try {
            if (isUpdate) {
                const res = await dispatch(
                    updateBook({ id: singleBook?.data?._id, body: formData, token: userInfo?.token })
                );
                toast.success(res?.payload?.message)
                dispatch(triggerRefresh());
                setInputVal({
                    image: "",
                    title: "",
                    author: "",
                    condition: ""
                })
                handleClose()
            } else {
                const res = await dispatch(
                    postBook({ body: formData, token: userInfo?.token })
                );
                console.log(res, "ewughewirjw")
                if (res?.payload?.success) {
                    toast.success(res?.payload?.message)
                } else {
                    toast.error(res?.payload?.message)
                }

                dispatch(triggerRefresh());
                setInputVal({
                    image: "",
                    title: "",
                    author: "",
                    condition: ""
                })
                handleClose()
            }

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (singleBook) {
            const { data } = singleBook;
            setInputVal({
                image: data?.image,
                title: data?.title,
                author: data?.author,
                condition: data?.condition
            });
        }
    }, [singleBook])

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50">
            <div className=" relative bg-[#FFFFFF] p-12 rounded-md shadow-lg w-full md:w-[35%]">
                <h2 className="text-xl font-semibold mb-4 text-center">{isUpdate ? "Update Book" : "Add Book"}</h2>
                <IoCloseOutline onClick={handleClose} size={20} className='absolute top-4 right-4 cursor-pointer hover:text-red-400' />
                <div className=''>
                    <div className='grid grid-cols-2 gap-2'>
                        <InputField
                            label="Title"
                            name={"title"}
                            value={inputVal.title}
                            onChange={handleChange}
                            placeholder={"Enter your name"}
                            required={true}
                        />
                        {/* <div className='bg-yellow-500 h-[4.5rem] w-[5rem] relative rounded-lg overflow-hidden'>
                            <Image
                                src={img}
                                alt="Book"
                                fill
                                className="object-cover"
                            />
                        </div> */}
                        <InputField
                            label="Image"
                            name="image"
                            type="file"
                            onChange={handleChange}
                            placeholder="Enter your name"
                        // required={true}
                        />
                    </div>
                    <InputField
                        label="Author"
                        name={"author"}
                        value={inputVal.author}
                        onChange={handleChange}
                        placeholder={"Enter your name"}
                        required={true}
                    />
                    <InputField
                        label="Condition"
                        name={"condition"}
                        value={inputVal.condition}
                        onChange={handleChange}
                        placeholder={"Enter your name"}
                        required={true}
                    />
                    <SimpleButton
                        handleClick={handleClick}
                        name={isUpdate ? "Update Book" : "Add Book"} className="my-4"
                    />
                </div>
            </div>
        </div>
    );
};

export default BookFrom;
