import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import chart from './chart';

const rootReducer = combineReducers({
  counter,
  chart,
  routing
});

export default rootReducer;
