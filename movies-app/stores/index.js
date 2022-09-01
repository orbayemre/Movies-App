import { configureStore } from '@reduxjs/toolkit'
import homeSearchFilterReducer from "./searchFilter";
import authReducer from "./auth";

export default configureStore({
    reducer: {
        search : homeSearchFilterReducer,
        auth : authReducer
    },
})
