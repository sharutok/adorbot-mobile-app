import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Colors } from '@/constants/Colors'

const PromptShortcut = () => {
    const PredefinedMessages = ["what products are approved by LRS", "features of superbond ss","What are the recommended storage conditions for Casten electrodes"]
  return (
      <View>
          <View >
              {PredefinedMessages.map((x) => (
                  <TouchableOpacity style={{
                      padding: 10,
                      margin: 10, borderRadius: 10,
                      backgroundColor: "#FFF",marginHorizontal:44
                  }}>
                      <Text style={{color:Colors.DARK_GREY}}>{x}</Text>
                  </TouchableOpacity>
              ))}
          </View>
    </View>
  )
}

export default PromptShortcut