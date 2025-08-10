import { MdPublishedWithChanges } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { LuUserRound } from "react-icons/lu";

export const HereComData = {
    title: "Share the Joy of Reading",
    description: "Connect with fellow book lovers, exchange your favorite reads, and discover new stories. Build a community where every book finds its next reader.",
    aggregateData: [
        {
            icon: <IoBookOutline size={25} />,
            total: "10,000+",
            label: "Books Available",
        },
        {
            icon: <LuUserRound size={25}  />,
            total: "5,000+",
            label: "Active Members",
        },
        {
            icon: <MdPublishedWithChanges size={25} />,
            total: "25,000+",
            label: "Books Exchanged",
        }
    ]

}