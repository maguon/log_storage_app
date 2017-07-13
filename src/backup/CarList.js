import React, { Component } from 'react'
import { Text, View, ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Car from '../components/CarList/CarListItem'
import { Actions } from 'react-native-router-flux'
import SearchBar from '../components/Bar/SearchBar'
import NavBar from '../components/Bar/NavBar'
import CarListComponent from '../components/CarList/CarList'

const window = Dimensions.get('window')

const CarList = ({ cars, getCarListWaiting, getCarListMore, storageName, getCarList, changeSearchVin }) => {
    let viewStyle = { backgroundColor: '#00cade' }
    return (
        <View style={{ flex: 1, width: window.width }}>
            <CarListComponent
                cars={cars}
                getCarListWaiting={getCarListWaiting}
                getCarListMore={getCarListMore}
                getCarList={getCarList}
                storageName={storageName}
            />
        </View>
    )
}

export default CarList
