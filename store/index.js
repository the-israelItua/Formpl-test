import { configureStore } from "@reduxjs/toolkit";
import localforage from "localforage";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import templateSliceReducer from "./templateSlice";

const reducers = combineReducers({
  templates: templateSliceReducer,
});

const persistConfig = {
  key: "root",
  storage: localforage,
  whitelist: ["templates"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

let persistor = persistStore(store);

export { store, persistor };
