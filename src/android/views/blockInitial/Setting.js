import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    InteractionManager,
    TouchableOpacity,
    Linking
} from 'react-native'
import { Container, Content, List, Left, ListItem, Thumbnail, Separator, Body, Right, Icon, Button } from 'native-base'
import { connect } from 'react-redux'
import FoundationIcon from 'react-native-vector-icons/dist/Foundation'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../../GlobalStyles'
import * as demageListAction from '../../../actions/views/DemageListAction'
import * as responsibilityListAction from '../../../actions/views/ResponsibilityListAction'
//import * as loginAction from '../login/LoginAction'
import { file_host } from '../../../config/Host'
import ConfirmModal from '../../../android/components/share/ConfirmModal'


class Setting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmModalVisible: false
        }
        this.exitApp = this.exitApp.bind(this)
        this.onPressOk = this.onPressOk.bind(this)
        this.onPressCancel = this.onPressCancel.bind(this)
    }

    exitApp() {
        this.setState({ confirmModalVisible: true })
    }

    onPressOk() {
        this.setState({ confirmModalVisible: false })
        // this.props.cleanLogin()
    }

    onPressCancel() {
        this.setState({ confirmModalVisible: false })
    }

    render(){
        const { getDemageListWaiting,
            getDemageList,
            getResponsibilityListWaiting,
            getResponsibilityList,
            // cleanLogin,
            // loginReducer: { data: { user: { real_name, avatar_image, mobile } } },
           // initializationReducer: { data: { version: { force_update, currentVersion, url } } }, initializationReducer 
        } = this.props
        console.log('this.props',this.props)
        return (
            <Container>
                <Content style={globalStyles.container}>
                    <List style={styles.list}>
                        <Separator bordered />
                        {/* <ListItem last onPress={Actions.personalCenter}>
                            <View style={styles.avatarContainer}>
                                <Thumbnail source={avatar_image ? { uri: `${file_host}/image/${avatar_image}` } : { uri: `personalicon` }} />
                                <View style={styles.userContainer}>
                                    <Text style={globalStyles.midText}>{real_name ? `${real_name}` : ''}</Text>
                                    <Text style={globalStyles.midText}>{mobile ? `${mobile}` : ''}</Text>
                                </View>
                            </View>
                        </ListItem> */}
                        <Separator bordered />
                        <ListItem icon onPress={() => {
                            getDemageListWaiting()
                            Actions.demageList()
                            InteractionManager.runAfterInteractions(() => {
                                getDemageList()
                            })
                        }}>
                            <Left>
                                <Icon name="ios-alert" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                                <Text style={globalStyles.midText}>我的质损</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem icon last onPress={() => {
                            getResponsibilityListWaiting()
                            Actions.responsibilityList()
                            InteractionManager.runAfterInteractions(() => {
                                getResponsibilityList()
                            })
                        }}>
                            <Left>
                                <Icon name="ios-umbrella" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                                <Text style={globalStyles.midText}>我的责任</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <Separator bordered />
                        {/* <ListItem icon>
                            <Left>
                                <Icon name="ios-cube-outline" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                                <Text style={globalStyles.midText}>版本信息：v{currentVersion}</Text>
                            </Body>
                            <Right >
                                {force_update != 0 && <TouchableOpacity onPress={() => {
                                    if (url) {
                                        Linking.canOpenURL(url)
                                            .then(supported => {
                                                if (!supported) {
                                                    console.log('Can\'t handle url: ' + url)
                                                } else {
                                                    return Linking.openURL(url)
                                                }
                                            })
                                            .catch(err => console.error('An error occurred', err))
                                    }
                                }}>
                                    <FoundationIcon name="burst-new" size={30} color={'#ff0000'} />
                                </TouchableOpacity>}
                            </Right>
                        </ListItem> */}
                        <ListItem icon onPress={Actions.updatePassword}>
                            <Left>
                                <Icon name="ios-key-outline" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                                <Text style={globalStyles.midText}>修改密码</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>

                    </List>
                    <Button full style={[styles.button, globalStyles.styleBackgroundColor]} onPress={this.exitApp}>
                        <Text style={[globalStyles.midText, styles.buttonTitle]}>退出</Text>
                    </Button>
                </Content>
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

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#fff',
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userContainer: {
        marginLeft: 10
    },
    button: {
        margin: 15,
        marginTop: 40
    },
    buttonTitle: {
        color: '#fff'
    }
})

const mapStateToProps = (state) => {
    return {
        loginReducer: state.LoginReducer,
        settingReducer: state.settingReducer,
        initializationReducer: state.initializationReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getDemageList: () => {
        dispatch(demageListAction.getDemageList())
    },
    getDemageListWaiting: () => {
        dispatch(demageListAction.getDemageListWaiting())
    },
    getResponsibilityList: () => {
        dispatch(responsibilityListAction.getResponsibilityList())
    },
    getResponsibilityListWaiting: () => {
        dispatch(responsibilityListAction.getResponsibilityListWaiting())
    },
    // cleanLogin: () => {
    //     dispatch(loginAction.cleanLogin())
    // }
})

export default connect(mapStateToProps, mapDispatchToProps)(Setting)






// /**
//  * Created by lingxue on 2017/4/17.
//  */
// import React, { Component, PropTypes } from 'react'
// import { View, Picker, Modal, StyleSheet, Text, Linking } from 'react-native'
// import { Provider, connect } from 'react-redux'
// import { createStore, applyMiddleware, compose } from 'redux'
// import ReduxThunk from 'redux-thunk'
// import reducers from '../../../reducers/index'
// import localStorageKey from '../../../util/LocalStorageKey'
// import { Actions } from 'react-native-router-flux'
// import localStorage from '../../../util/LocalStorage'
// import { Button, Container, Content, Header, Icon, Left, Body, Right, Title, List, ListItem, Thumbnail, Toast } from 'native-base'
// import SearchBar from '../../components/Bar/SearchBar'
// import ConfirmModal from '../../components/ConfirmModal'
// import * as app from '../../../android_app.json'
// import * as LoginAction from '../../../actions/LoginAction'


// class Setting extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             confirmModalVisible: false
//         }
//         this.onBarcodeReceived = this.onBarcodeReceived.bind(this)
//         this.onPressIcon = this.onPressIcon.bind(this)
//         this.onPressTextInput = this.onPressTextInput.bind(this)
//         this.linkDownload = this.linkDownload.bind(this)
//     }

//     onBarcodeReceived(param) {
//         Actions.searchVinAtSettingBlock({ vin: param })
//     }
//     onPressIcon() {
//         Actions.searchVinAtSettingBlock()
//     }
//     onPressTextInput() {
//         Actions.searchVinAtSettingBlock()
//     }

//     linkDownload(url) {
//         Linking.canOpenURL(url).then(supported => {
//             if (!supported) {
//                 console.log('Can\'t handle url: ' + url)
//             } else {
//                 return Linking.openURL(url)
//             }
//         }).catch(err => console.error('An error occurred', err))
//     }

//     exitApp() {
//         this.setState({ confirmModalVisible: true })
//     }

//     onPressOk() {
//         this.setState({ confirmModalVisible: false })
//         localStorage.saveKey(localStorageKey.USER, { mobile: this.props.userReducer.user.mobile })
//         this.props.cleanLogin()
//         Actions.login()
//     }

//     onPressCancel() {
//         this.setState({ confirmModalVisible: false })
//     }

//     render() {
//         let viewStyle = { backgroundColor: '#00cade' }
//         let { lastVersion, version, url } = this.props.InitializationReducer.getVersion.data
//         let versionArr = version.split('.')
//         let lastVersionArr = lastVersion.split('.')

//        // console.log(this.props.InitializationReducer)
//         return (
//             <Container style={{ flex: 1 }}>
//                 {/* <SearchBar
//                     viewStyle={viewStyle}
//                     onBarcodeReceived={this.onBarcodeReceived}
//                     onPressIcon={this.onPressIcon}
//                     onPressTextInput={this.onPressTextInput}
//                 /> */}
//                 <View style={{ flex: 1 }}>
//                     <List>
//                         <ListItem onPress={() => { Actions.recordList() }}>
//                             <Left>
//                                 <Icon name="md-person" style={{ color: '#00cade' }} />
//                                 <Text>工作记录</Text>
//                             </Left>
//                             <Body></Body>
//                             <Right>
//                                 <Icon name="ios-arrow-forward" />
//                             </Right>
//                         </ListItem>
//                         <ListItem onPress={() => { Actions.password() }}>
//                             <Left>
//                                 <Icon name="ios-lock" style={{ color: '#00cade' }} />
//                                 <Text>修改密码</Text>
//                             </Left>
//                             <Body></Body>
//                             <Right>
//                                 <Icon name="ios-arrow-forward" />
//                             </Right>
//                         </ListItem>
//                         <ListItem style={{ justifyContent: 'space-between' }}>
//                             <Text>版本信息：v{app.version} </Text>
//                             {(versionArr[0] < lastVersionArr[0] || versionArr[1] < lastVersionArr[1] || versionArr[2] < lastVersionArr[2])
//                                 && <Text
//                                     onPress={() => this.linkDownload(url)}
//                                     style={{
//                                         backgroundColor: 'red',
//                                         color: '#fff',
//                                         borderRadius: 5,
//                                         textAlign: 'center',
//                                         paddingHorizontal: 4
//                                     }}>new </Text>}
//                         </ListItem>
//                     </List>
//                     <Button light full style={{ marginTop: 80, marginHorizontal: 15, backgroundColor: '#00cade' }} onPress={this.exitApp.bind(this)}>
//                         <Text style={{ color: '#fff' }}>退出登录</Text>
//                     </Button>
//                 </View>
//                 <ConfirmModal
//                     title='确认退出应用？'
//                     isVisible={this.state.confirmModalVisible}
//                     onPressOk={this.onPressOk.bind(this)}
//                     onPressCancel={this.onPressCancel.bind(this)}
//                 />

//             </Container>

//         )
//     }
// }



// const mapStateToProps = (state) => {
//     return {
//         userReducer: state.LoginReducer,
//         InitializationReducer: state.InitializationReducer
//     }
// }

// const mapDispatchToProps = (dispatch) => ({
//     cleanLogin: () => {
//         dispatch(LoginAction.cleanLogin())
//     }
// })


// export default connect(mapStateToProps, mapDispatchToProps)(Setting)