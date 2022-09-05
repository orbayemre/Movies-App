import {configureStore} from '@reduxjs/toolkit';

import homeSearchFilterReducer from "./searchFilter";
import authReducer from "./auth";

export default configureStore({
    reducer: {
        search : homeSearchFilterReducer,
        auth : authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
