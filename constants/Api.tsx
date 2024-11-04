const dev_url = process.env.EXPO_PUBLIC_DEV_BACKEND_URL
const dev_port = process.env.EXPO_PUBLIC_DEV_BACKEND_PORT
const prod_port = process.env.EXPO_PUBLIC_DEV_BACKEND_URL


const dev_endpoints = `${dev_url}:${dev_port}`
const prod_endpoints = `${prod_port}`

const endpoints=dev_endpoints


export const api = {
    conversations: {
        get_chats_by_id: `${endpoints}/conv/chats-by-id` ,
        create_chats_by_id: `${endpoints}/conv/chats-by-id`,
        generate_responses: `${endpoints}/conv/generate-response`,
        user_validation: `${endpoints}/conv/validate/login/user`
    },
    history: {
        chat_history_list_by_id:`${endpoints}/conv/history`
    }
}   