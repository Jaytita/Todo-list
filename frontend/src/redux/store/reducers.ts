import { combineReducers } from '@reduxjs/toolkit';

import globalReducer from '@redux/reducers/globalReducer';
import cardModalReducer from '../reducers/cardModalReducer';

const rootReducer = combineReducers({
  cardModal: cardModalReducer,
  globalState: globalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;