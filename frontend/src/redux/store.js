import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const authPersistConfig = {
  key: "user",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: [FLUSH, REHYDRATE, PERSIST, PAUSE, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
