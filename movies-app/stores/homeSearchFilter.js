import {createSlice} from "@reduxjs/toolkit";

export const homeSearchFilter = createSlice({
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

export const {setQuery,setGenre} = homeSearchFilter.actions;

export default homeSearchFilter.reducer;
