import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

const QuestionTag = ({ question }) => {
    return (
        <View>
            <View style={[styles.awnserField]}>
                <Text style={{ fontWeight: '500'}}>
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
        alignSelf: 'flex-end',
        marginRight: 20,
        padding: 10,
        marginLeft: Dimensions.get('screen').width-320,
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
        // backgroundColor: Colors.LIGHT_GREY,
    },
    image: {
        width: 50,
        height: 50,
    }
})


export default QuestionTag