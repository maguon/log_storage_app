import React, { Component } from 'react'
import { View, Vibration, Modal, Text, TextInput, StatusBar } from 'react-native'
import { Item, Header, Input, Button, Left, Right, Icon } from 'native-base'
import VinScanner from '../../components/VinScanner'

export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            barcodeModalVisible: false,
        }
        this._onPressIcon = this._onPressIcon.bind(this)
        this._onPressTextInput = this._onPressTextInput.bind(this)
        this._onBarcodeReceived = this._onBarcodeReceived.bind(this)
    }

    static defaultProps = {
        onBarcodeReceived: (param) => { console.log('this.props.onBarcodeReceived', param) },
        onPressIcon: () => { console.log('this.props.onPressIcon') },
        onPressTextInput: () => { console.log('this.props.onPressTextInput') }
    }

    _onBarcodeReceived(e) {
        if (e.data !== this.state.barcode || e.type !== this.state.type) Vibration.vibrate()
        if (e.data.length == 17)
            this.setState({
                barcodeModalVisible: false
            })
        this.props.onBarcodeReceived(e.data)
    }

    _onPressIcon() {
        this.props.onPressIcon()
    }

    _onPressTextInput() {
        this.props.onPressTextInput()
    }

    render() {
        return (
            <Header androidStatusBarColor='#00cade' searchBar style={{ backgroundColor: '#00cade' }}>
                <Left style={{ flex: 1 }}>
                    <Button transparent onPress={() => { this.setState({ barcodeModalVisible: true }) }}>
                        <Icon name="ios-barcode-outline" style={{fontSize:30}} type="ionicons" />
                    </Button>
                </Left>
                <View style={{ flex: 6, marginTop: 10, marginBottom: 10 }} onTouchStart={this._onPressTextInput}>
                    <Item rounded style={{ backgroundColor: 'rgba(255,255,255,0.4)', borderWidth: 0 }}>
                        <Input
                            style={{ color: '#ffffff', fontSize: 14 }}
                            editable={false}
                        />
                        <Icon name="md-search"
                            type="ionicons"
                            style={{ color: '#ffffff' }}
                            onPress={this._onPressIcon} />
                    </Item>
                </View>
                <Right style={{ flex: 1 }}>
                </Right>
                <Modal
                    animationType={"none"}
                    visible={this.state.barcodeModalVisible}
                    onRequestClose={() => { this.setState({ barcodeModalVisible: false }) }}
                >
                    <VinScanner barcodeReceived={this._onBarcodeReceived} />
                </Modal>
            </Header >

        )
    }
}



