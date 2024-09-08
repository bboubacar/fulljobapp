import { configureStore } from '@reduxjs/toolkit';

import confirmReducer from './confirmSlice';
import sousMenuReducer from './sousMenuSlice';

const store = configureStore({
  reducer: {
    confirm: confirmReducer,
    sousMenu: sousMenuReducer
  },
  middleware:  (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;