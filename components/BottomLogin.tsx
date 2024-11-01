import { api } from '@/constants/Api'
import { Colors } from '@/constants/Colors'
import { Storage } from '@/utils/Storage'
import axios from 'axios'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useMMKVString } from 'react-native-mmkv'

const BottomLogin = () => {
  const [adorHubUserId, setAdorHubUserId]=useState("")
  const [adorHubPassword, setAdorHubPassword] = useState("")
  const [loginBtn, setLoginBtn] = useState({
    state: false,
    message:"Login"
  })
  const [loginError, setLoginError] = useState({
    state: false,
    message:"Incorrect credentials"
  })
  
  const [instanceId,setInstanceId]=useMMKVString('instance_id',Storage)
  const [userId, setUserId] = useMMKVString('user_id',Storage)

  const handleLogin =async () => {
    try {
      if (adorHubPassword || adorHubUserId) {
        setInstanceId('')
        const response=await axios.post(api.conversations.user_validation, {
        "email": adorHubUserId,
          "password": adorHubPassword,
      })
      
      if (response?.data?.status===200) {
        setUserId(response?.data?.emp_id)
        console.log(response?.data?.emp_id);
        
        setAdorHubUserId("")
        setAdorHubPassword("")
        setLoginBtn({state:true,message:"Logging in....."})
        if (loginError.state===true){setLoginError({...loginError,message:"",state:false})}
        setTimeout(() => {
          setLoginBtn({state:false,message:"Login"})
          router.navigate('/new')
        },2000)
      }
      else {
        setLoginError({...loginError,state:true})
        console.log("incorrect username and passsword");
      }
    }
    } catch (error) {
      setLoginError({...loginError,state:true})
      console.log("error in logging in");
    }
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
        <TextInput style={{...styles.inputField,borderColor:loginError.state?Colors.RED:"#FFFF",borderWidth:1}}  autoCapitalize='none' onChangeText={(text)=>setAdorHubUserId(text)} placeholder='@adorians.com' defaultValue={adorHubUserId} />
        <TextInput style={{...styles.inputField,borderColor:loginError.state?Colors.RED:"#FFFF",borderWidth:1}}  autoCapitalize='none' onChangeText={(text)=>setAdorHubPassword(text)} placeholder='Password' secureTextEntry defaultValue={adorHubPassword}/>
          {loginError.state &&<Text  style={{color:Colors.RED,fontWeight:"500"}}>{ loginError.message}</Text>}
        <TouchableOpacity disabled={loginBtn.state} style={{...styles.btn}} onPress={handleLogin}>
          <Text style={{ color: '#FFFF', textAlign: 'center' }}>{ loginBtn.message}</Text>
      </TouchableOpacity>
      </View>
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