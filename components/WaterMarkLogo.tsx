import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const WaterMarkLogo = () => {
  return (
    <View >
          <Image
              source={{ uri: 'https://adorwelding.org/Adorhub_uploads/PCM.png' }}
              style={styles.image}
          />
    </View>
  )
}

export default WaterMarkLogo

const styles = StyleSheet.create({
    image: {
        opacity:0.6,
        width: 50,
        alignSelf: 'center',
        height: 50,
    },
})