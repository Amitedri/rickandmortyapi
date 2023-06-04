import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    chracterslist: {
      info: {},
      results: [],
    },
    currentIndex: { value: 1, url: "https://rickandmortyapi.com/api/character/?page=1" },
    statusFilter: "",
    genderFilter: "",
    speciesFilter: "",
    termFilter: "",
    currentChar: {},
    view: "table",
  },
  reducers: {
    setCharactersList: (state, action) => {
      state.chracterslist = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    setGenderFilter: (state, action) => {
      state.genderFilter = action.payload;
    },
    setTermFilter: (state, action) => {
      state.termFilter = action.payload;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    setCurrentChar: (state, action) => {
      state.currentChar = action.payload;
    },
    setSpeciesFilter: (state, action) => {
      state.speciesFilter = action.payload;
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    clearFilters: (state, action) => {
      state.termFilter = "";
      state.statusFilter = "";
      state.genderFilter = "";
      state.speciesFilter = "";
      state.view = "table"
    },
  },
});

// this is for dispatch
export const {
  setCharactersList,
  setCurrentIndex,
  setGenderFilter,
  setStatusFilter,
  setTermFilter,
  setCurrentChar,
  setSpeciesFilter,
  setView,
  clearFilters
} = userSlice.actions;

// this is for configureStore
export default userSlice.reducer;
