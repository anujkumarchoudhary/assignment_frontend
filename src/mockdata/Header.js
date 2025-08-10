import { IoBookOutline } from "react-icons/io5";

import { FaRegUser } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";


export const headerData = {
    "leftSide": {
        icon: <IoBookOutline size={33} />,
        name: "BookSwap"
    },
    "centerSide": [
        {
            label: "Browse Books",
            path: "#"
        },
        {
            label: "My Books",
            path: "/mybooks"
        },
        {
            label: "Requests",
            path: "/requests"
        }
    ],
    "rightSide": [
        {
            icon: <GoPlus size={20} />,
            name: "Add Book"
        },
        {
            icon: <FaRegUser />,
            path: "login&SignUp"
        }
    ],

}