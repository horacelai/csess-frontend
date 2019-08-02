import { GAME_RETURN_SCORE, GAME_RETURN_SCORES, GAME_RETURN_TASK, GAME_GET_TASK, GAME_GET_SCORES, GAME_RECIEVE_MESSAGE} from '../actions/game';

export default function(state = {score: '0', task: {}, scores: [], loading: true, message: ""}, action) {
    switch(action.type){
        case GAME_GET_TASK:
        case GAME_GET_SCORES:
            return {
                ...state,
                loading: true
            };
        case GAME_RETURN_SCORE:
            return {
                ...state,
                score: action.payload.score
            };
        case GAME_RETURN_TASK:
            return {
                ...state,
                task: action.payload.task,
                loading: false,
                message: ""
            }
        case GAME_RETURN_SCORES:
            return {
                ...state,
                scores: action.payload.scores,
                loading: false
            }
        case GAME_RECIEVE_MESSAGE:
            return {
                ...state,
                message: action.payload.message
            }
        default:
            break;
    }
    return state;
}
