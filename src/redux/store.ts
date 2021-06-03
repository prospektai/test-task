import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storeReducer from "./storeSlice";

export default configureStore({
    reducer: storeReducer as any,
    devTools: true,
    // Bad practice, app should use plain objects/arrays
    middleware: getDefaultMiddleware({ serializableCheck: false }),
});