export const GAME_GET_SCORE = 'IO:GAME_GET_SCORE';
export const GAME_GET_SCORES = 'IO:GAME_GET_SCORES';
export const GAME_GET_TASK = 'IO:GAME_GET_TASK';
export const GAME_FINISH_TASK = 'IO:GAME_FINISH_TASK';
export const LEADER_FINISH_TASK = 'IO:LEADER_FINISH_TASK';

export const GAME_RETURN_SCORE = 'GAME_RETURN_SCORE';
export const GAME_RETURN_SCORES = 'GAME_RETURN_SCORES';
export const GAME_RETURN_TASK = 'GAME_RETURN_TASK';
export const GAME_RECIEVE_MESSAGE = 'GAME_RECIEVE_MESSAGE';

export function getScore(){
    return { type: GAME_GET_SCORE }
}

export function getScores(){
    return { type: GAME_GET_SCORES }
}

export function getTask(){
    return { type: GAME_GET_TASK }
}

export function finishTask(key){
    return { type: GAME_FINISH_TASK, payload: {key: key} }
}

export function finishGeoTask(longitude, latitude){
    return { type: GAME_FINISH_TASK, payload: {key: {longitude: longitude, latitude: latitude}} }
}

export function leaderFinishTask(){
    return { type: LEADER_FINISH_TASK }
}

export function resetError(){
    return { type: GAME_RECIEVE_MESSAGE, payload: {message: ""}}
}

export function setError(error){
    return { type: GAME_RECIEVE_MESSAGE, payload: {message: error}}
}
