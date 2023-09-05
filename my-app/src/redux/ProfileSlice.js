import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../http/RequestConfig";
import { useSelector } from "react-redux";

export const viewUnlockedProfiles = createAsyncThunk(
  "profile/viewUnlockedProfiles",
  async (payload, thunk) => {
    const response = await fetcher("viewUnlockedProfiles", {
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

export const viewListProfiles = createAsyncThunk(
  "profile/viewListProfiles",
  async (payload, thunk) => {
    const response = await fetcher("viewListProfiles", {
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

export const viewUnlockedProfilesNotInList = createAsyncThunk(
  "profile/viewUnlockedProfilesNotInList",
  async (payload, thunk) => {
    const response = await fetcher("viewUnlockedProfilesNotInList", {
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

export const removeProfilesFromProfileList = createAsyncThunk(
  "profile/removeProfilesFromProfileList",
  async (payload, thunk) => {
    const response = await fetcher("removeProfilesFromProfileList", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const response_str = await response.json();
    return payload["profileIds"];
  }
);

export const addProfilesToProfileList = createAsyncThunk(
  "profile/addProfilesToProfileList",
  async (payload, thunk) => {
    const response = await fetcher("addProfilesToProfileList", {
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

export const viewProfileLists = createAsyncThunk(
  "profile/viewProfileLists",
  async (payload, thunk) => {
    const response = await fetcher("viewProfileLists", {
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

export const addProfileList = createAsyncThunk(
  "profile/addProfileList",
  async (payload, thunk) => {
    const response = await fetcher("addProfileList", {
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
export const editProfileList = createAsyncThunk(
  "profile/editProfileList",
  async (payload, thunk) => {
    const response = await fetcher("editProfileList", {
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

export const deleteProfileList = createAsyncThunk(
  "profile/deleteProfileList",
  async (payload, thunk) => {
    const response = await fetcher("deleteProfileList", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const response_str = await response.json();
    return payload["id"];
  }
);

export const search = createAsyncThunk(
  "profile/search",
  async (payload, thunk) => {
    const response = await fetcher("search", {
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

// Either Selected Open Search IDs (Select all works per page) or first N (which takes search parameters, does a search and uses that)
export const unlock = createAsyncThunk(
  "profile/unlock",
  async (payload, thunk) => {
    const response = await fetcher("unlock", {
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

export const viewFullProfile = createAsyncThunk(
  "profile/viewFullProfile",
  async (payload, thunk) => {
    const response = await fetcher("viewFullProfile", {
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

export const downloadProfiles = createAsyncThunk(
  "profile/downloadProfiles",
  async (payload, thunk) => {
    // const response = await fetcher("downloadProfiles", {
    //   method: "POST",
    //   headers: {
    //   'Accept': 'application/json',
    //   'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify(payload)
    // })
    // const response_str = await response.json();
    // return response_str;
    var path = "downloadProfiles";
    if ("listId" in payload) {
      path += "?listId=" + payload["listId"];
    }
    if ("downloadAll" in payload) {
      path += "?downloadAll=" + payload["downloadAll"];
    }
    const response = await fetcher(path);
    response.blob().then((blob) => {
      var csvURL = window.URL.createObjectURL(blob);
      var tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", "profiles.csv");
      tempLink.click();
    });
  }
);

export function useSearchedProfiles() {
  return useSelector((state) => {
    var profiles = [];
    state.profileReducer.entities.searchedProfiles.allIds.forEach((id) => {
      var profile = state.profileReducer.entities.searchedProfiles.byId[id];
      profiles.push(profile);
    });
    return profiles;
  });
}

export function useUnlockedProfiles() {
  return useSelector((state) => {
    var profiles = [];
    state.profileReducer.entities.unlockedProfiles.allIds.forEach((id) => {
      var profile = state.profileReducer.entities.unlockedProfiles.byId[id];
      profiles.push(profile);
    });
    return profiles;
  });
}

export function useListProfiles() {
  return useSelector((state) => {
    var profiles = [];
    state.profileReducer.entities.listProfiles.allIds.forEach((id) => {
      var profile = state.profileReducer.entities.listProfiles.byId[id];
      profiles.push(profile);
    });
    return profiles;
  });
}

export function useUnlockedProfilesNotInList() {
  return useSelector((state) => {
    var profiles = [];
    state.profileReducer.entities.unlockedProfilesNotInList.allIds.forEach(
      (id) => {
        var profile =
          state.profileReducer.entities.unlockedProfilesNotInList.byId[id];
        profiles.push(profile);
      }
    );
    return profiles;
  });
}

export function useProfileLists() {
  return useSelector((state) => {
    var lists = [];
    state.profileReducer.entities.profileLists.allIds.forEach((id) => {
      var list = state.profileReducer.entities.profileLists.byId[id];
      lists.push(list);
    });
    console.log("lists", lists);
    return lists;
  });
}

export function useProfileList(currentListId) {
  return useSelector((state) => {
    if (currentListId in state.profileReducer.entities.profileLists.byId) {
      return state.profileReducer.entities.profileLists.byId[currentListId];
    } else {
      return {};
    }
  });
}

export function useCappedNumSearchResults() {
  return useSelector((state) => {
    return state.profileReducer.cappedNumSearchResults;
  });
}

export function useNumUnlockedNotInList() {
  return useSelector((state) => {
    return state.profileReducer.numUnlockedNotInList;
  });
}

export function useNumUnlocked() {
  return useSelector((state) => {
    return state.profileReducer.numUnlocked;
  });
}

export function useNumInList() {
  return useSelector((state) => {
    return state.profileReducer.numInList;
  });
}

function clearSearchedProfiles(state) {
  state.entities.searchedProfiles.byId = {};
  state.entities.searchedProfiles.allIds = [];
  state.cappedNumSearchResults = 1;
  return state;
}

function clearUnlockedProfiles(state) {
  state.entities.unlockedProfiles.byId = {};
  state.entities.unlockedProfiles.allIds = [];
  state.numUnlocked = 1;
  return state;
}
function clearListProfiles(state) {
  state.entities.listProfiles.byId = {};
  state.entities.listProfiles.allIds = [];
  state.numInList = 1;
  return state;
}
function clearUnlockedProfilesNotInList(state) {
  state.entities.unlockedProfilesNotInList.byId = {};
  state.entities.unlockedProfilesNotInList.allIds = [];
  state.numUnlockedNotInList = 1;
  return state;
}
function clearProfileLists(state) {
  state.entities.profileLists.byId = {};
  state.entities.profileLists.allIds = [];
  return state;
}

export const initialState = {
  // entities holds all normalized data.
  // Initialized to be empty, but we comment the structure for documentation purposes.
  entities: {
    searchedProfiles: {
      byId: {
        // "profile1OpenSearchId" : {
        //     id : "profile1",
        //     firstName: "user name",
        //     lastInitial: "D",
        //     company: "company",
        // }
      },
      allIds: [
        // "profile1OpenSearchId"
      ],
    },
    unlockedProfiles: {
      byId: {
        // "profile1Id" : {
        //     id : "profile1",
        //     firstName: "user name",
        //     lastName: "D",
        //     company: "company",
        // }
      },
      allIds: [
        // "profile1Id"
      ],
    },
    listProfiles: {
      byId: {
        // "profile1Id" : {
        //     id : "profile1",
        //     firstName: "user name",
        //     lastName: "D",
        //     company: "company",
        // }
      },
      allIds: [
        // "profile1Id"
      ],
    },
    unlockedProfilesNotInList: {
      byId: {
        // "profile1Id" : {
        //     id : "profile1",
        //     firstName: "user name",
        //     lastName: "D",
        //     company: "company",
        // }
      },
      allIds: [
        // "profile1Id"
      ],
    },
    profileLists: {
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
  cappedNumSearchResults: 1,
  numUnlockedNotInList: 1,
  numUnlocked: 1,
  numInList: 1,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [viewUnlockedProfiles.fulfilled]: (state, action) => {
      console.log(action);
      var profiles = action.payload["profiles"];
      console.log(profiles);
      state = clearUnlockedProfiles(state);
      profiles.forEach((profile) => {
        var id = profile["id"];
        state.entities.unlockedProfiles.allIds.push(id);
        state.entities.unlockedProfiles.byId[id] = profile;
      });
      state.numUnlocked = action.payload["numUnlocked"];
    },
    [viewListProfiles.fulfilled]: (state, action) => {
      var profiles = action.payload["profiles"];
      state = clearListProfiles(state);
      profiles.forEach((profile) => {
        var id = profile["id"];
        state.entities.listProfiles.allIds.push(id);
        state.entities.listProfiles.byId[id] = profile;
      });
      state.numInList = action.payload["numInList"];
    },
    [viewUnlockedProfilesNotInList.fulfilled]: (state, action) => {
      var profiles = action.payload["profiles"];
      state = clearUnlockedProfilesNotInList(state);
      profiles.forEach((profile) => {
        var id = profile["id"];
        state.entities.unlockedProfilesNotInList.allIds.push(id);
        state.entities.unlockedProfilesNotInList.byId[id] = profile;
      });
      state.numUnlockedNotInList = action.payload["numUnlockedNotInList"];
    },
    [removeProfilesFromProfileList.fulfilled]: (state, action) => {
      var idsToRemove = action.payload;
      idsToRemove.forEach((id) => {
        const index = state.entities.listProfiles.allIds.indexOf(id);
        if (index !== -1) {
          state.entities.listProfiles.allIds.splice(index, 1);
          delete state.entities.listProfiles.byId[id];
        }
      });
    },
    [addProfilesToProfileList.fulfilled]: (state, action) => {
      // Do nothing?
      // var profiles = action.payload["profiles"];
      // profiles.forEach(profile => {
      //     var id = profile["id"];
      //     state.entities.profileLists.allIds.push(id);
      //     state.entities.profileLists.byId[id] = profile;
      // });
    },
    [viewProfileLists.fulfilled]: (state, action) => {
      var lists = action.payload["lists"];
      state = clearProfileLists(state);
      lists.forEach((list) => {
        var id = list["id"];
        state.entities.profileLists.allIds.push(id);
        state.entities.profileLists.byId[id] = list;
      });
      state.numUnlocked = action.payload["numUnlocked"];
    },
    [addProfileList.fulfilled]: (state, action) => {
      var id = action.payload["id"];
      state.entities.profileLists.allIds.push(id);
      state.entities.profileLists.byId[id] = action.payload;
    },
    [editProfileList.fulfilled]: (state, action) => {
      const updatedList = action.payload;
      state.entities.profileLists.byId[updatedList.id] = updatedList;
    },
    [deleteProfileList.fulfilled]: (state, action) => {
      var id = action.payload;
      const index = state.entities.profileLists.allIds.indexOf(id);
      if (index !== -1) {
        state.entities.profileLists.allIds.splice(index, 1);
        delete state.entities.profileLists.byId[id];
      }
    },
    [search.fulfilled]: (state, action) => {
      // var profiles = action.payload["profiles"];
      // state = clearSearchedProfiles(state);
      // profiles.forEach((profile) => {
      //   var id = profile["open_search_id"];
      //   state.entities.searchedProfiles.allIds.push(id);
      //   state.entities.searchedProfiles.byId[id] = profile;
      // });
      state.cappedNumSearchResults = action.payload["cappedNumResults"];
    },
    [unlock.fulfilled]: (state, action) => {
      // var id = action.payload["id"];
      // state.entities.unlockedProfiles.allIds.push(id);
      // state.entities.unlockedProfiles.byId[id] = action.payload;
    },
  },
});
