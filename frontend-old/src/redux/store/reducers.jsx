import { createSlice, combineReducers } from '@reduxjs/toolkit';
import cardModalReducer from '../reducers/cardModalReducer';

const rootReducer = combineReducers({
  cardModal: cardModalReducer,
});

export default rootReducer;