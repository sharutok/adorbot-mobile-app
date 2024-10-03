import { Colors } from '@/constants/Colors'
import { Storage } from '@/utils/Storage'
import { router } from 'expo-router'
import React from 'react'
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useMMKVString } from 'react-native-mmkv'

const BottomLogin = () => {
  const [instanceId,setInstanceId]=useMMKVString('instance_id',Storage)
  const [userId, setUserId] = useMMKVString('user_id',Storage)

  const handleLogin = () => {
    setInstanceId('')
    setUserId('20283e81-65be-4106-818f-f015bb67a10f')
    router.navigate('/new')
  }
  
  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={1} style={styles.container}>
      <View style={{marginTop:200,marginBottom:40}}>
      <Image
        source={{ uri: 'https://adorwelding.org/Adorhub_uploads/PCM.png' }}
        style={styles.image}
        />
      <View style={{display:'flex',flexDirection:'row',justifyContent:'center'} }>
        <Text style={{fontFamily:'ArchiveRegular', fontSize:30,color: Colors.GREY}}>ADOR</Text>
        <Text style={{fontFamily:'ArchiveRegular', fontSize:30,color: Colors.RED }}>BOT</Text>
      </View>
        </View>
      <View style={{marginHorizontal:20}}>
        <TextInput style={styles.inputField} autoCapitalize='none' placeholder='Email ID' value='itpune@adorians.com'/>
      <TextInput style={styles.inputField} autoCapitalize='none' placeholder='Password' secureTextEntry value='ador@123'/>
        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={{color:'#FFFF',textAlign:'center'}}>Login</Text>
      </TouchableOpacity>
      </View>
      {/* <TouchableWithoutFeedback onPress={dismiss}>
        </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  image: {
    width: 50,
    alignSelf:'center',
    height: 50,
  },
  inputField: {
    marginVertical: 10,
    height: 40,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#FFFF"
  },
  btn: {
    borderRadius: 20,
    marginVertical: 24,
    padding: 14 ,
    backgroundColor: Colors.DARK_GREY
  }
})

export default BottomLogin