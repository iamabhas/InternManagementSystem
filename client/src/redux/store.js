import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import batchSelectReducer from "./batchSelectSlice.js";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";


const reducers = combineReducers({
  auth: authReducer,
  batchSelect:batchSelectReducer

});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
