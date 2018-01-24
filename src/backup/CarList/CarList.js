import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    RefreshControl,
    FlatList,
    Button,
    //Animated,
    TouchableHighlight
} from 'react-native'
import { Icon } from 'native-base'
import CarListItem from './CarListItem'
import { Actions } from 'react-native-router-flux'
// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const window = Dimensions.getcallback('window')

const CarList = ({ cars, getCarListWaiting, getCarListMore, storageName }) => {
    let viewStyle = { backgroundColor: '#00cade' }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                colors={'#00cade'}
                refreshing={getCarListWaiting}
                onEndReached={getCarListMore}
                data={cars}
                onEndReachedThreshold={1}
                renderItem={({ item }) => <CarListItem car={item} key={item.r_id} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        flexDirection: "row",
        height: 50,
        backgroundColor: '#f0f0f0',

        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#dddddd'
    },
    title: {
        textAlign: 'center'
    },
    load: {
        alignSelf: 'center',
        marginVertical: 5
    }
})

export default CarList
