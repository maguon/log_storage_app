import React, { Component } from 'react'
import { View, Vibration, Modal, Text, TextInput, StatusBar } from 'react-native'
import { Item, Header, Input, Button, Left, Right, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import VinScanner from '../../components/VinScanner'



export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            barcodeModalVisible: false,
            barcode: ''
        }
        this.search = this.search.bind(this)
    }

    barcodeReceived(e) {
        if (e.data !== this.state.barcode || e.type !== this.state.type) Vibration.vibrate()
        if (e.data.length == 17)
            this.setState({
                barcode: e.data,
                barcodeModalVisible: false
            })
    }

    search() {
        // this.props.changeSearchVin(this.state.barcode)
        // Actions.searchCarList()
        this.props.routerPos({ vin: '11111111111111111' })
    }

    render() {
        let { routerPos } = this.props
        return (
            <Header androidStatusBarColor='#00cade' searchBar style={{ backgroundColor: '#00cade' }}>
                <Left style={{ flex: 1 }}>
                    <Button transparent onPress={() => { this.setState({ barcodeModalVisible: true }) }}>
                        <Icon name="md-qr-scanner" type="ionicons" />
                    </Button>
                </Left>
                <View style={{ flex: 6, marginTop: 10, marginBottom: 10 }}>
                    <Item rounded style={{ backgroundColor: 'rgba(255,255,255,0.4)', borderWidth: 0 }}>
                        <Input style={{ color: '#ffffff', fontSize: 14 }}
                            value={this.state.barcode}
                            onTouchStart={routerPos}
                        />
                        <Icon name="md-search"
                            type="ionicons"
                            style={{ color: '#ffffff' }}
                            onPress={this.search} />
                    </Item>
                </View>
                <Right style={{ flex: 1 }}>
                </Right>
                <Modal
                    animationType={"none"}
                    visible={this.state.barcodeModalVisible}
                    onRequestClose={() => { this.setState({ barcodeModalVisible: false }) }}
                >
                    <VinScanner barcodeReceived={this.barcodeReceived.bind(this)} />
                </Modal>
            </Header >

        )
    }
}



