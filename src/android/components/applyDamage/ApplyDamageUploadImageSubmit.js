import React, { Component } from 'react'
import {
    StyleSheet,
    Text
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Button } from 'native-base'


const ApplyDamageUploadImageSubmit = props => {
    const { parent } = props
    return (
        <Button transparent onPress={() => Actions.popTo('home')}>
            <Text style={styles.text}>完成</Text>
        </Button>
    )
}

export default ApplyDamageUploadImageSubmit

const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})
