import React, { Component } from 'react'
import { Text, View, StatusBar } from 'react-native'
import { Header, Title, Button, Item, Input, Icon, Left, Right } from 'native-base'
import { Actions } from 'react-native-router-flux'


export default class NavSearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vin: ''
        }
        this._onChangeSearchText = this._onChangeSearchText.bind(this)
        this._onPressTextInput = this._onPressTextInput.bind(this)
        this._onPressIcon = this._onPressIcon.bind(this)
    }

    componentWillMount() {
        if (this.props.vin) {
            this.setState({ vin: this.props.vin })
        }
    }

    static defaultProps = {
        Type: 'custom',// custom点击TextInput为不跳转 back点击TextInput返回searchVinList
        onChangeSearchText: (param) => { console.log('this.props.onChangeSearchText', param) },
        onPressIcon: () => { console.log('this.props.onPressIcon') }
    }


    //回调函数，当用户输入vin码时触发
    _onChangeSearchText(param) {
        this.setState({ vin: param })
        this.props.onChangeSearchText(param)
    }

    _onPressTextInput() {
        if (this.props.type == 'back') {
            Actions.pop()
        }
    }
    //回调函数，当用户点击搜索按钮时触发
    _onPressIcon() {
        if (this.props.type == 'back') {
            Actions.pop()
        }
        else {
            this.props.onPressIcon()
        }
    }

    render() {
        return (
            <Header androidStatusBarColor='#00cade' searchBar style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#00cade' }}>
                <Left style={{ flex: 1 }}>
                    <Button transparent onPress={Actions.pop}>
                        <Icon name="ios-arrow-back" type="ionicons" />
                    </Button>
                </Left>
                <View style={{ flex: 6, paddingTop: 10, paddingBottom: 10 }}>
                    <Item rounded style={{ backgroundColor: 'rgba(255,255,255,0.4)', borderWidth: 0 }}>
                        <Input style={{ color: '#ffffff', fontSize: 14 }}
                            value={this.state.vin}
                            onChangeText={(param) => this._onChangeSearchText(param)}
                            onTouchStart={this._onPressTextInput}
                        />
                        <Icon name="md-search"
                            type="ionicons"
                            style={{ color: '#ffffff' }}
                            onPress={this._onPressIcon}
                        />
                    </Item>
                </View>
                <Right style={{ flex: 1 }}>
                </Right>
            </Header>
        )
    }
}


