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

const ApplyDamageSubmit = props => {
    const { createDamage, applyDamageReducer: { createDamage: { isResultStatus } } } = props
    if (isResultStatus == 1) {
        return (
            <Spinner color='#fff' />
        )
    } else {
        return (
            <Button transparent onPress={createDamage}>
                <Text style={styles.text}>下一步</Text>
            </Button>
        )
     }
}

const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})


const mapStateToProps = (state) => {
    return {
        applyDamageReducer: state.applyDamageReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    createDamage: () => {
        dispatch(submit('applyDamage'))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplyDamageSubmit)
