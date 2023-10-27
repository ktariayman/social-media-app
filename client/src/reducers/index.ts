import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'reduxjs-toolkit-persist';

import storage from 'reduxjs-toolkit-persist/lib/storage';
import ReduxLogger from 'redux-logger';

import postReducer from './postReducer';
import userReducer from './userReducer';
import profileReducer from './profileReducer';
import { friendsReducer } from './friendsReducer';
import { themeReducer } from './themeReducer';
const persistConfig = {
  key: 'root',
  storage: storage
};

const rootReducer = combineReducers({
  user: userReducer,
  posts: postReducer,
  profile: profileReducer,
  friendsPage: friendsReducer,
  darkTheme: themeReducer
});
const _persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(ReduxLogger)
});
const persistor = persistStore(store);
export { store, persistor };
