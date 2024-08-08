import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'


const QuestionTag = () => {
    return (
        <View>
            <View style={styles.awnserField}>
                <Text style={{ fontWeight: '500' }}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing
                    elit. Veritatis doloremque culpa facilis.
                    Magni blanditiis, ratione voluptate quisquam tempore
                    ex soluta alias in mollitia,
                    iure sapiente quidem rem porro et unde!
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    awnserField: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
    },
    image: {
        width: 50,
        height: 50,
    }
})


export default QuestionTag