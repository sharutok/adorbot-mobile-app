import { Colors } from '@/constants/Colors'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import axios from 'axios'
import { BlurView } from 'expo-blur'
import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Keyboard, StyleSheet, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LoadingText from './LoadingText'


const ATouchableOpacity=Animated.createAnimatedComponent(TouchableOpacity)

const MessageInput = ({ reloadData}) => {
  const { bottom } = useSafeAreaInsets()
  const expanded = useSharedValue(0)
  const [inputMessageText, setInputMessageText] = useState("")
  const searchParam = useLocalSearchParams()
  const [retriving,setRetriving]=useState(false)

  function handleMessageInput(text:string) {
    setInputMessageText(text);
  }
  function clearValues() {
    console.log("called cleared value");
    setInputMessageText("")
  }

  async function sendResponse(question: String) {
    console.log("called me??");
    
    if (question) {
    try {    
      Keyboard.dismiss()
      setRetriving(true)
      const resposne = await axios.post(`https://d49d-27-107-7-10.ngrok-free.app/conv/generate-response/20283e81-65be-4106-818f-f015bb67a10f`, {
        questions: question,
        instance_id: searchParam?.id || ""
      })
      if (resposne?.data?.status === 200) {
        setRetriving(false)
        clearValues()
        await reloadData()
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
          paddingLeft: 20,
            paddingVertical: 4,
        }}>
          <TextInput value={inputMessageText} onChangeText={handleMessageInput} style={{marginBottom:5,flex:1}} multiline autoCapitalize='none' placeholder='Message AdorBot....' />
          {inputMessageText && <ATouchableOpacity onPress={() => clearValues()}>
            <MaterialCommunityIcons  name='close-circle-outline' size={22} color={Colors.DARK_GREY} />
          </ATouchableOpacity>}
        </View>
        {!retriving?<ATouchableOpacity disabled={!inputMessageText ? true:false} onPress={() => sendResponse(inputMessageText)} style={{ ...styles.sendBtn }}>
          <Feather name='arrow-up' size={18} color={Colors.DARK_GREY} />
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
    height: 40,
    borderRadius: 20,
    flex:1,
    padding: 10,
    borderWidth:1,
    borderColor: Colors.MEDIUM_GREY,
    flexDirection: 'row', alignItems: 'center', gap: 5
  },
  sendBtn: {
    backgroundColor: Colors.ACCENT_COLOR,
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    
  }
});


export default MessageInput