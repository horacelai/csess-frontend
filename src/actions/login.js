export const GAME_LOGIN = 'IO:GAME_LOGIN';
export const GAME_LOGOUT = 'IO:GAME_LOGOUT';
export const GAME_UPDATE_SCOKET = 'IO:GAME_UPDATE_SCOKET';

export const GAME_LOGIN_SUCCESS = 'GAME_LOGIN_SUCCESS';
export const GAME_LOGIN_FAIL = 'GAME_LOGIN_FAIL';
export const GAME_LOGIN_PENDING = 'GAME_LOGIN_PENDING';
export const GAME_LOGOUT_SUCCESS = 'GAME_LOGOUT_SUCCESS';
export const GAME_CLEAR_ERROR = 'GAME_CLEAR_ERROR';
export const GAME_CLEAR_PENDING = 'GAME_CLEAR_PENDING';

export function gameLogin(username){
    return {type: GAME_LOGIN, payload: {username: username}};
}

export function gameLogout(sessionId){
    return {type: GAME_LOGOUT, payload: {sessionId: sessionId}};
}

export function clearError(){
    return {type: GAME_CLEAR_ERROR};
}

export function clearPending(){
    return {type: GAME_CLEAR_PENDING};
}

export function updateSocket(pendingId){
    return {type: GAME_UPDATE_SCOKET, payload: {pendingId: pendingId}};
}
