export const ADMIN_RETURN_TEAMS = 'ADMIN_RETURN_TEAMS';
export const ADMIN_RETURN_TEAM_LIST = 'ADMIN_RETURN_TEAM_LIST';
export const ADMIN_TEAM_NEW = 'ADMIN_TEAM_NEW';
export const ADMIN_TEAM_REMOVED = 'ADMIN_TEAM_REMOVED';
export const ADMIN_CHANGE_SCORE = 'ADMIN_CHANGE_SCORE';
export const ADMIN_RETURN_PLAYERS = 'ADMIN_RETURN_PLAYERS';
export const ADMIN_PLAYER_NEW = 'ADMIN_PLAYER_NEW';
export const ADMIN_PLAYER_REMOVED = 'ADMIN_PLAYER_REMOVED';
export const ADMIN_RETURN_TASKS = 'ADMIN_RETURN_TASKS';
export const ADMIN_RETURN_STAGES = 'ADMIN_RETURN_STAGES';
export const ADMIN_UPDATE_TASK = 'ADMIN_UPDATE_TASK';
export const ADMIN_RETURN_AUTH_MODE = 'ADMIN_RETURN_AUTH_MODE';
export const ADMIN_RETURN_ADD_WISHLIST = 'ADMIN_RETURN_ADD_WISHLIST';
export const ADMIN_LOGIN_RETURN_PLAYER = 'ADMIN_LOGIN_RETURN_PLAYER';
export const ADMIN_RETURN_QR = 'ADMIN_RETURN_QR';

export const ADMIN_ADD_TEAM = 'IO:ADMIN_ADD_TEAM';
export const ADMIN_GET_TEAMS = 'IO:ADMIN_GET_TEAMS';
export const ADMIN_GET_TEAM_LIST = 'IO:ADMIN_GET_TEAM_LIST';
export const ADMIN_REMOVE_TEAM = 'IO:ADMIN_REMOVE_TEAM';
export const ADMIN_CONFIRM_SCORE_CHANGE = 'IO:ADMIN_CONFIRM_SCORE_CHANGE';
export const ADMIN_GET_PLAYERS = 'IO:ADMIN_GET_PLAYERS';
export const ADMIN_ADD_PLAYER = 'IO:ADMIN_ADD_PLAYER';
export const ADMIN_REMOVE_PLAYER = 'IO:ADMIN_REMOVE_PLAYER';
export const ADMIN_GET_TASKS = 'IO:ADMIN_GET_TASKS';
export const ADMIN_GET_STAGES = 'IO:ADMIN_GET_STAGES';
export const ADMIN_UPDATE_STAGES = 'IO:ADMIN_UPDATE_STAGES';
export const ADMIN_SET_TASK = 'IO:ADMIN_SET_TASK';
export const ADMIN_SKIP_TASK = 'IO:ADMIN_SKIP_TASK';
export const ADMIN_FINISH_TASK = 'IO:ADMIN_FINISH_TASK';
export const ADMIN_GET_AUTH_MODE = 'IO:ADMIN_GET_AUTH_MODE';
export const ADMIN_SET_AUTH_MODE = 'IO:ADMIN_SET_AUTH_MODE';
export const ADMIN_ADD_WISHLIST = 'IO:ADMIN_ADD_WISHLIST';
export const ADMIN_ACCEPT_LOGIN = 'IO:ADMIN_ACCEPT_LOGIN';
export const ADMIN_ADD_QR = 'IO:ADMIN_ADD_QR';
export const ADMIN_GET_QR = 'IO:ADMIN_GET_QR';

export function getTeams(){
    return { type: ADMIN_GET_TEAMS };
}

export function addTeam(id, data){
    return { type: ADMIN_ADD_TEAM, payload: {id: id, teamData: data} };
}

export function removeTeam(id){
    return { type: ADMIN_REMOVE_TEAM, payload: {id: id} };
}

export function changeScore(id, score){
    return { type: ADMIN_CHANGE_SCORE, payload: {id: id, score: score} };
}

export function confirmScoreChange(id, score){
    return { type: ADMIN_CONFIRM_SCORE_CHANGE, payload: {id: id, score: score} };
}

export function getTeamList(){
    return { type: ADMIN_GET_TEAM_LIST };
}

export function getPlayerFromTeam(teamId){
    return { type: ADMIN_GET_PLAYERS, payload: {id: teamId} };
}

export function addPlayer(id, data){
    return { type: ADMIN_ADD_PLAYER, payload: {id: id, data: data} };
}

export function removePlayer(id, data){
    return { type: ADMIN_REMOVE_PLAYER, payload: {id: id, data: data} };
}

export function getTasks(){
    return { type: ADMIN_GET_TASKS };
}

export function getStages(){
    return { type: ADMIN_GET_STAGES };
}

export function updateStage(stage){
    return { type: ADMIN_UPDATE_STAGES, payload: stage };
}

export function setTask(teamId, taskId){
    return { type: ADMIN_SET_TASK, payload: { teamId: teamId, taskId: taskId } };
}

export function skipTask(teamId){
    return { type: ADMIN_SKIP_TASK, payload: { teamId: teamId } };
}

export function finishTask(teamId){
    return { type: ADMIN_FINISH_TASK, payload: { teamId: teamId } };
}

export function getAuthMode(){
    return { type: ADMIN_GET_AUTH_MODE };
}

export function setAuthMode(mode){
    return { type: ADMIN_SET_AUTH_MODE, payload: mode };
}

export function addWishlist(playerid){
    return { type: ADMIN_ADD_WISHLIST, payload: {playerid: playerid}}
}

export function acceptLogin(pendingId){
    return { type: ADMIN_ACCEPT_LOGIN, payload: { pendingId: pendingId }}
}

export function addQR(score){
    return { type: ADMIN_ADD_QR, payload: { score: score }}
}

export function getQR(){
    return { type: ADMIN_GET_QR }
}
