import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as welcomeAction from '../../actions/WelcomeAction'
import { Actions } from 'react-native-router-flux'
import WelcomeLayout from '../layout/Welcome'
import localStorageKey from '../../util/LocalStorageKey'
import localStorage from '../../util/LocalStorage'
import { Linking, ToastAndroid } from 'react-native'

class Welcome extends Component {
    constructor(props) {
        super(props)
        this.linkDownload = this.linkDownload.bind(this)
        this.validateToken = this.validateToken.bind(this)
        this.getAppLastVersion = this.getAppLastVersion.bind(this)
    }

    componentDidMount() {
        this.getAppLastVersion()
    }

    getAppLastVersion() {
        this.props.getAppLastVersion({
            optionalParam: {
                app: 1,
                type: 1
            }
        })
    }

    validateToken() {
        this.props.validateToken()
    }

    linkDownload(url) {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url)
            } else {
                return Linking.openURL(url)
            }
        }).catch(err => console.error('An error occurred', err))
    }

    componentWillReceiveProps(nextProps) {
        let { welcomeReducer } = nextProps
        if (welcomeReducer.getVersion.isExecStatus == 1) {
            console.log('welcome.getVersion', '开始执行')
        } else if (welcomeReducer.getVersion.isExecStatus == 2) {
            if (welcomeReducer.getVersion.isResultStatus == 0) {
                console.log('welcome.getVersion执行成功', welcomeReducer.getVersion.data)
            } else if (welcomeReducer.getVersion.isResultStatus == 1) {
                console.log('welcome.getVersion执行错误', welcomeReducer.getVersion.errorMsg)
                ToastAndroid.showWithGravity('获取版本信息失败，请检测网络', ToastAndroid.SHORT, ToastAndroid.CENTER)
            }
            else if (welcomeReducer.getVersion.isResultStatus == 2) {
                console.log('welcome.getVersion执行失败', welcomeReducer.getVersion.failedMsg)
                ToastAndroid.showWithGravity('获取版本信息失败，请检测网络', ToastAndroid.SHORT, ToastAndroid.CENTER)
            }
        }

        if (welcomeReducer.valdateToken.isExecStatus == 1) {
            console.log('welcome.valdateToken', '开始执行')
        } else if (welcomeReducer.valdateToken.isExecStatus == 2) {
            if (welcomeReducer.valdateToken.isResultStatus == 0) {
                Actions.mainRoot()
                console.log('welcome.valdateToken 执行成功', welcomeReducer.getVersion.data)
            } else if (welcomeReducer.valdateToken.isResultStatus == 1) {

                console.log('welcome.valdateToken 执行错误', welcomeReducer.getVersion.errorMsg)
            }
            else if (welcomeReducer.valdateToken.isResultStatus == 2) {
                Actions.mainRoot()
                console.log('welcome.valdateToken 执行失败', welcomeReducer.getVersion.failedMsg)
            }
        }
    }

    render() {
        const { version, lastVersion, force_update, url } = this.props.welcomeReducer.getVersion.data
        const { isExecStatus, isResultStatus } = this.props.welcomeReducer.getVersion
        console.log('this.props.welcomeReducer.getVersion.data', this.props.welcomeReducer.getVersion)
        return (
            <WelcomeLayout
                version={version}
                lastVersion={lastVersion}
                force_update={force_update}
                url={url}
                isExecStatus={isExecStatus}
                isResultStatus={isResultStatus}
                linkDownload={this.linkDownload}
                validateToken={this.validateToken}
                getAppLastVersion={this.getAppLastVersion}
            />
        )
    }
}


const mapStateToProps = (state) => {
    return {
        welcomeReducer: state.WelcomeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAppLastVersion: (param) => {
        dispatch(welcomeAction.getAppLastVersion(param))
    },
    validateToken: () => {
        dispatch(welcomeAction.validateToken())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)



