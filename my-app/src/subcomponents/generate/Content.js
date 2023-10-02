import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DraggableSection from './DraggableSection';
import { Button, Card, Modal, TextInput, Textarea } from 'flowbite-react';
import { setData, getGPTData, useTopic, useData, clearData, useUrlArr, setUrlArr, useBackgroundColor } from "../../redux/newsLetterSlice"
import { useDetailPageOne, useDetailPageTwo, useDetailPageThree, useDetailPageFour } from "../../redux/DetailSlice"
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Content(props) {
    let getUserDetailPageOne = useDetailPageOne();
    let dispatch = useDispatch();
    let getDataFromRedux = useData();
    let firstPageDataFRedux = useTopic();
    let majorityColor = useBackgroundColor()
    const opacity = 1;
    return (
        <div className="h-full w-full">
            <div className={`h-[70vh] max-h-[70vh] overflow-y-scroll`} style={{ backgroundColor: majorityColor }}>
                <div className="p-4">
                    {getDataFromRedux.map(({ css, backgroundColor, id, title, content}, index, array) => (
                        <div className={
                            `${firstPageDataFRedux[2].data === 'High Gloss' && (id === 'content1' || id === 'content2' || id === 'content3')
                                ? `inline-block w-1/4 ${index !== array.length - 1 ? 'mx-5' : ''}`
                                : ''} ${''} mb-5`
                        }>
                            {id === "logo" && (
                                <div style={{ opacity, backgroundColor: backgroundColor }} className={`${css} bg-gray-600 cursor-pointer p-2 rounded-md shadow-md`}>
                                    {getUserDetailPageOne[3].data && getUserDetailPageOne[3].data !== "" && (
                                        <img src={getUserDetailPageOne[3].data}></img>
                                    )}
                                    {getUserDetailPageOne[2].data}
                                </div>
                            )}
                            {id !== "logo" && (
                                <div style={{ opacity, backgroundColor: backgroundColor }} className={`${css} bg-gray-600 cursor-pointer p-2 rounded-md shadow-md`}>
                                    {title && title !== '' && (
                                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
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