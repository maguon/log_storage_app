import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Button, Spinner, Icon } from 'native-base'
import { submit } from 'redux-form'

const AddCarSubmit = props => {
    const { createCar, addCarReducer: { createCar: { isResultStatus } } } = props
    if (isResultStatus == 1) {
        return (
            <Spinner color='#fff' />
        )
    } else {
        return (
            <Button transparent onPress={createCar}>
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
        addCarReducer: state.addCarReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    createCar: () => {
        dispatch(submit('addCarForm'))
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(AddCarSubmit)
