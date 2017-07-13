import React, { Component } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import * as CarInfoAction from '../../actions/CarInfoAction'
import * as CarListAction from '../../actions/CarListAction'
import { Actions } from 'react-native-router-flux'
import CarInfoLayout from '../layout/CarInfo'


export default class CarInformationEditor extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Text>CarInformationEditor</Text>
            </View>
        )
    }

}
