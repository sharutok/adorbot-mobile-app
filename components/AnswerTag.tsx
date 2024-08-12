import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import LoadingText from './navigation/LoadingText'
const AnswerTag = ({ ans }) => {
    return (
        <View style={{ flexDirection: 'row', width: 'auto',padding:5 }}>
            <Image
                source={{ uri: 'https://adorwelding.org/Adorhub_uploads/PCM.png' }}
                style={styles.image}
            />
            {false?
                <LoadingText /> :    
            <View style={styles.questionField}>
                <View>
                        <Text>{ans}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 30, padding: 5 }}>
                        <TouchableOpacity>
                            <Feather size={16} name='copy' />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Feather size={16} name='thumbs-down' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    questionField: {
        borderBottomLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: Colors.ACCENT_COLOR,
        flexDirection: 'row',
        margin: 10,
        marginRight: 40,
        padding: 10,
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
    },
    image: {
        width: 30,
        height: 30,
    },
})
export default AnswerTag