import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { ListItem } from 'native-base'

export default class SearchVinList extends Component {
    constructor(props) {
        super(props)
        // this._onEndReached = this._onEndReached.bind(this)
        this._onPressItem = this._onPressItem.bind(this)
    }

    // _onEndReached() {
    //     this.props.onEndReached()
    // }

    _onPressItem(vin) {
        this.props.onPressItem(vin)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.props.vinList}
                    renderItem={({ item }) => <ListItem onPress={() => this._onPressItem(item.vin)}><Text>{item.vin}</Text></ListItem>}
                   // onEndReached={this._onEndReached}
                    //onEndReachedThreshold={0.5}
                />

            </View>
        )
    }

}
