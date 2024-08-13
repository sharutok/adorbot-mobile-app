import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const LoadingText = () => {
  return (
      <View style={styles.questionField}>
          <Image source={{ uri: 'https://adorwelding.org/Adorhub_uploads/Animation - 1722496482079.gif' }} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
    questionField: {
        alignItems: 'center',
        // marginHorizontal:10,
        flexDirection: 'row',
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
    },
    image: {
        width: 50,
        height: 50,
    },
})
export default LoadingText