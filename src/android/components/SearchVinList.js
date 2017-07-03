import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { ListItem } from 'native-base'

export default class SearchVinList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props)
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.props.cars}
                    renderItem={({ item }) => <ListItem><Text>{item.vin}</Text></ListItem>}
                    onEndReached={(value) => { this.props.searchCarListMore() }}
                    onEndReachedThreshold={0.5}
                />

            </View>
        )
    }

}
