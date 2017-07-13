import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'


export default class SearchNoResult extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <Text>vin:1323123234</Text>
                <Text>没有搜到该车辆信息！</Text>
                <Button onPress={() => { Actions.addCarForHome() }}>
                    <Text>新增入库车辆</Text>

                </Button>
            </View>
        )
    }
}
