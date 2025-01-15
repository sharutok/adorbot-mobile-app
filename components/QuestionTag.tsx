import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import * as Clipboard from 'expo-clipboard';
import { TouchableOpacity } from 'react-native-gesture-handler'

const QuestionTag = ({ question }) => {
    async function copyToClipboard() {
        try {
            const text = await Clipboard.setStringAsync(question);
        } catch (error) {
            console.log(error);
            console.log("error in copying");

        }
    }
    return (
        <View>
            <View style={[styles.awnserField]}>
                <TouchableOpacity onPress={copyToClipboard}>
                <Text style={{ fontWeight: '500'}}>
                    {question}
                </Text>
                </TouchableOpacity>
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