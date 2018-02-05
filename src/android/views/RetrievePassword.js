import React, { Component } from 'react'
import { Text, View, TextInput, ToastAndroid, Alert, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Icon, Button, Container } from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../GlobalStyles'
import { Field, reduxForm } from 'redux-form'
import SendSMS from '../components/retrievePassword/SendSMS'
import * as retrievePasswordAction from '../../actions/views/RetrievePasswordAction'

const TextBox = props => {
    const { input: { onChange, ...restProps },
        title = '',
        icon = '',
        isRequired = false,
        meta: { error, touched } } = props
    return (
        <View style={styles.itemContainer}>
            <View style={styles.item}>
                <Icon name={icon} style={[styles.itemIcon, globalStyles.styleColor]} />
                <Text style={[globalStyles.midText, styles.itemText]}>{title}</Text>
                <TextInput
                    style={[globalStyles.midText, styles.itemInput]}
                    onChangeText={onChange}
                    {...restProps }
                    placeholder='请输入验证码'
                    underlineColorAndroid='transparent'
                    placeholderTextColor='#ccc' />
            </View >
            {touched && (error && <View>
                <Text style={[globalStyles.smallText,styles.warnText]}>{error}</Text>
            </View>)}
        </View>

    )
}


const RetrievePassword = props => {
    const { handleSubmit } = props
    return (
        <Container style={styles.container}>
            <View>
                <SendSMS />
                <Field name='vCode' component={TextBox} title='验证码：' icon='ios-key' />
                <Field name='firstPassword' component={TextBox} title='新密码：' icon='ios-lock' />
                <Field name='secondPassword' component={TextBox} title='确认密码：' icon='ios-lock' />
            </View>
            <View>
                <Button
                    full
                    style={globalStyles.styleBackgroundColor}
                    onPress={handleSubmit}>
                    <Text style={{ color: '#fff' }}>确认</Text>
                </Button>

            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
        justifyContent: 'space-between'
    },
    itemContainer: {
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    itemIcon: {
        fontSize: 14
    },
    itemText: {
        marginLeft: 5
    },
    itemInput: {
        flex: 1,
        marginLeft: 5
    },
    warnText: {
        marginBottom: 10,
        color: 'red'
    }
})

const mapStateToProps = (state) => {
    return {
        retrievePasswordReducer: state.retrievePasswordReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    onSubmit: () => {
        dispatch(retrievePasswordAction.retrieve())
    }
})

const validate = values => {
    const errors = { vCode: null, firstPassword: null, secondPassword: null }
    if (!values.vCode) {
        errors.vCode = '必填'
    }

    if (!values.firstPassword) {
        errors.firstPassword = '必填'
    }

    if (!values.secondPassword) {
        errors.secondPassword = '必填'
    }
    return errors
}

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'retrievePasswordForm',
        validate
    })(RetrievePassword))



// import React, { Component } from 'react'
// import { Text, View, TextInput, ToastAndroid ,Alert} from 'react-native'
// import { connect } from 'react-redux'
// import { Icon, Button } from 'native-base'
// import * as RetrievePasswordAction from '../../actions/views/RetrievePasswordAction'
// import { Actions } from 'react-native-router-flux'

// class RetrievePassword extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             firstPassword: '',
//             secondPassword: '',
//             vCode: '',
//             mobile: '',
//             countDownTime: 0,
//             isStop:false
//         }
//         this.getVCode = this.getVCode.bind(this)
//         this.countDown = this.countDown.bind(this)
//         this.retrieve = this.retrieve.bind(this)
//     }

//     componentWillReceiveProps(nextProps) {
//         const { getVCode, retrieve } = nextProps.retrievePasswordReducer
//         if (getVCode.isResultStatus == 2) {
//             this.props.resetGetVCode()
//         }else if (getVCode.isResultStatus == 3) {
//             //ToastAndroid.show(`获取验证码失败：${getVCode.errorMsg}`, ToastAndroid.SHORT)
//             Alert.alert(
//                 '找回密码',
//                 `获取验证码失败：${getVCode.errorMsg}!`,
//                 [
//                     { text: '确认', onPress: () => { } }
//                 ]
//             )
//             this.setState({ isStop: true })
//             this.props.resetGetVCode()   
//         } else if (getVCode.isResultStatus == 4) {
//             //ToastAndroid.show(`获取验证码失败：${getVCode.failedMsg}`, ToastAndroid.SHORT)
//             Alert.alert(
//                 '找回密码',
//                 `获取验证码失败：${getVCode.failedMsg}!`,
//                 [
//                     { text: '确认', onPress: () => { } }
//                 ]
//             )
//             this.setState({ isStop: true })            
//             this.props.resetGetVCode()            
//         }


//         if (retrieve.isResultStatus == 2) {
//            // ToastAndroid.show(`密码重置成功！`, ToastAndroid.SHORT)
//            Alert.alert(
//             '找回密码',
//             '密码找回成功！',
//             [
//                 { text: '确认', onPress: () => { } }
//             ]
//         ) 
//            this.props.resetRetrieve()
//             //Actions.pop()
//         } else if (retrieve.isResultStatus == 3) {
//             //ToastAndroid.show(`获取验证码失败：${retrieve.errorMsg}`, ToastAndroid.SHORT)
//             Alert.alert(
//                 '找回密码',
//                 `获取验证码失败：${retrieve.errorMsg}!`,
//                 [
//                     { text: '确认', onPress: () => { } }
//                 ]
//             )
//             this.props.resetRetrieve()
//         } else if (retrieve.isResultStatus == 4) {
//             //ToastAndroid.show(`获取验证码失败：${retrieve.failedMsg}`, ToastAndroid.SHORT)
//             Alert.alert(
//                 '找回密码',
//                 `获取验证码失败：${retrieve.failedMsg}!`,
//                 [
//                     { text: '确认', onPress: () => { } }
//                 ]
//             )
//             this.props.resetRetrieve()
//         }
//     }

//     getVCode() {
//         if (this.state.mobile) {
//             this.countDown(60)
//             this.props.getVCode({
//                 requiredParam: {
//                     mobile: this.state.mobile
//                 }
//             })
//         } else {
//             //ToastAndroid.show('请输入手机号', ToastAndroid.SHORT)
//             Alert.alert(
//                 '找回密码',
//                 `请输入手机号!`,
//                 [
//                     { text: '确认', onPress: () => { } }
//                 ]
//             )
//         }
//     }

//     retrieve() {
//         if (this.state.firstPassword === this.state.secondPassword) {
//             this.props.retrieve({
//                 requiredParam: {
//                     mobile: this.state.mobile
//                 },
//                 putParam: {
//                     captcha: this.state.vCode,
//                     password: this.state.firstPassword
//                 }
//             })
//         } else {
//             //ToastAndroid.show('两次输入的密码不同，请重新输入', ToastAndroid.SHORT)
//             Alert.alert(
//                 '找回密码',
//                 `两次输入的密码不同，请重新输入!`,
//                 [
//                     { text: '确认', onPress: () => { } }
//                 ]
//             )
//         }

//     }

//     countDown(time) {
//         if(!this.state.isStop){
//             this.setState({ countDownTime: time })
//             if (time > 0) {
//                 setTimeout(() => {
//                     this.countDown(time - 1)
                    
//                 }, 1000)
//             }
//         }else{
//             this.setState({ isStop:false,countDownTime:0})
//             return
//         }
//     }

//     render() {
//         return (
//             <View style={{ flex: 1, justifyContent: 'space-between', padding: 10 }}>
//                 <View>
//                     <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee' }}>
//                         <Icon name='ios-phone-portrait' style={{ color: '#00cade', fontSize: 14 }} />
//                         <Text style={{ fontSize: 11, marginLeft: 5 }}>手机号：</Text>
//                         <TextInput
//                             style={{ flex: 1, fontSize: 11, marginLeft: 5, color: '#888' }}
//                             onChangeText={(text) => this.setState({ mobile: text })}
//                             value={this.state.mobile}
//                             placeholder='请输入手机号'
//                             underlineColorAndroid='transparent'
//                             placeholderTextColor='#ccc' />
//                         <Button small disabled={this.state.countDownTime > 0} style={this.state.countDownTime > 0 ? { alignSelf: 'center', marginLeft: 5 } : { alignSelf: 'center', marginLeft: 5, backgroundColor: '#00cade' }} onPress={this.getVCode}>
//                             <Text style={{ color: '#fff', fontSize: 11 }}>发送验证码 {this.state.countDownTime ? `(${this.state.countDownTime})` : ''}</Text>
//                         </Button>
//                     </View>
//                     <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee' }}>
//                         <Icon name='ios-key' style={{ color: '#00cade', fontSize: 14 }} />
//                         <Text style={{ fontSize: 11, marginLeft: 5 }}>验证码：</Text>
//                         <TextInput
//                             style={{ flex: 1, fontSize: 11, marginLeft: 5, color: '#888' }}
//                             onChangeText={(text) => this.setState({ vCode: text })}
//                             value={this.state.vCode}
//                             placeholder='请输入验证码'
//                             underlineColorAndroid='transparent'
//                             placeholderTextColor='#ccc' />
//                     </View>
//                     <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee' }}>
//                         <Icon name='ios-lock' style={{ color: '#00cade', fontSize: 14 }} />
//                         <Text style={{ fontSize: 11, marginLeft: 5 }}>新密码：</Text>
//                         <TextInput
//                             secureTextEntry={true}
//                             style={{ flex: 1, fontSize: 11, marginLeft: 5, color: '#888' }}
//                             onChangeText={(text) => this.setState({ firstPassword: text })}
//                             value={this.state.firstPassword}
//                             placeholder='请输入新密码'
//                             underlineColorAndroid='transparent'
//                             placeholderTextColor='#ccc' />
//                     </View>
//                     <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee' }}>
//                         <Icon name='ios-lock' style={{ color: '#00cade', fontSize: 14 }} />
//                         <Text style={{ fontSize: 11, marginLeft: 5 }}>确认密码：</Text>
//                         <TextInput
//                             secureTextEntry={true}
//                             style={{ flex: 1, fontSize: 11, marginLeft: 5, color: '#888' }}
//                             onChangeText={(text) => this.setState({ secondPassword: text })}
//                             value={this.state.secondPassword}
//                             placeholder='请再次输入新密码'
//                             underlineColorAndroid='transparent'
//                             placeholderTextColor='#ccc' />
//                     </View>
//                 </View>
//                 <View>
//                     <Button
//                         full
//                         disabled={!(this.state.firstPassword && this.state.secondPassword && this.state.vCode && this.state.mobile)}
//                         style={this.state.firstPassword && this.state.secondPassword && this.state.vCode && this.state.mobile ? { backgroundColor: '#00cade' } : {}} onPress={this.retrieve}>
//                         <Text style={{ color: '#fff' }}>确认</Text>
//                     </Button>
//                     <Button
//                         full
//                         style={ { backgroundColor: '#00cade',marginTop:10 }} onPress={Actions.pop}>
//                         <Text style={{ color: '#fff' }}>返回</Text>
//                     </Button>
//                 </View>
//             </View>
//         )
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         retrievePasswordReducer: state.RetrievePasswordReducer
//     }
// }

// const mapDispatchToProps = (dispatch) => ({
//     getVCode: (param) => {
//         dispatch(RetrievePasswordAction.getVCode(param))
//     },
//     retrieve: (param) => {
//         dispatch(RetrievePasswordAction.retrieve(param))
//     },
//     resetGetVCode:()=>{
//         dispatch(RetrievePasswordAction.resetGetVCode())
//     },
//     resetRetrieve:()=>{
//         dispatch(RetrievePasswordAction.resetRetrieve())
//     }
// })

// export default connect(mapStateToProps, mapDispatchToProps)(RetrievePassword)