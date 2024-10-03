import AnswerTag from '@/components/AnswerTag'
import MessageInput from '@/components/navigation/MessageInput'
import PromptShortcut from '@/components/PromptShortcut'
import QuestionTag from '@/components/QuestionTag'
import WaterMarkLogo from '@/components/WaterMarkLogo'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useLocalSearchParams } from 'expo-router'
import React, { useContext, useRef, useState } from 'react'
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import LoadingText from './navigation/LoadingText'
import { useDispatch, useSelector } from 'react-redux'
import { setChatList } from '@/redux/actions'
import { api } from '@/constants/Api'
import { useMMKVString } from 'react-native-mmkv'
import { Storage } from '@/utils/Storage'
const windowHeight = Dimensions.get('window').height;


const ChatPage = () => {
  const [instanceId, setInstanceId] = useMMKVString('instance_id', Storage)
  const [userId, setUserId] = useMMKVString('user_id', Storage)

  const queryClient = useQueryClient()
  useQuery({queryKey:['get-current-chats'],queryFn:loadChats})  
  const searchParam = useLocalSearchParams()
  


  const chatList = useSelector((state: any) => state.chatList);
  const dispatch = useDispatch();
  
  async function loadChats() {
    try {
      setInstanceId(searchParam['id'])
      const res = await axios.post(`${api.conversations.get_chats_by_id}/${userId}`, { instance_id: searchParam['id'] });
      console.log(res?.data?.response?.data?.length || []);
      dispatch(setChatList(res?.data?.response?.data || []))
      return true
    } catch (error) {
      console.log("error in loading chat", error);
      return false
    }
  }

  const reloadData = async () => {
    try {
      console.log("called reloadData");
      await queryClient.invalidateQueries({ queryKey: ['get-current-chats']})
      
    } catch (error) {
      console.log("error in reloading data");
      
    }
  }
  const scrollViewRef = useRef();
  
  return (
    <View style={{ flex: 1, backgroundColor: '#ffff' }}>
      {!chatList?.length  ?
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
          {chatList?.map((x, i) => (
            <View key={i} style={{ marginTop: 30 }} >
            <QuestionTag question={x.questions} />
              <AnswerTag ans={x.response} />
          </View>
        ))}
        </ScrollView>
      }
      <TouchableWithoutFeedback>
      <KeyboardAvoidingView
        keyboardVerticalOffset={70}
        style={{position: 'absolute',bottom: 0,left: 0,width: '100%'}}
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