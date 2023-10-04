import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DraggableSection from './DraggableSection';
import { Button, Card, Modal, TextInput, Textarea } from 'flowbite-react';
import { setData, getGPTData, useTopic, useData, clearData, useUrlArr, setUrlArr, useBackgroundColor, useGenPageTwo } from "../../redux/newsLetterSlice"
import { useDetailPageOne, useDetailPageTwo, useDetailPageThree, useDetailPageFour } from "../../redux/DetailSlice"
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Content(props) {
    let getUserDetailPageOne = useDetailPageOne();
    let dispatch = useDispatch();
    let getDataFromRedux = useData();
    let firstPageDataFRedux = useTopic();
    let secondPageDataFRedux = useGenPageTwo();
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
                    {getDataFromRedux.map(({ css, backgroundColor, id, title, content, fontColor, fontStyle, fontSize }, index, array) => (
                        <div className={
                            `${secondPageDataFRedux[0].data === 'High Gloss' && (id === 'content1' || id === 'content2' || id === 'content3')
                                ? `inline-block w-1/4 ${index !== array.length - 1 ? 'mx-5' : ''}`
                                : ''} ${''} mb-5`
                        }>
                            {id === "logo" && (
                                <div style={{ opacity, backgroundColor: backgroundColor, color: fontColor, fontFamily: fontStyle, fontSize: fontSize }} className={`${css} flex items-center mx-auto px-5 py-2 rounded-md shadow-md`}>
                                    {content && content !== "" && (
                                        <img className='w-10 h-10' src={content}></img>
                                    )}
                                    {title}
                                </div>
                            )}
                            {id === "footer" && (
                                <div style={{ opacity, backgroundColor: backgroundColor, color: fontColor, fontFamily: fontStyle, fontSize: fontSize }} className={`${css} bg-gray-600 p-2 rounded-md shadow-md`}>
                                    {content.map((each) => {
                                        return (<div> {each} </div>)
                                    })}
                                </div>
                            )}
                            {id === "image" && (
                                <div style={{ opacity, backgroundColor: backgroundColor, color: fontColor, fontFamily: fontStyle, fontSize: fontSize }} className={`${css} bg-gray-600 p-2 rounded-md shadow-md`}>
                                    {content && content !== "" && isURL(content) ? (
                                        <img className='w-10 h-10' src={content}></img>
                                    ) : (<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" style={{ color: fontColor }}>
                                        {content}
                                    </h5>)}
                                </div>
                            )}
                            {id !== "logo" && id !== "footer" && id !== "image" && (
                                <div style={{ opacity, backgroundColor: backgroundColor, color: fontColor, fontFamily: fontStyle, fontSize: fontSize }} className={`${css} bg-gray-600 p-2 rounded-md shadow-md`}>
                                    {title && title !== '' && (
                                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" style={{ color: fontColor }}>
                                            {title}
                                        </h5>
                                    )}
                                    {content}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-5 left-10">
                <Button
                    outline
                    onClick={() => {
                        props.previousPage();
                    }}
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2 mt-0.5" />
                    Previous
                </Button>
            </div>
            <div className="absolute bottom-5 right-[50%]">
                <Button
                    outline
                    onClick={() => {
                        dispatch(clearData());
                    }}
                >
                    Clear Data
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2 mt-0.5" />
                </Button>
            </div>
            <div className="absolute bottom-5 right-10">
                <Button
                    outline
                    onClick={() => {
                        props.nextPage();
                    }}
                >
                    Save
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2 mt-0.5" />
                </Button>
            </div>
        </div>
    );
}

export default Content;