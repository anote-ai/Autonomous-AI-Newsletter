// import { useDispatch } from "react-redux";
// import { login } from "../../redux/UserSlice";
import React, { useState, useEffect } from "react";
import "../../styles/Detail.css";
import DetailPage from "./DetailPage";
import { useLocation } from "react-router-dom";
import { updateDetail } from "../../redux/DetailSlice"
import { Modal, ModalBody, ModalHeader, Button, Progress } from 'flowbite-react';
import { mainPagePath } from "../../constants/RouteConstants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCompanyName, setNewsLetterDetail, setIndustry, useCompanyName, useNewsLetterDetail, useIndustry } from "../../redux/DetailSlice"

function DetailSession(props) {
    const questionList = {
        pageOne:[
            {
                title: "Brand or Company Name",
                require: true,
                type: "input"
            },
            {
                title: "URL",
                require: true,
                type: "url"
            },
            {
                title: "Name of Publication or Newsletter",
                require: true,
                type: "input"
            },
            {
                title: "Newsletter Header Image or Company Logo",
                require: true,
                type: "url"
            },
            {
                title: "Description of Newsletter",
                require: true,
                type: "text"
            },
            {
                title: "Business Category",
                require: true,
                type: "bubbleSelect"
            },
            {
                title: "1-2 colors used on the majority of your branding",
                require: true,
                type: "colorSelect"
            },
            {
                title: "Select your font styles",
                require: "fontSelect",
                type: "fontSelect"
            },
        ],
        pageTwo:[
            {
                title: "Which email platform do you use?",
                require: false,
                type: "input"
            },
            {
                title: "How often do you send your newsletter?",
                require: false,
                type: "timeSelect"
            },
            {
                title: "Publication Language",
                require: false,
                type: "languageSelect"
            },
            {
                title: "Newsletter Size",
                require: false,
                type: "fontSelect"
            },
            {
                title: "Audience Demographics",
                require: false,
                type: "number"
            },
            {
                title: "Audience Age Range",
                require: false,
                type: "numberRange"
            },
            {
                title: "Audience Income Level",
                require: false,
                type: "incomeRange"
            },
            {
                title: "Stylistic Choice",
                require: false,
                type: "styleSelect"
            },
            {
                title: "Emoji Usage",
                require: false,
                type: "toggleSwitch"
            },
            {
                title: "YouTube Channel URL",
                require: false,
                type: "url"
            },
            {
                title: "Facebook URL",
                require: false,
                type: "url"
            },
            {
                title: "Instagram URL",
                require: false,
                type: "url"
            },
            {
                title: "Twitter URL",
                require: false,
                type: "url"
            },
            {
                title: "Linkedin URL",
                require: false,
                type: "url"
            },
            {
                title: "Pinterest URL",
                require: false,
                type: "url"
            },
            {
                title: "Shop URL",
                require: false,
                type: "url"
            },
            {
                title: "Portfolio URL",
                require: false,
                type: "url"
            },
            {
                title: "Threads URL",
                require: false,
                type: "url"
            },
        ],
        pageThree:[
            {
                title: "Describe your brand in 3-10 words OR Select up to 5 words that would best describe your brand voice",
                require: true,
                type: "text"
            },
            {
                title: "Do you have a brand mission statement?",
                require: false,
                type: "text"
            },
            {
                title: "Daily Job Objective",
                require: false,
                type: "text"
            },
            {
                title: "Help Topics",
                require: false,
                type: "text"
            },
            {
                title: "Unique Claim",
                require: false,
                type: "text"
            },
            {
                title: "Newsletter Header Image or Company Logo",
                require: false,
                type: "url"
            },
            {
                title: "Accent colors, hyperlink & button colors, neutrals in your branding",
                require: false,
                type: "colorSelect"
            },
            {
                title: "Trusted News Sources",
                require: false,
                type: "text"
            },
        ],
        pageFour:[
            {
                title: "What are some phrases that sound just like you or your brand?",
                require: false,
                type: "text"
            },
            {
                title: "Optional—drop in a writing sample of some of your work.  We'll snag some of your common phrases, basic syntax, & average reading level you prefer to stick to.",
                require: false,
                type: "text"
            },
            {
                title: "Opposites day—now give me the words you never use in your branding ... or just hate.",
                require: false,
                type: "text"
            },
            {
                title: "What are some other brands with aesthetics and/or voices you enjoy?",
                require: false,
                type: "text"
            },
            {
                title: "If your brand could go shopping, where would it go? (Clothing, home stuff, doesn't matter.)",
                require: false,
                type: "text"
            },
            {
                title: "How do YOU want to be viewed by your audience?",
                require: false,
                type: "text"
            },
            {
                title: "This section is optional, but better inputs = better copy. If you'd like the copy to sound like your brand & reflect your brand's opinions, select your 5 favorite questions below and spitball some answers.",
                require: false,
                type: "text"
            },
            {
                title: "What are your brand's core values?",
                require: false,
                type: "text"
            },
            {
                title: "What is something you think everyone should do at least once in their lives?",
                require: false,
                type: "text"
            },
            {
                title: "What`s worth spending more on to get the best?",
                require: false,
                type: "text"
            },
            {
                title: "What gets you fired up in your industry?",
                require: false,
                type: "text"
            },
            {
                title: "What is something a ton of people are obsessed with but you just don`t get the point of?",
                require: false,
                type: "text"
            },
            {
                title: "What risks are worth taking?",
                require: false,
                type: "text"
            },
            {
                title: "What is one personal “rule” you never break?",
                require: false,
                type: "text"
            },
            {
                title: "What could you do with two million dollars to impact the most people?",
                require: false,
                type: "text"
            },
            {
                title: "Imagination time: You get to pick any character or famous person to embody your brand voice. Who do you pick?",
                require: false,
                type: "text"
            },
            {
                title: "If you could have a never-ending candle that smelled like anything you wanted, what fragrance would you want it to be? ",
                require: false,
                type: "text"
            },
            {
                title: "What`s your favorite piece of clothing you own?",
                require: false,
                type: "text"
            },
            {
                title: "What songs have you completely memorized?",
                require: false,
                type: "text"
            },
            {
                title: "What would your perfect room look like?",
                require: false,
                type: "text"
            },
            {
                title: "If I spied on you for a week, what are 3-4 types of beverages you'd be sipping on?",
                require: false,
                type: "text"
            },
            {
                title: "What shows, books, or movies are you into—some shows you've binged lately, or just favorite shows of all time?",
                require: false,
                type: "text"
            },
            {
                title: "What did you think you would grow out of but haven`t? ",
                require: false,
                type: "text"
            },
            {
                title: "What would be some of the most annoying things about having yourself as a roommate?",
                require: false,
                type: "text"
            },
            {
                title: "If your brand could identify with an object and/or a color, what would it identify with?",
                require: false,
                type: "text"
            },
            {
                title: "If you had your own magazine or TV network, what would it be about?",
                require: false,
                type: "text"
            },
            {
                title: "What was the best compliment you or your brand ever received?",
                require: false,
                type: "text"
            },
            {
                title: "When do you feel truly “alive”?",
                require: false,
                type: "text"
            },
            {
                title: "What dumb accomplishment are you most proud of?",
                require: false,
                type: "text"
            },
            {
                title: "You're throwing a brand party—where's the location? ",
                require: false,
                type: "text"
            },
            {
                title: "If your brand were a season, which would it be?",
                require: false,
                type: "text"
            },
            {
                title: "Any chacters, memes, or social references you don't want to be referred to in your copy or GIFs?",
                require: false,
                type: "text"
            },
            {
                title: "Oh, you want me to show up? Just tell me there will be ...",
                require: false,
                type: "text"
            },
            {
                title: "Here are some of my go-to snacks",
                require: false,
                type: "text"
            },
        ]
    }

    const pageTotal = 3;
    const navigate = useNavigate();
    let dispatch = useDispatch();
    const [pageState, setPageState] = useState(1);
    const location = useLocation();
    let reduxCompanyName = useCompanyName();
    let reduxNewsLetterDetail = useNewsLetterDetail();
    let reduxIndustry = useIndustry();
    const [companyName, setCCompanyName] = useState(reduxCompanyName);
    const [newsLetterDetail, setCNewsLetterDetail] = useState(reduxNewsLetterDetail);
    const [industry, setCIndustry] = useState(reduxIndustry);
    const [progressValue, setProgressVaule] = useState(0);

    useEffect(()=>{
        let temValue = progressValue
        let progressInterval = setInterval(()=>{
            if(parseInt(temValue) === parseInt(100 *(pageState/pageTotal))){
                clearInterval(progressInterval);
            }
            else if(parseInt(temValue) < parseInt(100 *(pageState/pageTotal))){
                setProgressVaule(temValue += 0.5)
            }
            else{
                setProgressVaule(temValue -= 0.5)
            }
        }, 0.5)
    }, [pageState])

    function MsetCompany(info) {
        setCCompanyName(info);
    }
    function MnewsLetter(info) {
        setCNewsLetterDetail(info);
    }
    function Mindustry(info) {
        setCIndustry(info);
    }

    function changePage(pageNumber) {
        setPageState(pageNumber);
    }
    async function getPreviousStep() {
        if (pageState > 1) {
            let tem = pageState;
            setPageState(tem -= 1);
        }
    }
    async function getNextStep() {
        if (pageState == 3) {
            try {
                // let returnBack = await dispatch(updateDetail({ companyName: companyName, newsLetterDetail: newsLetterDetail, industry: industry }));
                alert("update success")
                dispatch(setCompanyName(companyName));
                dispatch(setNewsLetterDetail(newsLetterDetail));
                dispatch(setIndustry(industry));
                navigate(mainPagePath)
            }
            catch (e) {
                alert(e);
            }
        }
        else {
            let tem = pageState;
            setPageState(tem += 1);
        }
    }
    //   useEffect(() => {
    //     const queryParams = new URLSearchParams(location.search);
    //     const emailParam = queryParams.get("email");
    //     const codeParam = queryParams.get("passwordResetCode");

    //     if (emailParam && codeParam) {
    //       setForgotPasswordEmail(emailParam);
    //       setForgotPasswordCode(codeParam);
    //       setPageState(4);
    //     }
    //   }, []);

    return (
        // <div className=" bg-gray-800 min-h-screen">

        <div className="flex flex-col h-screen w-5/6 ml-auto min-h-screen bg-gray-600">
            <div class="w-2/3 mx-auto text-white my-64">
                <div class="bg-gray-900 rounded-xl border-gray-300 border-2 text-center pt-3">
                    <Progress
                        className="w-2/3 mx-auto my-5"
                        color="dark"
                        progress={progressValue}
                        size="lg"
                    />
                    {pageState == 1 && (
                        <DetailPage
                            qestionTitle={"Tell Us About Company"}
                            dataCurrent={companyName}
                            changeState={(info) => { MsetCompany(info) }}
                            pageNumber={pageState === 3}
                            previousPage={() => { getPreviousStep() }}
                            nextPage={() => { getNextStep() }}
                        />
                    )}
                    {pageState == 2 && (
                        <DetailPage
                            qestionTitle={"Tell Us About Newsletter You Want To Write"}
                            dataCurrent={newsLetterDetail}
                            changeState={(info) => { MnewsLetter(info) }}
                            pageNumber={pageState === 3}
                            previousPage={() => { getPreviousStep() }}
                            nextPage={() => { getNextStep() }}

                        />
                    )}
                    {pageState == 3 && (
                        <DetailPage
                            qestionTitle={"Tell Us about your industry"}
                            dataCurrent={industry}
                            changeState={(info) => { Mindustry(info) }}
                            pageNumber={pageState === 3}
                            previousPage={() => { getPreviousStep() }}
                            nextPage={() => { getNextStep() }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default DetailSession;
