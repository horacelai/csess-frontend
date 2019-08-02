import {GAME_LOGIN_SUCCESS, GAME_LOGIN_FAIL, GAME_LOGOUT_SUCCESS, GAME_CLEAR_ERROR, GAME_LOGIN_PENDING, GAME_CLEAR_PENDING} from '../actions/login';

export default function(state = { isLogined: false, role: 'none', sessionId: '', error: '', pending: false, pendingDetails: {} }, action) {
    switch(action.type){
        case GAME_LOGIN_SUCCESS:
            return {
                ...state,
                isLogined: true,
                role: action.payload.role,
                sessionId: action.payload.sessionId,
                pending: false,
                pendingDetails: {}
            }
        case GAME_LOGIN_FAIL:
            return {
                ...state,
                isLogined: false,
                role: 'none',
                sessionId: '',
                error: action.payload.error
            }
        case GAME_LOGOUT_SUCCESS:
            return {
                ...state,
                isLogined: false,
                role: 'none',
                sessionId: ''
            }
        case GAME_CLEAR_ERROR:
            return {
                ...state,
                error: ''
            }
        case GAME_LOGIN_PENDING:
            return {
                ...state,
                pending: true,
                pendingDetails: action.payload
            }
        case GAME_CLEAR_PENDING:
            return {
                ...state,
                pending: false,
                pendingDetails: {}
            }
        default:
            break;
    }
    return state;
}
