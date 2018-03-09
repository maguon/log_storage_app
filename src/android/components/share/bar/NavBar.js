import React, { Component } from 'react'
import { Text, View, StatusBar, StyleSheet, Dimensions } from 'react-native'
import { Header, Title, Button, Icon, Right, Left, Body, Label } from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../../GlobalStyles'

const { width } = Dimensions.get('window')

const NavBar = props => {
    const { title, RightButton, LeftButton, parent } = props
    return (
        <View style={[styles.container, { width: width }]}>
            <StatusBar hidden={false} />
            <Header
                androidStatusBarColor={styleColor}
                style={[styles.header, globalStyles.styleBackgroundColor]}>
                {LeftButton && <Left style={styles.left}>
                    <LeftButton />
                </Left>}
                <Body style={styles.body}>
                    <Title style={[globalStyles.xlText, { color: '#fff' }]}>{title}</Title>
                </Body>
                <Right style={styles.right}>
                    {RightButton && <RightButton parent={parent} />}
                </Right>
            </Header>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        backgroundColor: '#fff'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    left: {
        flex: 1
    },
    body: {
        flex: 4
    },
    right: {
        flex: 2
    }
})

export default NavBar