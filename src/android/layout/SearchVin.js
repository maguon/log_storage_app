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

const CarList = ({ vinList, carInfoRouter, vin, onPressIcon, onChangeVin, onEndReached }) => {

    let searchResultCmpt = cars.length > 0 ? <SearchVinList
        vinList={vinList}
        onEndReached={onEndReached}
        carInfoRouter={carInfoRouter} /> : <SearchNoResult />
    return (
        <View style={{ flex: 1, width: window.width }}>
            <NavSearchBar
                vin={vin}
                onChangeVin={onChangeVin}
                onPressIcon={onPressIcon}
            />
            {searchResultCmpt}
        </View>
    )
}

export default CarList
