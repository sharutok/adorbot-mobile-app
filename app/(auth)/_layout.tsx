import { Colors } from '@/constants/Colors';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, useDrawerStatus } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useNavigation, useRouter } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React, { useEffect } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const navigation = useNavigation()
  
  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        title: "Chat",
        drawerLabel: 'New Chat',
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

const CustomDrawerContent = (props: any) => {
  const queryClient = useQueryClient()
  const { top, bottom } = useSafeAreaInsets()
  const isDrawerOpen = useDrawerStatus() === 'open'
  const router = useRouter() 
  
  const history = useQuery({
    queryKey: ['todos'], queryFn: async () => {
      const res= await axios.get(`https://d49d-27-107-7-10.ngrok-free.app/conv/history/20283e81-65be-4106-818f-f015bb67a10f`);
      return res
    }
  })

  async function reloadData() {
    console.log("history list refreshed");
    await queryClient.invalidateQueries({ queryKey: ['todos'] })
  }

  useEffect(() => {
    if (isDrawerOpen) {
      reloadData()
    }
    Keyboard.dismiss()
  }, [isDrawerOpen])

  

  return (
    <View style={{ flex: 1, marginTop: top }}>
      <View style={styles.inputField}>
      <FontAwesome name='search' size={12} color={Colors.MEDIUM_GREY}/>
      <TextInput  autoCapitalize='none' placeholder='Search' />
      </View>
      <DrawerContentScrollView contentContainerStyle={{paddingTop:0}} {...props}>
        {/* <DrawerItemList {...props} />  */}
        {history?.data?.data?.response?.map((y) =>
          <DrawerItem key={y?.instance_id} label={y?.questions} onPress={()=>router.push(`/(drawer)/${y?.instance_id}`)}></DrawerItem>
        ) }
      </DrawerContentScrollView>
      <View style={{padding:16,paddingBottom:bottom,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <Text>Version 1.0.0</Text>
         <Link href={"#"}>
        <TouchableOpacity >
          <MaterialIcons style={{ marginLeft: 20 }} name='logout' size={23} color={Colors.DARK_GREY} />
        </TouchableOpacity>
            </Link>
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



