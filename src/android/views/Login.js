import React, { Component } from 'react'
import { View, Image, Dimensions, ToastAndroid, StatusBar, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Button, Icon, Form, Item, Text, Label, Input, Left, Body, Right, Title, List, ListItem, Container } from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../GlobalStyles'
import { Field, reduxForm } from 'redux-form'
import * as loginAction from '../../actions/views/LoginAction'
import localStorageKey from '../../util/LocalStorageKey'
import localStorage from '../../util/LocalStorage'

const window = Dimensions.get('window')
const ImageWidth = window.width
const ImageHeight = window.width / 9 * 16

const TextBox = props => {
    const { iconName, placeholderText, input: { onChange, ...restProps }, secureTextEntry = false } = props
    return (
        <Item rounded style={styles.item}>
            <Icon active name={iconName} style={styles.itemIcon} />
            <Input placeholder={placeholderText}
                placeholderTextColor='#9ECEF1'
                selectionColor='#9ECEF1'
                style={[globalStyles.largeText, styles.input]}
                onChangeText={onChange}
                secureTextEntry={secureTextEntry}
                {...restProps} />
        </Item>
    )
}

const Login = props => {
    const { login, loginReducer ,initialValues,formReducer} = props 
    // console.log(loginReducer)
    // console.log(formReducer)
    // console.log('initialValues',initialValues)
    return (
        <Container style={styles.container}>
            <StatusBar hidden={true} />
            <Image
                source={{ uri: 'login_back' }}
                style={styles.backgroundImage} />
            <View style={styles.connectContainer}>
                <View style={styles.logoContainer}>
                    <Image
                        source={{ uri: 'honya_logo_144' }}
                        style={styles.logo} />
                </View>
                <View>
                    <Image
                        source={{ uri: 'app_name' }}
                        style={styles.appname} />
                </View>
                <View style={styles.formContainer}>
                    <Field
                        name='mobile'
                        iconName='md-person'
                        placeholderText='请输入用户名'
                        component={TextBox} />
                    <Field
                        name='password'
                        secureTextEntry={true}
                        iconName='md-lock'
                        placeholderText='请输入密码'
                        component={TextBox} />
                    <Button style={[styles.itemButton, globalStyles.styleBackgroundColor]}
                        onPress={login}>
                        <Text style={[globalStyles.midText, styles.buttonTittle]}>登录</Text>
                    </Button>
                </View>
                <TouchableOpacity style={styles.linkButton} onPress={() => Actions.retrievePassword()}>
                    <Text style={[globalStyles.midText, styles.linkButtonTittle]}>忘记密码？</Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage: {
        width: window.width,
        height: window.width / 9 * 16
    },
    item: {
        backgroundColor: 'rgba(255,255,255,0.4)',
        width: window.width / 4 * 3,
        borderWidth: 0,
        marginTop: 20
    },
    itemIcon: {
        color: '#9ECEF1',
        marginLeft: 10
    },
    itemButton: {
        marginTop: 50,
        width: window.width / 4 * 3,
        borderRadius: 25,
        justifyContent: 'center'
    },
    input: {
        color: '#9ECEF1'
    },
    buttonTittle: {
        color: '#fff'
    },
    linkButton: {
        alignSelf: 'flex-end',
        paddingTop: 10,
        paddingRight: 10
    },
    linkButtonTittle: {
        color: '#9ECEF1'
    },
    connectContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer: {
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,1)',
        borderColor: 'rgba(255,255,255,0.5)',
        borderWidth: 20,
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 80,
        height: 80
    },
    appname: {
        width: 171,
        height: 38,
        marginTop: 20
    },
    formContainer: {
        marginTop: 30
    }
})


const mapStateToProps = (state) => {
    return {
        loginReducer: state.loginReducer,
        initialValues: state.loginReducer.data.user,
        formReducer:state.form
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: () => {
        dispatch(loginAction.login())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'loginForm'
    })(Login))