import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const LoadingText = () => {
  return (
      <View style={styles.questionField}>
          <Image source={{ uri: 'https://adorwelding.org/Adorhub_uploads/icons8-dots-loading.gif' }} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
    questionField: {
        alignItems: 'center',
        marginHorizontal:10,
        // backgroundColor: Colors.ACCENT_COLOR,
        flexDirection: 'row',
        marginRight: 40,
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
    },
    image: {
        width: 20,
        height: 20,
        backgroundColor:'red'
    },
})
export default LoadingText