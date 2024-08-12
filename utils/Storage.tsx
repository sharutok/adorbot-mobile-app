import { MMKV } from 'react-native-mmkv'

export const Storage = new MMKV({
    id: '',
    encryptionKey: EXPO_PUBLIC_MMKV_ENCRYPTION_KEY
})