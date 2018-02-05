import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Button, Spinner } from 'native-base'
import { submit } from 'redux-form'

const AddCarSubmit = props => {
    return (
        <Button transparent onPress={Actions.importCarAtHomeBlock}>
            <Text style={styles.text}>下一步</Text>
        </Button>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})



export default AddCarSubmit
