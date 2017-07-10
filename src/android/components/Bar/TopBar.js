import React, { Component } from 'react'
import { Header, Title, Button } from 'native-base'
import { View, StatusBar } from 'react-native'


const NavBar = ({ title, layout }) => {
    return (
        <View androidStatusBarColor='#00cade' style={{ flex: 1, position: 'absolute', top: 0, backgroundColor: '#fff', width: layout.initWidth }}>
            <StatusBar hidden={false} />
            <Header androidStatusBarColor='#00cade' style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#00cade' }}>
                <Title>{title}</Title>
            </Header>
        </View>
    )
}

export default NavBar
