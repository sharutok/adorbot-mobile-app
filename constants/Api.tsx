const dev_url = process.env.EXPO_PUBLIC_DEV_BACKEND_URL
const dev_port = process.env.EXPO_PUBLIC_DEV_BACKEND_PORT

const test_url = process.env.EXPO_PUBLIC_TEST_BACKEND_URL

const dev_endpoints = `${dev_url}:${dev_port}`
const test_endpoints = `${test_url}`


export const api = {
    conversations: {
        get_chats_by_id: `${test_endpoints}/conv/chats-by-id` ,
        create_chats_by_id: `${test_endpoints}/conv/chats-by-id`,
        generate_responses: `${test_endpoints}/conv/generate-response`
    },
    history: {
        chat_history_list_by_id:`${test_endpoints}/conv/history`
    }
}