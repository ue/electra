import { combineReducers } from 'redux';
import accountItems from './accountItems.js';

const rootReducer = combineReducers({
	accountItems: accountItems
});

export default rootReducer;
