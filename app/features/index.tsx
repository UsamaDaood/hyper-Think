import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistCombineReducers, persistReducer} from 'redux-persist';
//import { user } from './user/userSlice';
import {app} from './app/appSlice';
import {combineReducers} from '@reduxjs/toolkit';
import {user} from './User/usersSlice';
// import {ispaidUser} from './user/userSlice';
// import {toolSlice} from './AI_Tools/toolSlice';

const storeConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Combine all the reducers into one
const rootReducer = combineReducers({
  app,
  user,
});

const persistedReducer = persistReducer(storeConfig, rootReducer);

export default persistedReducer;
