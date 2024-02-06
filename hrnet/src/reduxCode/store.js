import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage/session';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import dataReducer from './dataSlice';

const persistConfig = {
  key: 'root',
  storage, 
};

const rootReducer = combineReducers({
  data: dataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({serializableCheck: {
    ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
  },
}),
});

export const persistor = persistStore(store);
