import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import fetcher from "../http/RequestConfig";
import { useSelector } from 'react-redux';
import { questionList } from "../constants/questionList"



export const updateDetail = createAsyncThunk("detail/set", async (payload, thunk) => {
    // console.log(payload);
    let payloadData;
    if(payload.tableName === "userDetailPageOne" || payload.tableName === "userDetailPageTwo" ){
        payloadData = {}
        payload.payload.forEach((item) => {
            payloadData[item.title] = item.data;
        });
    }
    else{
        payloadData = payload.payload.filter((item) =>{
            return (item.data !== "" && !/^\s*$/.test(item.data))
        })
        console.log(payloadData);
    }
    try{
        const response = await fetcher(`setUserDetail?table=${payload.tableName}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(payloadData)
        })
        const response_str = await response.json();
        return response_str;
    }
    catch(e){
        alert(e);
    }
});

// export const getGPTData = createAsyncThunk("GPTData/get", async (payload, thunk) => {
//     console.log(payload);
//     console.log(`run-script?key_word=${payload}`);
//     const response = await fetcher(`run-script?key_word=${payload}`, {
//         method: "GET",
//         headers: {
//             'Accept': 'application/json',
//             'Content-type': 'application/json',
//         },
//     });
//     const response_str = await response.json();
//     console.log(response_str)
//     return response_str;
// });

export const getDeatil = createAsyncThunk("detail/get", async (thunk) => {
    const response = await fetcher("getUserDetail");
    const response_str = await response.json();
    return response_str;
});

export function useDetailPageOne() {
    return useSelector((state) => {
        try {
            return state.detailReducer.pageOne;
        } catch (e) {
            return null;
        }
    });
}

export function useDetailPageTwo() {
    return useSelector((state) => {
        try {
            return state.detailReducer.pageTwo;
        } catch (e) {
            return null;
        }
    });
}

export function useDetailPageThree() {
    return useSelector((state) => {
        try {
            return state.detailReducer.pageThree;
        } catch (e) {
            return null;
        }
    });
}

export function useDetailPageFour() {
    return useSelector((state) => {
        try {
            return state.detailReducer.pageFour;
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

export const initialState = questionList;

// export const initialState = {
//     userDetail: {
//         pageOneQuestion:{
//             companyName: "",
//             url: "",
//             nameOfNewsletter: "",
//             companyLogo: "",
//             descriptionOfNewsletter: "",
//             category: [],
//             majorityColor: [],
//             fontStyles: ""
//         },
//         pageTwoQuestion:{
//             emailPlatform: "",
//             often: "",
//             language: "",
//             newsletterSize: "",
//             audienceNumber:"",
//             audienceAgeRange: "",
//             audienceIncomeLevel: "",
//             stylistic: "",
//             emojiUsage: false,
//             youTubeUrl:"",
//             facebookUrl:"",
//             instagramUrl: "",
//             twitterUrl: "",
//             linkedinUrl: "",
//             pinterestUrl: "",
//             shopUrl: "",
//             portfolioUrl: "",
//             threadsUrl: "",
//         },
//         pageThreeQuestion:{
//             brandDescribetino: "",
//             brandStatement: "",
//             dailyJobObjective: "",
//             helpTopics: "",
//             uniqueClaim: "",
//             newsletterHeaderImageOrLogo: "",
//             accentColorsInBranding: "",
//             hyperlinkColorsInBranding: "",
//             buttonColorsInBranding: "",
//             newsSources: ""
//         },
//         pageFourQuestion:{
//             question1: "",
//             question2: "",
//             question3: "",
//             question4: "",
//             question5: "",
//             question6: "",
//             question7: "",
//             question8: "",
//             question9: "",
//             question10: "",
//             question11: "",
//             question12: "",
//             question13: "",
//             question14: "",
//             question15: "",
//             question16: "",
//             question17: "",
//             question18: "",
//             question19: "",
//             question20: "",
//             question21: "",
//             question22: "",
//             question23: "",
//             question24: "",
//             question25: "",
//             question26: "",
//             question27: "",
//             question28: "",
//             question29: "",
//             question30: "",
//             question31: "",
//             question32: "",
//             question33: "",
//             question34: "",
//         }
//     },
//     allData: [
//     ]
// };

export const detailSlice = createSlice({
  name: "detail",
  initialState: initialState,
  reducers: {
    setPageOneQuestion: (state, action) => {
      // Update state for page one
      state.pageOne = action.payload;
    },
    setPageTwoQuestion: (state, action) => {
      // Update state for page two
      state.pageTwo = action.payload;
    },
    setPageThreeQuestion: (state, action) => {
      // Update state for page three
      state.pageThree = action.payload;
    },
    setPageFourQuestion: (state, action) => {
      // Update state for page four
      state.pageFour = action.payload;
    },
    clearData: (state) => {
      // Clear the state if needed
      state = initialState;
    },
  },
  // Your extraReducers for async thunks can go here
});

// Export your reducer and actions
export const {
  setPageOneQuestion,
  setPageTwoQuestion,
  setPageThreeQuestion,
  setPageFourQuestion,
  clearData,
} = detailSlice.actions;

export default detailSlice.reducer;