import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native'
import React from 'react'
import MessageInput from '@/components/navigation/MessageInput'
import PromptShortcut from '@/components/PromptShortcut'
import WaterMarkLogo from '@/components/WaterMarkLogo'
import QuestionTag from '@/components/QuestionTag'
import AnswerTag from '@/components/AnswerTag'

const ChatPage = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#ffff' }}>
     {true&& <ScrollView contentContainerStyle={{paddingBottom:50,paddingTop:10}} keyboardDismissMode='on-drag'>
        {Array.from({ length: 1}).map((x,i) => (
          <View id={i}>
          <QuestionTag />
          <AnswerTag/>
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={70}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%'
        }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <MessageInput />
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