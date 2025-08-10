import React, { useEffect, useState } from 'react';
import InputField from '../ui/InputField';
import SimpleButton from '../ui/SimpleButton';
import { IoCloseOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userSignUp } from '@/redux/slices/userSlice';
import { setUserData } from '@/redux/slices/globalSlice';

const LoginAndSignUp = ({ handleClose }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [inputVal, setInputVal] = useState({
    name: "",
    email: "",
    role: "user",
    password: ""
  })
  console.log(inputVal, "inputValiwrjqw")

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setInputVal({
      ...inputVal,
      [name]: type === "checkbox" ? (checked ? "librarian" : "user") : value
    });
  };

  const user = useSelector((state) => state.global.user)

  console.log(user, "userData")
  const handleLoginAndSignUp = async () => {

    if (isLogin) {
      if (!inputVal.email || !inputVal.password) {
        return toast.error("Please fill required field!")
      }
    } else {
      if (!inputVal.name || !inputVal.email || !inputVal.password) {
        return toast.error("Please fill required field!")
      }
    }
    const body = isLogin
      ? {
        email: inputVal.email,
        password: inputVal.password
      }
      : {
        name: inputVal.name,
        email: inputVal.email,
        role: inputVal.role,
        password: inputVal.password
      };
    try {
      if (isLogin) {
        const res = await dispatch(userLogin(body)).unwrap()
        console.log(res, "reseewrwerew")
        toast.success(res?.message || "Login Successfully!")
        localStorage.setItem("token", res?.token)
        localStorage.setItem("role", res?.user?.role)
        localStorage.setItem("name", res?.user?.name)
        localStorage.setItem("email", res?.user?.email)

        if (res?.user?.role === "user") {
          router.push("/user")
        } else {
          router.push("/librarian")
        }
        console.log(res?.user, "res?.userewirjwe")
        await dispatch(setUserData(res?.user))

        handleClose()
      } else {
        const res = await dispatch(userSignUp(body)).unwrap()
        toast.success(res?.message || "Login Successfully!")

        handleClose()
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50">
      <div className=" relative bg-[#FFFFFF] p-12 rounded-md shadow-lg w-full md:w-[35%]">
        <h2 className="text-xl font-semibold mb-4 text-center">{isLogin ? "Login" : "Sign Up"}</h2>
        <IoCloseOutline onClick={handleClose} size={20} className='absolute top-4 right-4 cursor-pointer hover:text-red-400' />
        <div>
          {!isLogin && <InputField
            label="Name"
            name={"name"}
            value={inputVal.name}
            onChange={handleChange}
            placeholder={"Enter your name"}
            required={true}
          />}
          <InputField
            label="Email"
            name={"email"}
            value={inputVal.email}
            onChange={handleChange}
            placeholder={"Enter your name"}
            required={true}
          />
          <InputField
            label="Password"
            name={"password"}
            value={inputVal.password}
            onChange={handleChange}
            placeholder={"Enter your name"}
            required={true}
          />
          <div className='flex justify-between'>
            <div className='flex gap-2'>
              <InputField
                type="checkbox"
                name="role"
                checked={inputVal.role === "librarian"}
                onChange={handleChange}
              />
              <span className='mt-4 text-xs'>{isLogin ? "Remember":"Are you librarian ?"}</span>
            </div>
            {isLogin && <span className='mt-4 cursor-pointer text-sm'>Forgot Password</span>}
          </div>
          <SimpleButton
            handleClick={handleLoginAndSignUp}
            name={isLogin ? "Login" : "Sign Up"} className="my-4"
          />
          <p className="text-sm">
            {isLogin ? (
              <>
                Don&apos;t have an account yet?{" "}
                <span
                  onClick={() => setIsLogin(false)}
                  className="text-[#271E14] font-bold cursor-pointer underline"
                >
                  Register
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setIsLogin(true)}
                  className="text-[#271E14] font-bold cursor-pointer underline"
                >
                  Sign in
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginAndSignUp;
