import {combineReducers} from 'redux';
import {data} from './data/data';
import {main} from './main/main';
import {user} from './user/user';

export const NameSpace = {
  DATA: `DATA`,
  MAIN: `MAIN`,
  USER: `USER`,
};

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.MAIN]: main,
  [NameSpace.USER]: user,
});
