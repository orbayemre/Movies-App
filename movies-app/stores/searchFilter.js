import {createSlice} from "@reduxjs/toolkit";

export const searchFilter = createSlice({
    name:'searchFilter',
    initialState:{
        query:"",
        genre:"all",
        results:[]
    },
    reducers:{
        setQuery : (state,action) =>{
            state.query = action.payload;
        }
    },
})

export const {setQuery,setGenre} = searchFilter.actions;

export default searchFilter.reducer;
