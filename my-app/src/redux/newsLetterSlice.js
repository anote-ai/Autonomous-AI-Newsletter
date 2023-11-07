import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import fetcher from "../http/RequestConfig";
import { useSelector } from 'react-redux';
import { GenerateQestion } from "../constants/GenerateQestion";




export const getGPTData = createAsyncThunk("GPTData/get", async (payload, thunk) => {
    // console.log(payload);
    // console.log(`run-script?key_word=${payload}`);
    // https://news.google.com/search?q=trend%20style&hl=en-US&gl=US&ceid=US%3Aen
    // console.log(payload);
    // let searchTopic = "";
    // if(payload.topic.length == 1){
    //     searchTopic = payload.topic[0];
    // }
    // else if(payload.topic.length > 1){

    // }
    console.log(payload.topic);
    let reqBody = {
        newsId: payload.newsId,
        characterStyle: payload.characterStyle,
        topic: payload.topic,
        urlList: payload.temUrlArr
    }
    console.log(JSON.stringify(reqBody))
    const response = await fetcher('run-script', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(reqBody)
    });
    // console.log("step1111")
    const response_str = await response.json();
    console.log(response_str)
    return response_str;
});

export const getIntroData = createAsyncThunk("IntroData/get", async (payload, thunk) => {
    let reqBody = {
        characterStyle: payload.characterStyle,
    }
    const response = await fetcher('getIntroData', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(reqBody)
    });
    // console.log("step1111")
    const response_str = await response.json();
    // console.log(response_str)
    return response_str;
});

export const getStoryData = createAsyncThunk("StoryData/get", async (payload, thunk) => {
    let reqBody = {
        idea: payload.idea,
        characterStyle: payload.characterStyle
    }
    console.log("reererere", reqBody);
    const response = await fetcher('getStoryData', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(reqBody)
    });
    // console.log("step1111")
    const response_str = await response.json();
    // console.log(response_str)
    return response_str;
});

export const getArticleData = createAsyncThunk("ArticleData/get", async (payload, thunk) => {
    let reqBody = {
        idea: payload.idea,
        characterStyle: payload.characterStyle
    }
    console.log("reererere", reqBody);
    const response = await fetcher('getArticleData', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(reqBody)
    });
    // console.log("step1111")
    const response_str = await response.json();
    // console.log(response_str)
    return response_str;
});

export const setNewsletter = createAsyncThunk("newsletter/set", async (payload, thunk) => {
    // console.log(payload);
    // console.log(`run-script?key_word=${payload}`);
    // https://news.google.com/search?q=trend%20style&hl=en-US&gl=US&ceid=US%3Aen
    // console.log(payload);
    // let searchTopic = "";
    // if(payload.topic.length == 1){
    //     searchTopic = payload.topic[0];
    // }
    // else if(payload.topic.length > 1){

    // }
    // console.log(payload.firstPageData[3]);

    let reqBody = {
        topic: payload.firstPageData[0].data,
        backgroundColor: payload.BackgroundColor,
        data: payload.data,
        idea_id: payload.thirdPageData[0].ideaId,
        theme: payload.secondPageData[0].data,
        character: payload.fourthPageData[0].data
    }
    console.log(reqBody)
    console.log(JSON.stringify(reqBody))
    const response = await fetcher('setNewsletterData', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(reqBody)
    });
    const response_str = await response.json();
    console.log(response_str)
    return response_str;
    // return true
});

export const deleteNewsletterById = createAsyncThunk("newsletter/delete", async (payload, thunk) => {
    // console.log(payload);
    // console.log(`run-script?key_word=${payload}`);
    // https://news.google.com/search?q=trend%20style&hl=en-US&gl=US&ceid=US%3Aen
    // console.log(payload);
    // let searchTopic = "";
    // if(payload.topic.length == 1){
    //     searchTopic = payload.topic[0];
    // }
    // else if(payload.topic.length > 1){

    // }
    console.log(payload);
    const response = await fetcher(`deleteNewsletterData?id=${payload}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
    });
    const response_str = await response.json();
    console.log(response_str)
    return response_str;
});

export const getAllNewsletter = createAsyncThunk("newsletter/getAll", async (payload, thunk) => {

    const response = await fetcher('getNewsletterData', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
    });
    const response_str = await response.json();
    // console.log(response_str)
    return response_str;
    // return true
});

export const getAllIdeas = createAsyncThunk("Ideas/getAll", async (payload, thunk) => {

    const response = await fetcher('getAllIdeasData', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
    });
    const response_str = await response.json();
    // console.log(response_str)
    return response_str;
    // return true
});

export const generateIdeas = createAsyncThunk("Ideas/generate", async (payload, thunk) => {

    const response = await fetcher('getIdeasFromGPT', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
    });
    const response_str = await response.json();
    // console.log(response_str)
    return response_str;
    // return true
});

export const updateIdeas = createAsyncThunk("Ideas/update", async (payload, thunk) => {
    console.log("payload", payload)
    const response = await fetcher('updateIdeasData', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(payload)
    });
    const response_str = await response.json();
    // console.log(response_str)
    return response_str;
    // return true
});

export const deleteIdeas = createAsyncThunk("Ideas/delete", async (payload, thunk) => {
    const response = await fetcher('deleteIdeasData', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(payload)
    });
    const response_str = await response.json();
    // console.log(response_str)
    return response_str;
    // return true
});

export const generateBrandVoice = createAsyncThunk("BrandVoice/generate", async (payload, thunk) => {
    const response = await fetcher('generateBrandVoice', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
    });
    const response_str = await response.json();
    // console.log(response_str)
    return response_str;
    // return true
});

export const getBrandVoice = createAsyncThunk("BrandVoice/get", async (payload, thunk) => {
    const response = await fetcher('getBrandVoice', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
    });
    const response_str = await response.json();
    // console.log(response_str)
    return response_str;
    // return true
});

export function useBackgroundColor() {
    return useSelector((state) => {
        try {
            return state.newsLetterReducer.backgroundColor;
        } catch (e) {
            return null;
        }
    });
}


export function useTopic() {
    return useSelector((state) => {
        try {
            return state.newsLetterReducer.pageOne;
        } catch (e) {
            return null;
        }
    });
}
export function useGenPageTwo() {
    return useSelector((state) => {
        try {
            return state.newsLetterReducer.pageTwo;
        } catch (e) {
            return null;
        }
    });
}
export function useGenPageThree() {
    return useSelector((state) => {
        try {
            return state.newsLetterReducer.pageThree;
        } catch (e) {
            return null;
        }
    });
}
export function useGenPageFour() {
    return useSelector((state) => {
        try {
            return state.newsLetterReducer.pageFour;
        } catch (e) {
            return null;
        }
    });
}
export function useIdeas() {
    return useSelector((state) => {
        try {
            return state.newsLetterReducer.ideas;
        } catch (e) {
            return null;
        }
    });
}
export function useData() {
    return useSelector((state) => {
        try {
            return state.newsLetterReducer.data;
        } catch (e) {
            return null;
        }
    });
}
export function useUrlArr() {
    return useSelector((state) => {
        try {
            return state.newsLetterReducer.urlArr;
        } catch (e) {
            return null;
        }
    });
}
export function useAllData() {
    return useSelector((state) => {
        try {
            return state.newsLetterReducer.allData;
        } catch (e) {
            return null;
        }
    });
}
export function useBrandVoice() {
    return useSelector((state) => {
        try {
            return state.newsLetterReducer.brandVoice;
        } catch (e) {
            return null;
        }
    });
}
export function useCheckBrandVoice() {
    return useSelector((state) => {
        try {
            return state.newsLetterReducer.useBrandVoice;
        } catch (e) {
            return null;
        }
    });
}


// function clearCurrent(state) {
//     state.current.detailId = 0;
//     state.current.companyName = '';
//     state.current.newsLetterDetail = '';
//     state.current.industry = '';
//     state.current.topic = '';
//     state.current.data = [];
//     state.current.styleInfo = {};
// }

export const initialState = GenerateQestion;
// export const initialState = {
//     current: {
//         topic: '',
//         data: [],
//     },
//     allData: [
//     ]
// };

export const newsLetterSlice = createSlice({
    name: "newsLetter",
    initialState: initialState,
    reducers: {
        setTopic: (state, action) => {
            state.pageOne = action.payload;
        },
        setGenPageTwo: (state, action) => {
            state.pageTwo = action.payload;
        },
        setGenPageThree: (state, action) => {
            state.pageThree = action.payload;
        },
        setGenPageFour: (state, action) => {
            state.pageFour = action.payload;
        },
        setBackgroundColor: (state, action) => {
            state.backgroundColor = action.payload;
        },
        setIdeas: (state, action) => {
            state.ideas = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
        setUrlArr: (state, action) => {
            state.urlArr = action.payload;
        },
        setAllData: (state, action) => {
            state.allData = action.payload;
        },
        setBrandVoice: (state, action) => {
            state.brandVoice = action.payload;
        },
        setCheckBrandVoice: (state, action) => {
            state.useBrandVoice = action.payload;
        },
        clearAllData: (state, action) => {
            state.data = [];
            for (let i = 0; i < 6; i++) {
                state.pageOne[i].data = '';
            }
        },
        clearData: (state, action) => {
            state.data = [];
            state.urlArr = [];
            // for(let i = 0; i < 6; i++){
            //     state.pageOne[i].data = '';
            // }
        },
    },
    // extraReducers: {
    //     // [getDeatil.fulfilled]: (state, action) => {
    //     //     console.log(action);
    //     //     state.current = {
    //     //         ...state.current,
    //     //         companyName: action.payload.companyName,
    //     //         newsLetterDetail: action.payload.newsLetterDetail,
    //     //         industry: action.payload.industry,
    //     //     };
    //     // },
    //     // [getGPTData.fulfilled]: (state, action) => {
    //     //     console.log(action);
    //     //     state.current = {
    //     //         ...state.current,
    //     //         data: action.payload
    //     //     };
    //     // },
    // },
});

export const {
    setTopic,
    setGenPageTwo,
    setGenPageThree,
    setGenPageFour,
    setBackgroundColor,
    setIdeas,
    setData,
    setUrlArr,
    setAllData,
    setBrandVoice,
    setCheckBrandVoice,
    clearAllData,
    clearData
} = newsLetterSlice.actions;