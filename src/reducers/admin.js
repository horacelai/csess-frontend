import {ADMIN_GET_TEAMS,
        ADMIN_RETURN_TEAMS,
        ADMIN_TEAM_NEW,
        ADMIN_TEAM_REMOVED,
        ADMIN_CHANGE_SCORE,
        ADMIN_RETURN_TEAM_LIST,
        ADMIN_RETURN_PLAYERS,
        ADMIN_GET_PLAYERS,
        ADMIN_PLAYER_NEW,
        ADMIN_PLAYER_REMOVED,
        ADMIN_GET_TASKS,
        ADMIN_RETURN_TASKS,
        ADMIN_RETURN_STAGES,
        ADMIN_UPDATE_TASK,
        ADMIN_RETURN_AUTH_MODE,
        ADMIN_LOGIN_RETURN_PLAYER,
        ADMIN_GET_QR,
        ADMIN_RETURN_QR
     } from '../actions/admin';

export default function(state = {isLoading: false, teams: {}, players: {}, teamList: [], currentStage: "NONE", stages: {}, tasksList: [], authMode: 'OFF', loginPlayer: {username: '', team: '', role: ''}, qr: []}, action) {
    switch(action.type){
        case ADMIN_RETURN_TEAMS:
            return {
                ...state,
                teams: {
                    ...action.data,
                },
                isLoading: false};
        case ADMIN_GET_TEAMS:
            return {
                ...state,
                isLoading: true
            };
        case ADMIN_TEAM_NEW:
            return {
                ...state,
                teams:{
                    ...state.teams,
                    ...action.data
                }
            };
        case ADMIN_TEAM_REMOVED:
            const { [action.id]: teamValue, ...newTeamState } = state.teams;
            return {
                ...state,
                teams: newTeamState
            };
        case ADMIN_CHANGE_SCORE:
        let t = {...state.teams};
        t[action.payload.id].score = action.payload.score;
        return {
            ...state,
            teams: t
        };
        case ADMIN_RETURN_TEAM_LIST:
            return {
                ...state,
                teamList: action.payload
            };
        case ADMIN_GET_PLAYERS:
            return {
                ...state,
                isLoading: true
            };
        case ADMIN_RETURN_PLAYERS:
            return {
                ...state,
                players: action.payload,
                isLoading: false
            };
        case ADMIN_PLAYER_NEW:
            return {
                ...state,
                players: {
                    ...state.players,
                    ...action.payload
                }
            };
        case ADMIN_PLAYER_REMOVED:
            const { [action.id]: playerValue, ...newPlayerState } = state.players;
            return {
                ...state,
                players: newPlayerState
            };
        case ADMIN_RETURN_TASKS:
            return {
                ...state,
                tasks: action.payload.tasks,
                currentStage: (action.payload.currentStage || state.currentStage),
                tasksList: action.payload.tasksList,
                isLoading: false
            };
        case ADMIN_GET_TASKS:
            return {
                ...state,
                isLoading: true
            };
        case ADMIN_RETURN_STAGES:
            return {
                ...state,
                currentStage: action.payload.currentStage,
                stages: action.payload.stages
            };
        case ADMIN_UPDATE_TASK:
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.payload.teamId]: action.payload.task
                }
            };
        case ADMIN_RETURN_AUTH_MODE:
        return {
            ...state,
            authMode: action.payload
        };
        case ADMIN_LOGIN_RETURN_PLAYER:
        return {
            ...state,
            loginPlayer: action.payload
        };
        case ADMIN_GET_QR:
        return {
            ...state,
            loading: true
        };
        case ADMIN_RETURN_QR:
        return {
            ...state,
            qr: action.payload.qr,
            isLoading: false
        };
        default:
            break;
    }
    return state;
}
