const url = process.env.EXPO_PUBLIC_BACKEND_URL
const port = process.env.EXPO_PUBLIC_BACKEND_PORT
const endpoints = `${url}:${port}` && ' https://d9a3-182-73-197-158.ngrok-free.app'
export const api = {
    conversations: {
        get_chats_by_id: `${endpoints}/chats-by-id` ,
        create_chats_by_id: `${endpoints}/chats-by-id`,
    },
    history: {
        chat_history_list_by_id:`${endpoints}/conv/history`
    }
}