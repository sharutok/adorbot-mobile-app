import { View, Text, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useContext } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Colors } from '@/constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { setInputMessageText } from '@/redux/actions'
import SkeletonLoader from './SkeletonLoader'

const PromptShortcut = () => {
    const PredefinedMessages = ["What products are approved by LRS", "Features of superbond ss", "What are the recommended storage conditions for Casten electrodes"]

    const dispatch = useDispatch();


    function handleClickPrompt(x: any) {
        dispatch(setInputMessageText(x))
    }
    
  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          style={{ flex: 1 }}>
          <View
              style={{ alignItems: 'center' }}>
              {PredefinedMessages?.map((x,i) => (
                  <TouchableOpacity
                      key={i}
                      onPress={()=>handleClickPrompt(x)}
                  style={{
                      padding: 10,
                      margin: 10,
                      borderRadius: 10,
                      borderColor: Colors.MEDIUM_GREY,
                      borderWidth: 1,
                      backgroundColor: "#FFF",
                      width:Dimensions.get('window').width-50,
                  }}>
                      <View>
                      <Text key={i} style={{color:Colors.DARK_GREY}}>{x}</Text>
                      </View>
                  </TouchableOpacity>
              ))}
          </View>
    </KeyboardAvoidingView>
  )
}

export default PromptShortcut