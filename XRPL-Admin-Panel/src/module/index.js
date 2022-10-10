import { combineReducers } from 'redux';

import User from './store/User';
import Blog from './store/blog';
import Payment from './store/payment';
import Nft from './store/nfts';

export default combineReducers({
  User,
  Blog,
  Payment,
  Nft,
});
