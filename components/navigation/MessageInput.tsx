import { Colors } from '@/constants/Colors'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import axios from 'axios'
import { BlurView } from 'expo-blur'
import { useLocalSearchParams } from 'expo-router'
import React, { useContext, useState } from 'react'
import { Keyboard, Platform, StyleSheet, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LoadingText from './LoadingText'
import { router } from 'expo-router'
import { setInputMessageText } from '@/redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '@/constants/Api'
import { useMMKVString } from 'react-native-mmkv'
import { Storage } from '@/utils/Storage'


const ATouchableOpacity=Animated.createAnimatedComponent(TouchableOpacity)

const MessageInput = ({ reloadData, chatList }) => {
  const { bottom } = useSafeAreaInsets()
  const expanded = useSharedValue(0)
  const inputMessageText = useSelector((state: any) => state.inputMessageText);
  const dispatch = useDispatch()
  
  const [instanceId, setInstanceId] = useMMKVString('instance_id', Storage)
  const [userId, setUserId] = useMMKVString('user_id', Storage)
  
  const searchParam = useLocalSearchParams()
  const [retriving, setRetriving] = useState(false)
  

  function handleMessageInput(text:string) {
    dispatch(setInputMessageText(text));
  }
  
  function clearValues() {
    console.log("called cleared value");
    dispatch(setInputMessageText(""))
  }

  async function sendResponse(question: String) {
    console.log("called me??"); 
    
    if (question) {
    try {    
      Keyboard.dismiss()
      setRetriving(true)
      
      if (!userId) {
        console.log("no instanceId or userId");
        return 
      }
      const resposne = await axios.post(`${api.conversations.generate_responses}/${userId}`, {
        questions: question,
        instance_id: searchParam?.id || ""
      })
      if (resposne?.data?.status === 200) {
        setRetriving(false)
        setInstanceId(resposne?.data?.response?.instance_id)
        router.navigate(`/(drawer)/${resposne?.data?.response?.instance_id}`)
        clearValues()
        chatList.length >=1 && await reloadData()
      }
    } catch (error) {
      console.log("error in sending response",error);
    }
  }
  }

  return (
    <BlurView intensity={100} tint='extraLight' style={{ paddingBottom: bottom, paddingTop: 0 }}>
      <View style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:20,
        marginHorizontal: 10,

        marginBottom:Platform.OS==="android" ?20:0
}}>
        <View style={{
          alignItems: 'center',
          borderColor: Colors.DARK_GREY,
          borderRadius: 40,
          borderWidth: 0.5,
          flex:1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          paddingHorizontal: 10,
          alignContent:'center',alignSelf:'center',
          paddingLeft: 20,
          paddingVertical: 4,
        }}>
          <TextInput value={inputMessageText} onChangeText={handleMessageInput}
            style={{
            marginBottom: 2, alignContent: 'center',
            alignSelf: 'center', flex: 1, fontSize: 16, marginTop: 4
          }}
            multiline autoCapitalize='none'
            placeholder='Message AdorBot....' />
          {inputMessageText && <ATouchableOpacity onPress={() => clearValues()}>
            <MaterialCommunityIcons  name='close-circle-outline' size={22} color={Colors.DARK_GREY} />
          </ATouchableOpacity>}
        </View>
        {!retriving?<ATouchableOpacity disabled={!inputMessageText ? true:false} onPress={() => sendResponse(inputMessageText)} style={{ ...styles.sendBtn }}>
          <Feather name='arrow-up' size={24} color={Colors.DARK_GREY} />
        </ATouchableOpacity> : <LoadingText />}
       
            </View>
    </BlurView>
  )
}



const styles = StyleSheet.create({
  textField: {
    color:Colors.DARK_GREY
  },
  row: {
   flexDirection:'row'
  },
  inputField: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
    flex:1,
    padding: 10,
    borderWidth:1,
    borderColor: Colors.MEDIUM_GREY,
    flexDirection: 'row', alignItems: 'center',
    gap: 5
  },
  sendBtn: {
    backgroundColor: Colors.ACCENT_COLOR,
    width: 50,
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    
  }
});


export default MessageInput