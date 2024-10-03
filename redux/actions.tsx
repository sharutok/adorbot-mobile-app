import { SET_INPUT_MESSAGE_TEXT, SET_CHAT_LIST } from "./constants";

export const setInputMessageText = (text:String) => ({
    type: SET_INPUT_MESSAGE_TEXT,
    payload: text,
});

export const setChatList = (chatList:[]) => ({
    type: SET_CHAT_LIST,
    payload: chatList,
});
