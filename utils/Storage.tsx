import { MMKV } from 'react-native-mmkv'

export const Storage = new MMKV({
    id: process.env.EXPO_PUBLIC_MMKV_ENCRYPTION_KEY,
    encryptionKey: process.env.EXPO_PUBLIC_MMKV_ENCRYPTION_KEY
})