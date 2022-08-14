import { configureStore } from '@reduxjs/toolkit'
import homeSearchFilterReducer from "./homeSearchFilter";
export default configureStore({
    reducer: {
        homeSearch : homeSearchFilterReducer,
    },
})
