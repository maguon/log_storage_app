import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { reset, submit } from 'redux-form'

const { width } = Dimensions.get('window')

const QueryOp = (props) => {
    const { onReset, onSubmit } = props
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button transparent onPress={onSubmit}>
                <Icon name='ios-search' color='#fff' />
            </Button>
            <Button transparent onPress={onReset}>
                <Icon name='ios-undo' color='#fff' />
            </Button>
        </View>
    )
}


const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => ({
    onReset: () => {
        dispatch(reset('queryCarForm'))
    },
    onSubmit: () => {
        dispatch(submit('queryCarForm'))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(QueryOp)

