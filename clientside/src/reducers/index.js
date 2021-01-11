import {combineReducers} from 'redux';

import posts from './posts';
import tasks from './tasks';

export const reducers = combineReducers({posts,tasks});