import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../http/RequestConfig";
import { useSelector } from 'react-redux';



export const updateDetail = createAsyncThunk("detail/set", async (payload, thunk) => {
    const response = await fetcher("setUserDetail", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
    const response_str = await response.json();
    return response_str;
});

export const getDeatil = createAsyncThunk("detail/get", async (thunk) => {
    const response = await fetcher("getUserDetail");
    const response_str = await response.json();
    return response_str;
});


export function useCompanyName() {
    return useSelector((state) => {
        try {
            return state.detailReducer.companyName;
        } catch (e) {
            return null;
        }
    });
}
export function useNewsLetterDetail() {
    return useSelector((state) => {
        try {
            return state.detailReducer.newsLetterDetail;
        } catch (e) {
            return null;
        }
    });
}
export function useIndustry() {
    return useSelector((state) => {
        try {
            return state.detailReducer.industry;
        } catch (e) {
            return null;
        }
    });
}

export const initialState = {
    companyName: '',
    newsLetterDetail: '',
    industry: ''
};

export const detailSlice = createSlice({
    name: "detail",
    initialState: initialState,
    reducers: {
        setCompanyName: (state, action) => {
            state.companyName = action.payload;
        },
        setNewsLetterDetail: (state, action) => {
            state.newsLetterDetail = action.payload;
        },
        setIndustry: (state, action) => {
            state.industry = action.payload;
        },
    },
});

export const {
    setCompanyName,
    setNewsLetterDetail,
    setIndustry,
} = detailSlice.actions;