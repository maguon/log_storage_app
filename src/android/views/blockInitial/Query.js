import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import SearchBar from '../../components/Bar/SearchBar'
import { Actions } from 'react-native-router-flux'



export default class Query extends Component {
    constructor(props) {
        super(props)

        this.onBarcodeReceived = this.onBarcodeReceived.bind(this)
        this.onPressIcon = this.onPressIcon.bind(this)
        this.onPressTextInput = this.onPressTextInput.bind(this)
    }

    onBarcodeReceived(param) {
        Actions.searchVinAtCarBlock({ vin: param })
    }
    onPressIcon() {
        Actions.searchVinAtCarBlock()
    }
    onPressTextInput() {
        Actions.searchVinAtCarBlock()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <SearchBar
                    onBarcodeReceived={this.onBarcodeReceived}
                    onPressIcon={this.onPressIcon}
                    onPressTextInput={this.onPressTextInput}
                />
            </View>
        )
    }

}
