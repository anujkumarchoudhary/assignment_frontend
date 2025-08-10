"use client"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUserData } from "@/redux/slices/globalSlice";

export default function InitUser() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const name = localStorage.getItem("name")
        const email = localStorage.getItem("email")
        if (token || role) {
            dispatch(setUserData({ token, role, name, email }));
        }
    }, [dispatch]);

    return null;
}
