import React, { Component } from 'react'
import { Text, View, StatusBar, TextInput } from 'react-native'
import { Header, Title, Button, Item, Input, Icon, Left, Right } from 'native-base'
import { Actions } from 'react-native-router-flux'


export default class NavSearchBar extends Component {
    constructor(props) {
        super(props)
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
        Type: 'custom',// custom点击TextInput为不跳转 back点击TextInput返回
        onChangeSearchText: (param) => { console.log('this.props.onChangeSearchText', param) },
        onPressIcon: () => { console.log('this.props.onPressIcon') }
    }



    //回调函数，当用户输入vin码时触发
    _onChangeSearchText(param) {
        this.props.onChangeSearchText(param)
    }

    _onPressTextInput() {
        if (this.props.type == 'back') {
            Actions.pop()
        }
    }

    //回调函数，当用户点击搜索按钮时触发
    _onPressIcon() {
        this.refs['searchInput'].focus()
        if (this.props.type == 'back') {
            Actions.pop()
        }
        else {
            this.props.onPressIcon()
        }
    }

    _focus() {
        this.refs.searchInput.focus()
    }

    _blur() {
        this.refs.searchInput.blur()
    }

    render() {

        return (
            <Header androidStatusBarColor='#00cade' searchBar style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#00cade' }}>
                <Left style={{ flex: 1 }}>
                    <Button transparent onPress={() => { Actions.pop() }}>
                        <Icon name="ios-arrow-back" type="ionicons" />
                    </Button>
                </Left>
                <View style={{
                    flex: 6,
                    paddingTop: 10,
                    paddingBottom: 10,
                    height: 36,
                    flexDirection: 'row',   // 水平排布
                    borderRadius: 18,  // 设置圆角边
                    backgroundColor: 'rgba(255,255,255,0.4)',
                    alignItems: 'center',
                }}>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={{
                            color: '#fff',
                            flex: 1,
                            height: 36,
                            backgroundColor: 'transparent',
                        }}
                        ref='searchInput'
                        value={this.props.vin}
                        onChangeText={(param) => this._onChangeSearchText(param)}
                        onTouchStart={this._onPressTextInput}
                        autoFocus={true}

                    />
                    <Icon name="md-search"
                        type="ionicons"
                        style={{
                            color: '#fff',
                            marginLeft: 5,
                            marginRight: 8,
                            fontSize: 22
                        }}
                        onPress={this._onPressIcon}
                    />
                </View>
                <Right style={{ flex: 1 }}>
                </Right>
            </Header >
        )
    }
}


