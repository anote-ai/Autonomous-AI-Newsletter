import React from "react";
import { useDispatch } from "react-redux";
import { HiOutlineX } from 'react-icons/hi'
import { deleteNewsletterById } from "../../redux/newsLetterSlice"

function NewsletterPage({ image, title, description, id, deleteData }) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        // console.log("sfasdfaffadf")
        try {
            // console.log("asfsfasfasdf");
            dispatch(deleteNewsletterById(id));
            deleteData(id);
        } catch (e) {
            alert(e);
        }
    };

    return (
        <div
            className="relative bg-gray-700 rounded mb-8 overflow-hidden shadow-lg md:hover:scale-110 transition-all duration-500 cursor-pointer"
        >
            <div className="absolute top-2 right-2 text-white cursor-pointer h-8 w-8" style={{ zIndex: 999 }} onClick={() => { handleDelete() }}>
                <HiOutlineX className="h-full w-full" />
            </div>
            <img className="w-full" src={image} alt={title} loading="lazy" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-300 text-base">{description}</p>
            </div>
        </div>
    );
}

export default NewsletterPage;
