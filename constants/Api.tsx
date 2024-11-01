const dev_url = process.env.EXPO_PUBLIC_DEV_BACKEND_URL
const dev_port = process.env.EXPO_PUBLIC_DEV_BACKEND_PORT


const dev_endpoints = `${dev_url}:${dev_port}`



export const api = {
    conversations: {
        get_chats_by_id: `${dev_endpoints}/conv/chats-by-id` ,
        create_chats_by_id: `${dev_endpoints}/conv/chats-by-id`,
        generate_responses: `${dev_endpoints}/conv/generate-response`,
        user_validation: `${dev_endpoints}/conv/validate/login/user`
    },
    history: {
        chat_history_list_by_id:`${dev_endpoints}/conv/history`
    }
}   