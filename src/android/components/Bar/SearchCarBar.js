import React, { Component } from 'react'
import { Header, Title, Button, Icon, Right, Left, Body, Label, Item, Input, Text } from 'native-base'
import { View, StatusBar, StyleSheet, TextInput } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import globalStyles, { styleColor } from '../../GlobalStyles'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
// import * as searchCarAction from '../../../views/searchCar/SearchCarAction'

const TextBox = props => {
    const { input: { onChange, ...restProps }, getCarList } = props
    return (
        <View style={styles.inputContainer}>
            <TextInput
                underlineColorAndroid='transparent'
                placeholder='请输入至少6位VIN码片段'
                placeholderTextColor='#fff'
                style={[globalStyles.midText, styles.input]}
                onChangeText={text => {
                    onChange(text)
                    text.length > 5 && getCarList(text)
                }}
                {...restProps} />
            <Icon name="ios-search" style={[globalStyles.textColor, styles.inputIcon]} />
        </View>
    )
}

const SearchCarBar = props => {
    const { title, layout, getCarList } = props
    return (
        <View style={[styles.container, { width: layout.initWidth }]}>
            <StatusBar hidden={false} />
            <Header style={globalStyles.styleBackgroundColor}>
                <Left style={styles.left}>
                    <Button transparent onPress={Actions.pop}>
                        <Icon name="ios-qr-scanner" style={styles.leftIcon} />
                    </Button>
                </Left>
                <Body style={styles.body}>
                    <Field name='vinCode' component={TextBox} getCarList={getCarList} />
                </Body>
                <Right>
                    <Button transparent onPress={Actions.pop}>
                        <Icon name="ios-menu" style={styles.leftIcon} />
                    </Button>
                </Right>
            </Header>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    left: {
        flex: 1
    },
    body: {
        flex: 5
    },
    leftIcon: {
        color: '#fff'
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 3
    },
    input: {
        flex: 1,
        paddingVertical: 0
    },
    inputIcon: {
        paddingHorizontal: 5,
        color:'#fff'
    }
})

const mapStateToProps = (state, ownProps) => {
    return {
        // initialValues: ownProps.initParam
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarList: () => {
        //     dispatch(searchCarAction.getCarList(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'SearchCar'
    })(SearchCarBar)) 