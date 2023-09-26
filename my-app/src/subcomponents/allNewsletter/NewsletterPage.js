import React from "react";
import { useNavigate } from "react-router-dom";

function NewsletterPage({ image, title, description }) {
    const navigate = useNavigate();

    // const handleClick = () => {
    //     window.location.href = "#top";
    //     switch (title) {
    //         case "Newsletter":
    //             window.open("https://newsletter.anote.ai", "_blank");
    //             break;
    //         case "Private GPT":
    //             window.location.assign(
    //                 window.location["origin"] + "/privategpt#Private GPT"
    //             );
    //             break;
    //         default:
    //             //window.location.assign(window.location["origin"] + route + "#top");
    //             //navigate(route);
    //             window.open("https://sababa.anote.ai", "_blank");
    //             navigate(route);
    //     }
    // };
    return (
        // <div className="Product" onClick={handleClick}>
        //   <img src={image} alt={title} className="Product-Image" />
        //   <div className="Product-Info">
        //     <h2 className="Product-Title">{title}</h2>
        //     <p className="Product-Description">{description}</p>
        //   </div>
        // </div>
        <div
            class="bg-gray-700 rounded mb-8 overflow-hidden shadow-lg md:hover:scale-110 transition-all duration-500 cursor-pointer"
            // onClick={handleClick}
        >
            <img class="w-full" src={image} alt={title} loading="lazy" />
            <div class="px-6 py-4 ">
                <div class="font-bold text-xl mb-2">{title}</div>
                <p class="text-gray-300 text-base">{description}</p>
            </div>
        </div>
    );
}

export default NewsletterPage;