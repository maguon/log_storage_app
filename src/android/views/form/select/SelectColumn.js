import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../../../components/Bar/NavBar'
import { Actions } from 'react-native-router-flux'
import { List, ListItem } from 'native-base'

export default class SelectColumn extends Component {
    constructor(props) {
        super(props)
        this._onPressItem = this._onPressItem.bind(this)
    }

    // chageParkingId(param) {
    //     this.props.chageParkingId(param)
    //     // Actions.pop({ popNum: this.props._popNum })
    // }


    _onPressItem(param) {
        let { popName,routerIndex, routerList, onSelect, storageId, storageName } = this.props
        if (routerList.length > 0 && routerIndex < routerList.length) {
             routerList[routerIndex]({
                ...param,
                routerIndex: routerIndex + 1,
                storageId,
                storageName,
                popName,
                onSelect,
                routerList
            })
        }
        else {
            onSelect({ ...param, storageId, storageName })
            Actions.popTo(popName)
        }
    }


    render() {
        let columns = this.props.columns.map((item, i) => {
            return (
                <ListItem key={i} button onPress={() => this._onPressItem({ parkingId: item.parkingId })}>
                    <Text>{item.col.toString()}</Text>
                </ListItem>
            )
        })
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <List>
                        {columns}
                    </List>
                </ScrollView>
            </View>
        )
    }

}