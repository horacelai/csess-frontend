import { combineReducers } from 'redux';

import login from './login';
import game from './game';
import admin from './admin';

const rootReducer = combineReducers({
    login: login,
    game: game,
    admin: admin
});

export default rootReducer;
