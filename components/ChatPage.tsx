import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MessageInput from '@/components/navigation/MessageInput'
import PromptShortcut from '@/components/PromptShortcut'
import WaterMarkLogo from '@/components/WaterMarkLogo'
import QuestionTag from '@/components/QuestionTag'
import AnswerTag from '@/components/AnswerTag'
import axios from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocalSearchParams, useNavigation } from 'expo-router'

const ChatPage = () => {
  const queryClient = useQueryClient()
  const current_chart_data=useQuery({queryKey:['get-current-chats'],queryFn:loadChats})  
  const  searchParam  = useLocalSearchParams()
  
  
  async function loadChats() {
    try {
      const res = await axios.post(`https://d49d-27-107-7-10.ngrok-free.app/conv/chats-by-id/20283e81-65be-4106-818f-f015bb67a10f`, { instance_id: searchParam });
      return res
    } catch (error) {
      console.log("error in loading chat", error);
    }
  }

  

  const reloadData = async () => {
    console.log("called reloadData");
    await queryClient.invalidateQueries({ queryKey: ['get-current-chats']})
  }
  const scrollViewRef = useRef();


  return (
    <View style={{ flex: 1, backgroundColor: '#ffff' }}>
      {true && <ScrollView
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }} keyboardDismissMode='on-drag'>
        {current_chart_data?.data?.data?.response?.map((x,i) => (
          <View key={i} >
            <QuestionTag question={x.questions} />
            <AnswerTag ans={x.response} />
          </View>
        ))}
      </ScrollView>}
     {false&& <View style={styles.container}>
        <View style={styles.alignedView}>
      <WaterMarkLogo/>
        </View>
          <PromptShortcut/>
      </View>}
      <View style={{ flex: 1 }}>
      </View>
      <TouchableWithoutFeedback
        // onPress={Keyboard.dismiss}
      >
      <KeyboardAvoidingView
        keyboardVerticalOffset={70}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%'
        }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <MessageInput reloadData={reloadData}  />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  alignedView: {
    // padding: 20,
    // borderRadius: 10,
    marginVertical:20,
    alignSelf: 'center', // Horizontally centers the component within its parent
  },
});
export default ChatPage