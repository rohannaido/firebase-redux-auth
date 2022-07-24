import { configureStore, createSlice } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };

const initialState = {};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
        console.log("SAVE USER ", action.payload);
        state.value = action.payload;
    },
    signOutUser: (state) => {
        console.log("SIGN OUT REDUCER ");
        state.value = {};
    }
  },
});

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

export const { saveUser, signOutUser } = authSlice.actions;
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

export let persistor = persistStore(store);