import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Button, Card } from 'flowbite-react';
// import Image from 'next/image'
import { useAllData, setAllData, getAllNewsletter, clearData } from "../../redux/newsLetterSlice"
import defaultCardImg from '../../Images/defaultCardImg.png'
import { useNavigate } from "react-router-dom";
import { HiOutlineX } from 'react-icons/hi'
import { deleteNewsletterById } from "../../redux/newsLetterSlice"

function Allnewsletter() {
    const pattern = /^\['.*'\]$/;
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let getDataFromRedux = useAllData();
    const [nData, setNData] = useState(getDataFromRedux);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getData() {
            let getData = await dispatch(getAllNewsletter());
            let temData = []
            console.log(getData)
            if (getData && getData.payload.length !== 0) {
                temData = getData.payload;

                // temData = getData.payload.map((item) => {
                //     let temObj = {};
                //     temObj.title = item["title"];
                //     console.log("item first", item);
                //     let arrayData = item['data']
                //         .replace(/"/g, '\\"')
                //         .replace(/'/g, "\\'")
                //         .replace(/\\"/g, '"')
                //         .replace(/\\'/g, "'")
                //     console.log('second cover', arrayData);
                //     arrayData = JSON.parse(arrayData);
                //     // console.log(arrayData[0]['summary'])
                //     temObj["data"] = arrayData;
                //     return temObj;
                // })
            }
            console.log("data", temData);
            setNData(temData);
            dispatch(setAllData(temData));
            setLoading(false);
        }
        getData();
    }, [])
    const handleDelete = (e, id) =>{
        e.stopPropagation();
        try {
            // console.log("asfsfasfasdf");
            dispatch(deleteNewsletterById(id));
            let tem = JSON.parse(JSON.stringify(nData));
            let newData = tem.filter((each) =>{
                return each.id != id;
            })
            console.log(newData)
            setNData(newData)
            dispatch(setAllData(newData));
        } catch (e) {
            alert(e);
        }
    }
    return (
        <div className="flex flex-col h-screen w-5/6 mx-auto my-5 border-gray-700 rounded-xl border-2 overflow-y-scroll">
            <div className='w-full h-[10%] flex items-center justify-center mb-2'>
                <div className='w-5/6 h-full flex items-center justify-center border-b-2 border-b-slate-100'>
                    <div className='text-2xl py-5 text-black font-bold from-neutral-50'>All Newsletters</div>
                </div>
            </div>
            <div className="w-full text-black overflow-scroll">
                {loading === true && (
                    <div className='w-full h-full flex items-center justify-center'>
                        <div className='w-full flex justify-items-center flex-col'>
                            <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                                <div class="animate-pulse flex space-x-4">
                                    <div class="rounded-full bg-warmGray-300 h-10 w-10"></div>
                                    <div class="flex-1 space-y-6 py-1">
                                        <div class="h-2 bg-stone-300 rounded"></div>
                                        <div class="space-y-3">
                                            <div class="grid grid-cols-3 gap-4">
                                                <div class="h-2 bg-stone-300 rounded col-span-2"></div>
                                                <div class="h-2 bg-stone-300 rounded col-span-1"></div>
                                            </div>
                                            <div class="h-2 bg-stone-300 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-center'>
                                <p> Getting data, do not skip other steps...</p>
                            </div>
                        </div>
                    </div>
                )}
                {loading === false && nData && nData.length === 0 && (
                    <div className='w-full h-full flex items-center justify-center'>
                        <div className='flex items-center justify-center'>
                            <h2 className='text-xl'> Seems like you haven't created any newsletters yet. Get started by clicking below!</h2>
                        </div>
                    </div>
                    
                )}
                {console.log("nData", nData)}
                {loading === false && nData && nData.length !== 0 && (
                    <div className='w-5/6 flex justify-around flex-wrap mx-auto overflow-scroll'>
                        {nData.map((each) => (
                            <Card
                                onClick={() => { navigate("/eachNewsletter/" + each.id) }}
                                className='max-w-[300px] min-h-fit relative my-5'
                                imgSrc={defaultCardImg}>
                                <div className="absolute top-2 right-2 text-white cursor-pointer h-8 w-8" style={{ zIndex: 999 }} onClick={(e) => { handleDelete(e, each.id) }}>
                                    <HiOutlineX className="h-full w-full text-gray-900" />
                                </div>
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    <p>
                                        {each.title}
                                    </p>
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-white">
                                    <p>
                                        {each.data[0].title}
                                    </p>
                                </p>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div >
    );
}

export default Allnewsletter;