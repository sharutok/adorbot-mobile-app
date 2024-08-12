import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const QuestionTag = ({ question }) => {
    return (
        <View>
            <View style={styles.awnserField}>
                <Text style={{ fontWeight: '500' }}>
                    {question}
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