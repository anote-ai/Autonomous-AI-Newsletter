import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../http/RequestConfig";
import { useSelector } from 'react-redux';


export const initialState = {
    // entities holds all normalized data.
    // Initialized to be empty, but we comment the structure for documentation purposes.
    entities: {
      sequences: {
        byId: {
          // "list1id" : {
          //     id : "list1id",
          //     name: "user name"
          // }
        },
        allIds: [
          // "list1id"
        ],
      },
      sequenceTexts : {
        byId: {
            // "list1id" : {
            //     id : "list1id",
            //     name: "user name"
            // }
        },
        allIds: [
            // "list1id"
        ],
      },
    },
    currentSequence: 0,
    currentSequenceText: 0,
    numInSequence: 0,
    numInSequenceText: 0,
    allVerified: false,
    allSent: false
};

export const createSequence = createAsyncThunk(
    "sequence/createSequence",
    async (payload, thunk) => {
      const response = await fetcher("createSequence", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const response_str = await response.json();
      console.log(response_str);
      return response_str;
    }
);

export const editSequence = createAsyncThunk(
    "sequence/editSequence",
    async (payload, thunk) => {
      const response = await fetcher("editSequence", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const response_str = await response.json();
      console.log(response_str);
      return response_str;
    }
);


export const getSequences = createAsyncThunk(
    "sequence/getSequences",
    async (payload, thunk) => {
      const response = await fetcher("getSequences", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const response_str = await response.json();
      console.log(response_str);
      return response_str;
    }
);

export const deleteSequence = createAsyncThunk(
    "sequence/deleteSequence",
    async (payload, thunk) => {
      const response = await fetcher("deleteSequence", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const response_str = await response.json();
      console.log(response_str);
      return response_str;
    }
);

export const getSequenceTexts = createAsyncThunk(
    "sequence/getSequenceTexts",
    async (payload, thunk) => {
      const response = await fetcher("getSequenceTexts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const response_str = await response.json();
      console.log(response_str);
      return response_str;
    }
);

export const editSequenceText = createAsyncThunk(
    "sequence/editSequenceText",
    async (payload, thunk) => {
      const response = await fetcher("editSequenceText", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const response_str = await response.json();
      console.log(response_str);
      return response_str;
    }
);

export const markVerified = createAsyncThunk(
  "sequence/markVerified",
  async (payload, thunk) => {
    const response = await fetcher("markVerified", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const response_str = await response.json();
    return response_str;
  }
);

export const sendEmails = createAsyncThunk(
  "sequence/sendEmails",
  async (payload, thunk) => {
    const response = await fetcher("sendEmails", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const response_str = await response.json();
    return response_str;
  }
);

export const downloadEmails = createAsyncThunk(
  "sequence/downloadEmails",
  async (payload, thunk) => {
    var path = "downloadEmails";
    if ("sequenceId" in payload) {
      path += "?sequenceId=" + payload["sequenceId"];
    }
    const response = await fetcher(path);
    response.blob().then((blob) => {
      var csvURL = window.URL.createObjectURL(blob);
      var tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", "emails.csv");
      tempLink.click();
    });
  }
);

export const samplePrompt = createAsyncThunk(
  "sequence/samplePrompt",
  async (payload, thunk) => {
    const response = await fetcher("samplePrompt", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const response_str = await response.json();
    return response_str;
  }
);

function clearSequences(state) {
    state.currentSequence = 0;
    state.numInSequence = 0;
    state.entities.sequences.allIds = [];
    state.entities.sequences.byId = {};
    return state;
}

function clearSequenceTexts(state) {
    state.entities.sequenceTexts.allIds = [];
    state.entities.sequenceTexts.byId = {};
    return state;
}

export function useSequences() {
    return useSelector((state) => {
      var sequences = [];
      state.sequenceReducer.entities.sequences.allIds.forEach((id) => {
        var sequence = state.sequenceReducer.entities.sequences.byId[id];
        sequences.push(sequence);
      });
      console.log("sequences", sequences);
      return sequences;
    });
  }


export function useSequenceText() {
    return useSelector((state) => {
      var sequence_texts = [];
      state.sequenceReducer.entities.sequenceTexts.allIds.forEach((id) => {
        var sequence_text = state.sequenceReducer.entities.sequenceTexts.byId[id];
        sequence_texts.push(sequence_text);
      });
      return sequence_texts;
    });
}

export function useNumInSequence() {
  return useSelector((state) => {
    return state.sequenceReducer.numInSequence;
  });
}
export function useNumInSequenceText() {
  return useSelector((state) => {
    return state.sequenceReducer.numInSequenceText;
  });
}
export function useCurrentSequence() {
  return useSelector((state) => {
    if (state.sequenceReducer.currentSequence in state.sequenceReducer.entities.sequences.byId) {
      return state.sequenceReducer.entities.sequences.byId[state.sequenceReducer.currentSequence];
    } else {
      return {};
    }
  });
}

export function useCurrentSequenceText() {
  return useSelector((state) => {
    if (state.sequenceReducer.currentSequenceText in state.sequenceReducer.entities.sequenceTexts.byId) {
      return state.sequenceReducer.entities.sequenceTexts.byId[state.sequenceReducer.currentSequenceText];
    } else {
      return {};
    }
  });
}

export function useAllVerified() {
  return useSelector((state) => {
    return state.sequenceReducer.allVerified;
  });
}
export function useAllSent() {
  return useSelector((state) => {
    return state.sequenceReducer.allSent;
  });
}


export const sequenceSlice = createSlice({
    name: "sequence",
    initialState: initialState,
    reducers: {
      setCurrentSequenceId: (state, action) => {
        //   // Here, you can update the state based on the action.payload
        //   // For example, if you have a 'sequenceText' property in your state:
          state.currentSequence = action.payload;
      },
      setCurrentSequenceTextId: (state, action) => {
      //   // Here, you can update the state based on the action.payload
      //   // For example, if you have a 'sequenceText' property in your state:
        state.currentSequenceText = action.payload;
      },
    },
    extraReducers: {
      [createSequence.fulfilled]: (state, action) => {
    //     state = clearSequences(state);
    //     profiles.forEach((profile) => {
    //       var id = profile["id"];
    //       state.entities.sequences.allIds.push(id);
    //       state.entities.sequences.byId[id] = profile;
    //     });
    //     state.numUnlocked = action.payload["numUnlocked"];
    //   },
      },
      [editSequence.fulfilled]: (state, action) => {
        // var profiles = action.payload["profiles"];
        // state = clearSequences(state);
        // profiles.forEach((profile) => {
        //   var id = profile["id"];
        //   state.entities.sequences.allIds.push(id);
        //   state.entities.sequences.byId[id] = profile;
        // });
        // state.numInList = action.payload["numInList"];
      },
      [getSequences.fulfilled]: (state, action) => {
        var sequences = action.payload["sequences"];
        state = clearSequences(state);
        sequences.forEach((sequence) => {
          var id = sequence["id"];
          state.entities.sequences.allIds.push(id);
          state.entities.sequences.byId[id] = sequence;
        });
        state.numInSequence = action.payload["numInSequence"];
      },
      [deleteSequence.fulfilled]: (state, action) => {
        // var profiles = action.payload["profiles"];
        // state = clearSequences(state);
        // profiles.forEach((profile) => {
        //   var id = profile["id"];
        //   state.entities.sequences.allIds.push(id);
        //   state.entities.sequences.byId[id] = profile;
        // });
        // state.numUnlockedNotInList = action.payload["numUnlockedNotInList"];
      },
      [editSequenceText.fulfilled]: (state, action) => {
        // var lists = action.payload["lists"];
        // state = clearSequenceTexts(state);
        // lists.forEach((list) => {
        //   var id = list["id"];
        //   state.entities.sequenceTexts.allIds.push(id);
        //   state.entities.sequenceTexts.byId[id] = list;
        // });
      },
      [getSequenceTexts.fulfilled]: (state, action) => {
        var sequenceTexts = action.payload["sequenceTexts"];
        state = clearSequenceTexts(state);
        sequenceTexts.forEach((sequenceText) => {
          var id = sequenceText["id"];
          state.entities.sequenceTexts.allIds.push(id);
          state.entities.sequenceTexts.byId[id] = sequenceText;
        });
        state.numInSequenceText = action.payload["numInSequenceText"];
        state.allVerified = action.payload["allVerified"];
        state.allSent = action.payload["allSent"];
      },
      [sendEmails.fulfilled]: (state, action) => {

      },
      [markVerified.fulfilled]: (state, action) => {

      },
    },
  });

  export const { setCurrentSequenceId, setCurrentSequenceTextId } = sequenceSlice.actions;