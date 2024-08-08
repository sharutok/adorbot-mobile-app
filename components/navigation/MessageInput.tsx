import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { BlurView } from 'expo-blur'
import { FontAwesome,Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ATouchableOpacity=Animated.createAnimatedComponent(TouchableOpacity)

const MessageInput = () => {
  const [message, setMessage] = useState('')
  const { bottom } = useSafeAreaInsets()
  const expanded=useSharedValue(0)
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
          <TextInput style={{marginBottom:5}} multiline autoCapitalize='none' placeholder='Message AdorBot....' />
          <ATouchableOpacity >
        <MaterialCommunityIcons name='close-circle-outline' size={18} color={Colors.DARK_GREY} />
          </ATouchableOpacity>
        </View>
      <ATouchableOpacity style={{ ...styles.sendBtn }}>
          <Feather name='arrow-up' size={18} color={Colors.DARK_GREY} />
      </ATouchableOpacity>
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