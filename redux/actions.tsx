// redux/actions.js
// export const SET_INPUT_MESSAGE_TEXT = 'SET_INPUT_MESSAGE_TEXT';
import { SET_INPUT_MESSAGE_TEXT, SET_CHAT_LIST } from "./constants";
// export const SET_CHAT_LIST = 'SET_CHAT_LIST';

export const setInputMessageText = (text) => ({
    type: SET_INPUT_MESSAGE_TEXT,
    payload: text,
});

export const setChatList = (chatList) => ({
    type: SET_CHAT_LIST,
    payload: chatList,
});
