import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import locationReducer from './location_reducer';
import viewportReducer from './viewport_reducer';


const rootReducer = combineReducers({
  form,
  location: locationReducer,
  viewport: viewportReducer
});

export default rootReducer;
