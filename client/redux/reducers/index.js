import { combineReducers } from 'redux';
import teams from './teams';
import matches from './matches';

const rootReducer = combineReducers({
  teams,
  matches
});

export default rootReducer;
