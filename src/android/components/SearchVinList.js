import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { ListItem } from 'native-base'

export default class SearchVinList extends Component {
    constructor(props) {
        super(props)
        this._onEndReached = this._onEndReached.bind(this)
    }

    _onEndReached() {
        console.log('_onEndReached')
        this.props.onEndReached()
    }

    render() {
        console.log(this.props)
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.props.vinList}
                    renderItem={({ item }) => <ListItem><Text>{item.vin}</Text></ListItem>}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={0.5}
                />

            </View>
        )
    }

}
