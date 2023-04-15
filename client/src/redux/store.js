import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);
export default persistor;
