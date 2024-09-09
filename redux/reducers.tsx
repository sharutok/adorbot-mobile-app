// redux/reducers.js
import { SET_INPUT_MESSAGE_TEXT, SET_CHAT_LIST } from './constants';

const initialState = {
    inputMessageText: '',
    chatList: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INPUT_MESSAGE_TEXT:
            return { ...state, inputMessageText: action.payload };
        case SET_CHAT_LIST:
            return { ...state, chatList: action.payload };
        default:
            return state;
    }
};

export default rootReducer;
