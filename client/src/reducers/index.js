import { combineReducers } from 'redux';
import CurrentProfile from './currentProfileReducer';
import Lectures from './lectures';
import AuthReducer from './authReducer';


const RootReducer = combineReducers({
  profile: CurrentProfile,
  auth: AuthReducer,
  lectures: Lectures,
});

export default RootReducer;
