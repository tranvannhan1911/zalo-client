import { createSlice, configureStore } from '@reduxjs/toolkit'
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";


const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser: (state, value) => {
      state.info = value.payload
    },
    getUser: state => state
  }
})

const rootReducer = combineReducers({
  user: userSlice.reducer
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer
})

export default store;
export const { setUser, getUser } = userSlice.actions
