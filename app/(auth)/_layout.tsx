import { Colors } from '@/constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, useDrawerStatus } from '@react-navigation/drawer';
import {FontAwesome} from '@expo/vector-icons'
import { DrawerActions } from '@react-navigation/native';
import { Link, Stack, Tabs, useNavigation, useRouter } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React, { useEffect, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { api } from '@/constants/Api';

export default function TabLayout() {
  const navigation=useNavigation()
  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        title:"Chat",
      headerLeft: () => (
        <TouchableOpacity onPress={()=>{navigation.dispatch(DrawerActions.toggleDrawer)}}>
          <Ionicons style={{ marginLeft: 20 }} name='menu-outline' size={32} color={Colors.DARK_GREY} />
        </TouchableOpacity>
      ),
      drawerActiveBackgroundColor: Colors.LIGHT_GREY ,
      drawerActiveTintColor: Colors.DARK_GREY,
    }} >
      <Drawer.Screen
        name="(drawer)/new"
        options={{
          drawerItemStyle:{display:'none'},
          headerRight: () => (
            <Link href={"#"}>
              <TouchableOpacity>
                <Ionicons style={{ marginRight: 20 }} name='document-text-outline' size={24} color={Colors.DARK_GREY}/>
            </TouchableOpacity>
            </Link>
         )
       }}
      />
  </Drawer>
  )
}

const CustomDrawerContent = (props:any) => {
  const { top, bottom } = useSafeAreaInsets()
  const isDrawerOpen = useDrawerStatus() === 'open'
  const [history, setHistory] = useState([])
  const router = useRouter() 
  
  
  function fetchPosts() {
    return axios.get(api.history.chat_history_list_by_id);
  }

  const { data, error, isLoading } = useQuery(['posts'], fetchPosts);
  
  print(data)

  useEffect(() => {
    if (isDrawerOpen) {
      loadChats()
    }
    Keyboard.dismiss()
  }, [isDrawerOpen])

  function loadChats() {
    console.log('')
  }

  return (
    <View style={{ flex: 1, marginTop: top }}>
      <View style={styles.inputField}>
      <FontAwesome name='search' size={12} color={Colors.MEDIUM_GREY}/>
      <TextInput  autoCapitalize='none' placeholder='Search' />
      </View>
      <DrawerContentScrollView contentContainerStyle={{paddingTop:0}} {...props}>
        <DrawerItemList {...props} /> 
        {Array.from({ length: 20}).map((x,y) =>
          <DrawerItem key={y} label={"y"} onPress={()=>router.push(`/(drawer)/${x}`)}></DrawerItem>
        ) }
      </DrawerContentScrollView>
      <View style={{padding:16,paddingBottom:bottom}}>
<Text>Version 1.0.0</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputField: {
    marginHorizontal: 10,
    marginVertical: 10,
    height: 40,
    borderRadius: 20,
    padding: 10,
    backgroundColor: Colors.LIGHT_GREY,
    flexDirection:'row',alignItems:'center',gap:5
  },
});



