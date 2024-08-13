import AnswerTag from '@/components/AnswerTag'
import MessageInput from '@/components/navigation/MessageInput'
import PromptShortcut from '@/components/PromptShortcut'
import QuestionTag from '@/components/QuestionTag'
import WaterMarkLogo from '@/components/WaterMarkLogo'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useLocalSearchParams } from 'expo-router'
import React, { useRef, useState } from 'react'
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import LoadingText from './navigation/LoadingText'
const windowHeight = Dimensions.get('window').height;


const ChatPage = () => {
  const queryClient = useQueryClient()
  const current_chart_data=useQuery({queryKey:['get-current-chats'],queryFn:loadChats})  
  const searchParam = useLocalSearchParams()
  const [chatList, setChatList] = useState([])
  const [height,setHeight]=useState(0)
  
  async function loadChats() {
    try {
      const res = await axios.post(`https://d49d-27-107-7-10.ngrok-free.app/conv/chats-by-id/20283e81-65be-4106-818f-f015bb67a10f`, { instance_id: searchParam });
      setChatList(res)
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
      {!current_chart_data?.data?.data?.response?.length  ?
        <View style={{ flex: 1 }}  >
          <View style={[styles.container,{marginTop:windowHeight/10,marginBottom:20}]}>
          <WaterMarkLogo/>
          </View>
          <PromptShortcut />
      </View>:
       <ScrollView showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }} keyboardDismissMode='on-drag'>
        {/* {current_chart_data?.data?.data?.response?.map((x,i) => ( */}
          {chatList?.data?.response?.map((x,i) => (
          <View key={i} style={{marginTop:30}} >
            <QuestionTag question={x.questions} />
              <AnswerTag ans={x.response} />
          </View>
        ))}
      </ScrollView>}
      <TouchableWithoutFeedback>
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
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
  },
  alignedView: {

  },
});
export default ChatPage