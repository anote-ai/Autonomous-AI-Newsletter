import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useAllData, setAllData, getAllNewsletter } from "../../redux/newsLetterSlice"
import defaultCardImg from '../../Images/defaultCardImg.png'
import NewsletterPage from "./NewsletterPage";

function AllnewsletterSession() {

    const pattern = /^\['.*'\]$/;
    let dispatch = useDispatch();
    let getDataFromRedux = useAllData();
    const [nData, setNData] = useState(getDataFromRedux);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getData() {
            try {
                let getData = await dispatch(getAllNewsletter());
                let temData = []
                console.log(getData)
                if (getData && getData.payload.length !== 0) {
                    temData = getData.payload;
                }
                console.log("data", temData);
                setNData(temData);
                dispatch(setAllData(temData));
                setLoading(false);
            }
            catch(e){
                alert(e);
            }
        }
        getData();
    }, [])
    const handleDelete =  (id) =>{
        let tem = JSON.parse(JSON.stringify(nData));
        let newData = tem.filter((each) =>{
            return each.id != id;
        })
        console.log(newData)
        setNData(newData)
        dispatch(setAllData(newData));
    }
    return (
        <div className="flex flex-col h-[94%] w-full my-auto bg-gray-600">
            <div className='w-full h-[10%] flex items-center justify-center mb-2'>
                <div className='w-5/6 h-full flex items-center justify-center border-b-2 border-b-slate-100'>
                    <h2 className='text-slate-200 font-bold from-neutral-50'>All newsletter</h2>
                </div>
            </div>
            <div className="w-full h-[90%] text-white overflow-scroll">
                {loading === true && (
                    <div className='w-full h-full flex items-center justify-center'>
                        <div className='w-full flex justify-items-center flex-col'>
                            <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                                <div class="animate-pulse flex space-x-4">
                                    <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                                    <div class="flex-1 space-y-6 py-1">
                                        <div class="h-2 bg-slate-200 rounded"></div>
                                        <div class="space-y-3">
                                            <div class="grid grid-cols-3 gap-4">
                                                <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                                                <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                                            </div>
                                            <div class="h-2 bg-slate-200 rounded"></div>
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
                {loading === false && nData !== undefined || nData.length === 0 && (
                    <div className='w-full h-full flex items-center justify-center'>
                        <div className='flex items-center justify-center'>
                            <h2 className='font-bold text-2xl'> You didn't create the newsletter before, so go ahead and create some.</h2>
                        </div>
                    </div>
                )}

                {loading === false && nData && nData.length !== 0 && (
                    <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                        {nData.map((each) => (
                            <NewsletterPage
                                image={defaultCardImg}
                                title={each.title}
                                description={each.data[0].title}
                                id = {each.id}
                                deleteData = {(id) => handleDelete(id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div >
    );
}

export default AllnewsletterSession;