import React, { Component } from 'react'
import { Text, View, ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Car from '../components/CarList/CarListItem'
import { Actions } from 'react-native-router-flux'
import SearchBar from '../components/Bar/SearchBar'
import CarListComponent from '../components/CarList/CarList'
import SearchVinList from '../components/SearchVinList'
import SearchNoResult from '../components/SearchNoResult'
import NavSearchBar from '../components/Bar/NavSearchBar'

const window = Dimensions.get('window')

const CarList = ({ cars, searchCarListMore, searchVin, changeSearchVin, searchCarList, carInfoPos, vin }) => {

    let searchResultCmpt = cars.length > 0 ? <SearchVinList
        cars={cars}
        searchCarListMore={searchCarListMore}
        carInfoPos={carInfoPos} /> : <SearchNoResult />
    return (
        <View style={{ flex: 1, width: window.width }}>
            <NavSearchBar
                vin={vin}
                changeSearchVin={changeSearchVin}
                searchCarList={searchCarList}
            />
            {searchResultCmpt}
        </View>
    )
}

export default CarList
