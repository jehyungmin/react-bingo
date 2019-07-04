import { createAction, handleActions } from 'redux-actions';

// action types
const START_GAME = "START_GAME";
const RESTART_GAME = "RESTART_GAME";
const CLICK_NUMBER = "CLICK_NUMBER";
const P1_ROAD = "P1_ROAD";
const P2_ROAD = "P2_ROAD";
const NOW_TURN = "NOW_TURN";

// action creators
export const startGame = createAction(START_GAME);
export const restartGame = createAction(RESTART_GAME);
export const clickNumber = createAction(CLICK_NUMBER, num => num);
export const P1_road = createAction(P1_ROAD, num => num);
export const P2_road = createAction(P2_ROAD, num => num);
export const nowTurn = createAction(NOW_TURN, who => who);

//Reducer
const initialState = {
    isPlaying: false,
    isRePlaying: false,
    isSelected: [],
    p1_roaded: [],
    p2_roaded: [],
    isTurn: 'p1'
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case START_GAME:
            return applyStartGame(state)
        case RESTART_GAME:
            return applyRestartGame(state);
        case CLICK_NUMBER:
            return applySelectNumber(state, action.payload);
        case P1_ROAD:
            return applyRoadNumber1P(state, action.payload);
        case P2_ROAD:
            return applyRoadNumber2P(state, action.payload);
        case NOW_TURN:
            return applyNowTurn(state, action.payload)
        default:
            return state
    }
}

//Reducer Function
function applyStartGame(state) {
    return {
        ...state,
        isPlaying: true
    }
}
function applyRestartGame(state) {
    return {
        ...state,
        isRePlaying: true,
        isSelected: [],
        isTurn: 'p1'
    }
}

function applySelectNumber(state, num) {
    return {
        ...state,
        isSelected: [...state.isSelected, num]
    }
}

function applyRoadNumber1P(state, num) {
    return {
        ...state,
        p1_roaded: num
    }
}

function applyRoadNumber2P(state, num) {
    return {
        ...state,
        p2_roaded: num
    }
}

function applyNowTurn(state, who) {
    return {
        ...state,
        isTurn: who
    }
}

const actionCreators = {
    startGame,
    restartGame,
    clickNumber,
    P1_road,
    P2_road,
    nowTurn
}

export { actionCreators };
export default reducer;