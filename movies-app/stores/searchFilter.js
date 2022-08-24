import {createSlice} from "@reduxjs/toolkit";

export const searchFilter = createSlice({
    name:'searchFilter',
    initialState:{
        query:"",
        genre:"all",
    },
    reducers:{
        setQuery : (state,action) =>{
            state.query = action.payload;
        },
        setGenre : (state,action) =>{
            state.genre = action.payload;
        }
    },
})

export const {setQuery,setGenre} = searchFilter.actions;

export default searchFilter.reducer;
