import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.jsx';

const store = configureStore({
  name: "netflix",
  reducer: {
    app: userReducer,
  }
});

export default store;