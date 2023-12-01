import React from 'react';
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTopic, useData, useBackgroundColor, useGenPageTwo } from "../../redux/newsLetterSlice"
import { useDetailPageOne } from "../../redux/DetailSlice"
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Content(props) {
    let getUserDetailPageOne = useDetailPageOne();
    let dispatch = useDispatch();
    let getDataFromRedux = useData();
    let majorityColor = useBackgroundColor()
    const opacity = 1;
    function isURL(str) {
        const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
        return urlPattern.test(str);
    }
    return (
        <div className="h-full w-full">
            <div className={`h-[70vh] max-h-[70vh] overflow-y-scroll`} style={{ backgroundColor: majorityColor }}>
                <div className="p-4">
                    {getDataFromRedux.map(({ css, backgroundColor, id, type, title, content, fontColor, fontStyle, fontSize }, index, array) => {
                        if (id == "content" && Array.isArray(content)) {
                            return (
                                <div key={id} className={css}>
                                    {content.map(({ id, content, title, css, backgroundColor, fontColor, fontStyle, fontSize }) => (
                                        <div className={`mb-5 w-2/5`} >
                                            <div style={{ opacity, backgroundColor: backgroundColor, color: fontColor, fontFamily: fontStyle, fontSize: fontSize }} className={`${css} p-2 rounded-md shadow-md`}>
                                                {title && title !== '' && (
                                                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" style={{ color: fontColor }}>
                                                        {title}
                                                    </h5>
                                                )}
                                                {content}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        }
                        else {
                            return (
                                <div className={`mb-5`}>
                                    {id === "logo" && (
                                        <div style={{ opacity, backgroundColor: backgroundColor, color: fontColor, fontFamily: fontStyle, fontSize: fontSize }} className={`${css} flex items-center mx-auto px-5 py-2 rounded-md shadow-md`}>
                                            {content && content !== "" && (
                                                <img className='w-10 h-10' src={content}></img>
                                            )}
                                            {title}
                                        </div>
                                    )}
                                    {id === "footer" && (
                                        <div style={{ opacity, backgroundColor: backgroundColor, color: fontColor, fontFamily: fontStyle, fontSize: fontSize }} className={`${css} cursor-pointer p-2 rounded-md shadow-md`}>
                                            {content.length !== 0 ? (content.map((each, idx) => {
                                                return (<div key={idx}> <a href={each} target="_blank"> {each}</a> </div>)
                                            })) : (<div> footer </div>)}
                                        </div>
                                    )}
                                    {id === "image" || type === "image" && (
                                        <div style={{ opacity, backgroundColor: backgroundColor, color: fontColor, fontFamily: fontStyle, fontSize: fontSize }} className={`${css} p-2 rounded-md shadow-md`}>
                                            {content && content !== "" && isURL(content) ? (
                                                <img className='w-10 h-10' src={content}></img>
                                            ) : (<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" style={{ color: fontColor }}>
                                                {content}
                                            </h5>)}
                                        </div>
                                    )}
                                    {id === "sponsor1" && (
                                        <div style={{ opacity, backgroundColor: backgroundColor, color: fontColor, fontFamily: fontStyle, fontSize: fontSize }} className={`${css} cursor-pointer p-2 rounded-md shadow-md`}>
                                            {title && title !== '' && (
                                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" style={{ color: fontColor }}>
                                                    {title}
                                                </h5>
                                            )}
                                            Sponsor By {content}
                                        </div>
                                    )}
                                    {type === "Sponsor" && (
                                        <div style={{ opacity, backgroundColor: backgroundColor, color: fontColor, fontFamily: fontStyle, fontSize: fontSize }} className={`${css} cursor-pointer p-2 rounded-md shadow-md`}>
                                            {title && title !== '' && (
                                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" style={{ color: fontColor }}>
                                                    {title}
                                                </h5>
                                            )}
                                            Sponsor By {content}
                                        </div>
                                    )}
                                    {id !== "logo" && id !== "footer" && id !== "image" && id !== "sponsor1" && type !== "Sponsor" && type !== "image" && (
                                        <div style={{ opacity, backgroundColor: backgroundColor, color: fontColor, fontFamily: fontStyle, fontSize: fontSize }} className={`${css} p-2 rounded-md shadow-md`}>
                                            {title && title !== '' && (
                                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" style={{ color: fontColor }}>
                                                    {title}
                                                </h5>
                                            )}
                                            {content}
                                        </div>
                                    )}
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
            <div className="absolute bottom-5 left-10">
                <button
                    outline
                    onClick={() => {
                        props.previousPage();
                    }}
                    className=" h-10 w-40 cursor-pointer flex justify-around font-bold text-sm items-center text-white mr-5 bg-orange-500 rounded-lg hover:bg-white hover:text-orange-500 hover:border-2 hover:border-orange-500"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2 mt-0.5" />
                    Previous
                </button>
            </div>
            <div className="absolute bottom-5 right-10">
                <button
                    outline
                    onClick={() => {
                        props.nextPage();
                    }}
                    className=" h-10 w-40 cursor-pointer flex justify-around font-bold text-sm items-center text-white mr-5 bg-orange-500 rounded-lg hover:bg-white hover:text-orange-500 hover:border-2 hover:border-orange-500"
                >
                    Save
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2 mt-0.5" />
                </button>
            </div>
        </div>
    );
}

export default Content;