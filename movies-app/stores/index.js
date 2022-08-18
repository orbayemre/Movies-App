import { configureStore } from '@reduxjs/toolkit'
import homeSearchFilterReducer from "./searchFilter";
export default configureStore({
    reducer: {
        search : homeSearchFilterReducer,
    },
})
