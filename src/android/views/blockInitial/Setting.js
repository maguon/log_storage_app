/**
 * Created by lingxue on 2017/4/17.
 */
import React, { Component, PropTypes } from 'react'
import { View, Picker, Modal, StyleSheet, Text } from 'react-native'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from '../../../reducers/index'
import localStorageKey from '../../../util/LocalStorageKey'
import { Actions } from 'react-native-router-flux'
import localStorage from '../../../util/LocalStorage'
import { Button, Container, Content, Header, Icon, Left, Body, Right, Title, List, ListItem, Thumbnail, Toast } from 'native-base'
import SearchBar from '../../components/Bar/SearchBar'
import ConfirmModal from '../../components/ConfirmModal'
import * as app from '../../../android_app.json'
import * as LoginAction from '../../../actions/LoginAction'


class Setting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmModalVisible: false
        }
        this.onBarcodeReceived = this.onBarcodeReceived.bind(this)
        this.onPressIcon = this.onPressIcon.bind(this)
        this.onPressTextInput = this.onPressTextInput.bind(this)

    }

    onBarcodeReceived(param) {
        Actions.searchVinAtSettingBlock({ vin: param })
    }
    onPressIcon() {
        Actions.searchVinAtSettingBlock()
    }
    onPressTextInput() {
        Actions.searchVinAtSettingBlock()
    }

    exitApp() {
        this.setState({ confirmModalVisible: true })
    }

    onPressOk() {
        this.setState({ confirmModalVisible: false })
        localStorage.saveKey(localStorageKey.USER, { mobile: this.props.userReducer.user.mobile })
        this.props.cleanLogin()
        Actions.login()
    }

    onPressCancel() {
        this.setState({ confirmModalVisible: false })
    }

    render() {
        let viewStyle = { backgroundColor: '#00cade' }
        return (
            <Container style={{ flex: 1 }}>
                <SearchBar
                    viewStyle={viewStyle}
                    onBarcodeReceived={this.onBarcodeReceived}
                    onPressIcon={this.onPressIcon}
                    onPressTextInput={this.onPressTextInput}
                />
                <View style={{ flex: 1 }}>
                    <List>
                        <ListItem onPress={() => { Actions.recordList() }}>
                            <Left>
                                <Icon name="md-person" style={{ color: '#00cade' }} />
                                <Text>工作记录</Text>
                            </Left>
                            <Body></Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem onPress={() => { Actions.password() }}>
                            <Left>
                                <Icon name="ios-lock" style={{ color: '#00cade' }} />
                                <Text>修改密码</Text>
                            </Left>
                            <Body></Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Text>版本信息：v{app.version} </Text>
                        </ListItem>
                    </List>
                    <Button light full style={{ marginTop: 80, marginHorizontal: 15, backgroundColor: '#00cade' }} onPress={this.exitApp.bind(this)}>
                        <Text style={{ color: '#fff' }}>退出登录</Text>
                    </Button>
                </View>
                <ConfirmModal
                    title='确认退出应用？'
                    isVisible={this.state.confirmModalVisible}
                    onPressOk={this.onPressOk.bind(this)}
                    onPressCancel={this.onPressCancel.bind(this)}
                />

            </Container>

        )
    }
}



const mapStateToProps = (state) => {
    return {
        userReducer: state.LoginReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    cleanLogin: () => {
        dispatch(LoginAction.cleanLogin())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Setting)