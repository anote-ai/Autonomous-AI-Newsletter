import React from "react";
import { useState, useMemo, useRef, useEffect } from "react";
// import { login } from "../../redux/UserSlice";
import { useDispatch } from "react-redux";
import {
    Button,
    Checkbox,
    Label,
    TextInput,
    ToggleSwitch,
    Textarea,
    Select as Select1,
} from "flowbite-react";
import {
    generateBrandVoice,
    getBrandVoice,
    useBrandVoice,
    useCheckBrandVoice,
    setBrandVoice,
    setCheckBrandVoice
} from "../../redux/newsLetterSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function BrandVoice(props) {
    let dispatch = useDispatch();
    let BrandVoiceFRData = useBrandVoice();
    let CheckBrandVoiceFRData = useCheckBrandVoice();
    const [brandVoiceData, setBrandVoiceData] = useState(BrandVoiceFRData);
    const [checkBrandVoiceData, setCheckBrandVoiceData] = useState(CheckBrandVoiceFRData);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getBrandVoiceData() {
            try {
                setLoading(true)
                let data = await dispatch(getBrandVoice());
                if (data.payload && data.payload.length !== 0) {
                    console.log(JSON.parse(data.payload[0].data));
                    setBrandVoiceData([JSON.parse(data.payload[0].data)]);
                }
                setLoading(false);
            }
            catch (e) {
                console.log(e);
                alert(e);
                setLoading(false)
            }
        }
        getBrandVoiceData();
    }, [])

    const displayData = (data) => {
        return (
            <ul className="list-none list-inside m-4 p-4 bg-gray-100 rounded-lg text-black">
                {Object.entries(data).map(([key, value]) => (
                    <li key={key}>
                        {typeof value === 'object' ? (
                            <div classname="">
                                <p className="font-semibold">{key}:</p>
                                {displayData(value)}
                            </div>
                        ) : (
                            <p className="bg-orange-50 shadow-lg rounded-lg m-2 p-4">{`${key}: ${value}`}</p>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    const triggerGenerateBrandVoice = async () => {
        try {
            setLoading(true)
            let data = await dispatch(generateBrandVoice());
            console.log(data)
            if (data.payload === "error") {
                alert("Sorry, you received this alert because our AI model did not provide the correct answer. Please try again.")
            }
            else {
                setBrandVoiceData([data.payload])
            }
            setLoading(false)
        }
        catch (e) {
            console.log(e)
            alert(e)
            setLoading(false)
        }
    }

    return (
        <div className="h-[65vh] max-h-[65vh] overflow-y-scroll bg-gray-100">
            <div className="flex items-center justify-center">
            <Button outline gradientDuoTone="tealToLime"
                disable={loading}
                onClick={() => { triggerGenerateBrandVoice() }}
            >
                Generate Brand Voice
            </Button>
            </div>
            {loading && (
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
            {loading === false && brandVoiceData.length !== 0 && (
                <div>
                    {displayData(brandVoiceData[0])}
                    <div className="flex justify-center space-x-5 items-center mx-10 my-5">
                        <span className="flex text-black">
                            Do you want to use the Brand Voice when you generate the newsletter?
                        </span>
                        <ToggleSwitch
                            checked={checkBrandVoiceData}
                            onChange={function (e) {
                                console.log(e)
                                setCheckBrandVoiceData(e)
                            }}
                        />
                    </div>
                </div>
            )}
            {loading === false && brandVoiceData.length === 0 && (
                <div>
                    you not have Brand Voice Yet please generate one.
                </div>
            )}
            <div className=" absolute bottom-5 left-10">
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
                        props.nextPage(brandVoiceData, checkBrandVoiceData);
                    }}
                    className=" h-10 w-40 cursor-pointer flex justify-around font-bold text-sm items-center text-white mr-5 bg-orange-500 rounded-lg hover:bg-white hover:text-orange-500 hover:border-2 hover:border-orange-500"
                >
                    Next
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2 mt-0.5" />
                </button>
            </div>
        </div>
    );
}

export default BrandVoice;
