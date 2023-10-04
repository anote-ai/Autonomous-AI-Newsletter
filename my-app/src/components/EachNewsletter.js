import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Modal, TextInput, Textarea } from 'flowbite-react';
import { setData, getGPTData, useTopic, clearData, useUrlArr, setUrlArr, useBackgroundColor, useAllData } from "../redux/newsLetterSlice"
import { useParams } from 'react-router-dom';
import { faCode, faCopy } from '@fortawesome/free-solid-svg-icons';

function EachNewsletter(props) {
    let { id } = useParams();
    let nData = useAllData();
    // console.log(data)
    const [backgroundColor, setBackgroundColor] = useState('')
    const [data, setData] = useState([]);
    const [theme, setTheme] = useState('');
    const [title, setTitle] = useState('');
    useEffect(() => {
        id = Number(id)
        nData.forEach((item) => {
            if (item.id === id) {
                setBackgroundColor(item.backgroundColor)
                setData(item.data)
                setTheme(item.theme)
                setTitle(item.title)
                console.log(item.data)
            }
        })
    }, [])
    function isURL(str) {
        const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
        return urlPattern.test(str);
    }
    const copyHTMLContent = () => {
        const newsletterElement = document.querySelector('.bg-gray-900');
        const tempElement = document.createElement('div');
        tempElement.appendChild(newsletterElement.cloneNode(true));
        const htmlContent = tempElement.innerHTML;
        copyToClipboard(htmlContent);
    };

    const copyContentWithTitleAndFontColor = () => {
        const contentElements = document.querySelectorAll('.bg-gray-600, .text-gray-900');
        const copiedContent = Array.from(contentElements).map((element) => element.textContent).join('\n');
        copyToClipboard(copiedContent);
    };

    const copyToClipboard = (text) => {
        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = text;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextArea);
        alert("Copied to clipboard!");
    };
    const opacity = 1;
    return (
        <div className="bg-gray-800 w-screen h-[94%]">
            <div className="w-screen flex flex-col">
                <div className="w-3/4 mx-auto text-white my-auto overflow-scroll">
                    <div class="bg-gray-900 relative min-h-[85vh] rounded-xl border-gray-300 border-2 text-center pt-3">
                        <div className="h-full w-full">
                            <div className={`h-[80vh] max-h-[80vh] overflow-y-scroll`} style={{ backgroundColor: backgroundColor }}>
                                <h2>{title}</h2>
                                <div className="p-4">
                                    {data.map(({ css, backgroundColor, id, title, content, fontColor, fontStyle, fontSize }, index, array) => {
                                        if(id == "content" && Array.isArray(content)) {
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
                                        else{
                                        return (
                                        <div className={`mb-5`}>
                                            {id === "logo" && (
                                                <div style={{ opacity, backgroundColor: backgroundColor, color: fontColor, fontFamily: fontStyle, fontSize: fontSize }} className={`${css} flex items-center px-5 py-2 rounded-md shadow-md`}>
                                                    {content && content !== "" && (
                                                        <img className='w-10 h-10' src={content}></img>
                                                    )}
                                                    {title}
                                                </div>
                                            )}
                                            {id === "footer" && (
                                                <div style={{ opacity, backgroundColor: backgroundColor, color: fontColor, fontFamily: fontStyle, fontSize: fontSize }} className={`${css} p-2 rounded-md shadow-md`}>
                                                    {content.map((each) => {
                                                        return (<div> {each} </div>)
                                                    })}
                                                </div>
                                            )}
                                            {id === "image" && (
                                                <div style={{ opacity, backgroundColor: backgroundColor, color: fontColor, fontFamily: fontStyle, fontSize: fontSize }} className={`${css} p-2 rounded-md shadow-md`}>
                                                    {content && content !== "" && isURL(content) ? (
                                                        <img className='w-10 h-10' src={content}></img>
                                                    ) : (<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" style={{ color: fontColor }}>
                                                        {content}
                                                    </h5>)}
                                                </div>
                                            )}
                                            {id !== "logo" && id !== "footer" && id !== "image" && (
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
                        </div>
                    </div>
                </div>
                <div className='flex w-full justify-around mt-4'>
                    <Button onClick={copyHTMLContent} className="w-max flex">
                        <FontAwesomeIcon icon={faCode} className='mr-2 mt-0.5'/>
                        Copy HTML Content
                    </Button>
                    <Button onClick={copyContentWithTitleAndFontColor} className="w-max flex">
                        <FontAwesomeIcon icon={faCopy} className='mr-2 mt-0.5'/>
                        Copy Content, Title, and Font Color
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default EachNewsletter;