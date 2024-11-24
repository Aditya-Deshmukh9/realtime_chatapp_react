import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import socketSlice from "./socketSlice.js";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const authPersistConfig = {
  key: "user",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, userSlice);

export const store = configureStore({
  reducer: {
    socket: socketSlice,
    user: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
