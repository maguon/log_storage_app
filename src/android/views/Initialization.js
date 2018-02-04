import React, { Component } from 'react'
import {
    Linking,
    ToastAndroid,
    Platform,
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Button } from 'native-base'
import SplashScreen from 'react-native-splash-screen'
import * as initializationAction from './InitializationAction'

const window = Dimensions.get('window')
const ImageWidth = window.width
const ImageHeight = window.height

class Initialization extends Component {
    constructor(props) {
        super(props)
        this.linkDownload = this.linkDownload.bind(this)
    }

    componentDidMount() {
        this.props.initApp()
        setTimeout(SplashScreen.hide, 2000)
    }

    linkDownload(url) {
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
    }

    render() {
        const { data, initAPP, loadLocalStorage, validateToken, validateVersion } = this.props.initializationReducer
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <Image source={{ uri: 'init_back' }}
                    style={styles.image}
                />
                {(validateVersion.isResultStatus == 3 || validateToken.isResultStatus == 3) &&
                    <Button block onPress={() => { }} style={styles.button}>
                        <Text style={styles.buttonTiltle}>联系管理员</Text>
                    </Button>}
                {(validateVersion.isResultStatus == 5 || validateToken.isResultStatus == 5) &&
                    <Button block onPress={() => this.initApp()} style={styles.button}>
                        <Text style={styles.buttonTiltle}>重试</Text>
                    </Button>}
                {initAPP.isResultStatus == 2 && data.version.force_update == 1 &&
                    <Button block onPress={() => this.linkDownload(data.version.url)} style={styles.button}>
                        <Text style={styles.buttonTiltle}>立即更新</Text>
                    </Button>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: ImageWidth,
        height: ImageHeight
    },
    buttonTiltle: {
        fontSize: 18,
        color: '#0078a7'
    },
    button: {
        position: 'absolute',
        bottom: 50, width: window.width / 4 * 3,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 25
    }
})



const mapStateToProps = (state) => {
    return {
        initializationReducer: state.initializationReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    initApp: () => {
        dispatch(initializationAction.initApp())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Initialization)



// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import * as InitializationAction from '../../actions/InitializationAction'
// import { Actions } from 'react-native-router-flux'
// import InitializationLayout from '../layout/Initialization'
// import localStorageKey from '../../util/LocalStorageKey'
// import localStorage from '../../util/LocalStorage'
// import { Linking, ToastAndroid } from 'react-native'

// class Initialization extends Component {
//     constructor(props) {
//         super(props)
//         this.linkDownload = this.linkDownload.bind(this)
//         this.validateToken = this.validateToken.bind(this)
//         this.getAppLastVersion = this.getAppLastVersion.bind(this)
//     }

//     componentDidMount() {
//         this.getAppLastVersion()
//     }

//     getAppLastVersion() {
//         this.props.getAppLastVersion({
//             optionalParam: {
//                 app: 1,
//                 type: 1
//             }
//         })
//     }

//     validateToken() {
//         this.props.validateToken()
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

//     componentWillReceiveProps(nextProps) {
//         let { InitializationReducer } = nextProps

//         if (InitializationReducer.valdateToken.isExecStatus == 1) {
//            // console.log('welcome.valdateToken', '开始执行')
//         } else if (InitializationReducer.valdateToken.isExecStatus == 2) {
//             if (InitializationReducer.valdateToken.isResultStatus == 0) {
//                 this.props.resetInitialization()
//                 Actions.mainRoot()
//                // console.log('welcome.valdateToken 执行成功', InitializationReducer.getVersion.data)
//             } else if (InitializationReducer.valdateToken.isResultStatus == 1) {
//                // console.log('welcome.valdateToken 执行错误', InitializationReducer.getVersion.errorMsg)
//             }
//             else if (InitializationReducer.valdateToken.isResultStatus == 2) {
//                 //console.log('welcome.valdateToken 执行失败', InitializationReducer.getVersion.failedMsg)
//                 this.props.resetInitialization()
//                 Actions.mainRoot()
//             }
//         }

//         if (InitializationReducer.getVersion.isExecStatus == 1) {
//            // console.log('welcome.getVersion', '开始执行')
//         } else if (InitializationReducer.getVersion.isExecStatus == 2) {
//             if (InitializationReducer.getVersion.isResultStatus == 0) {
//                 //console.log('welcome.getVersion执行成功', InitializationReducer.getVersion.data)
//                 let versionArr = InitializationReducer.getVersion.data.version.split('.')
//                 let lastVersionArr = InitializationReducer.getVersion.data.lastVersion.split('.')
//                 if (!((versionArr[0] < lastVersionArr[0] || versionArr[1] < lastVersionArr[1] || versionArr[2] < lastVersionArr[2]) && InitializationReducer.getVersion.data.force_update == 1)) {
//                     this.props.validateToken()
//                     this.props.resetGetVersion()
//                 }
//             } else if (InitializationReducer.getVersion.isResultStatus == 1) {
//               //  console.log('welcome.getVersion执行错误', InitializationReducer.getVersion.errorMsg)
//                 ToastAndroid.showWithGravity('获取版本信息失败，请检测网络', ToastAndroid.SHORT, ToastAndroid.CENTER)
//             }
//             else if (InitializationReducer.getVersion.isResultStatus == 2) {
//                // console.log('welcome.getVersion执行失败', InitializationReducer.getVersion.failedMsg)
//                 ToastAndroid.showWithGravity('获取版本信息失败，请检测网络', ToastAndroid.SHORT, ToastAndroid.CENTER)
//             }
//         }


//     }

//     render() {
//         const { version, lastVersion, force_update, url } = this.props.InitializationReducer.getVersion.data
//         const { isExecStatus, isResultStatus } = this.props.InitializationReducer.getVersion
//         return (
//             <InitializationLayout
//                 version={version}
//                 lastVersion={lastVersion}
//                 force_update={force_update}
//                 url={url}
//                 isExecStatus={isExecStatus}
//                 isResultStatus={isResultStatus}
//                 linkDownload={this.linkDownload}
//                 validateToken={this.validateToken}
//                 getAppLastVersion={this.getAppLastVersion}
//             />
//         )
//     }
// }


// const mapStateToProps = (state) => {
//     return {
//         InitializationReducer: state.InitializationReducer
//     }
// }

// const mapDispatchToProps = (dispatch) => ({
//     getAppLastVersion: (param) => {
//         dispatch(InitializationAction.getAppLastVersion(param))
//     },
//     validateToken: () => {
//         dispatch(InitializationAction.validateToken())
//     },
//     resetInitialization: () => {
//         dispatch(InitializationAction.resetInitialization())
//     },
//     resetGetVersion: () => {
//         dispatch(InitializationAction.resetGetVersion())
//     }
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Initialization)



