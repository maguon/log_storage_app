import React, { Component } from 'react'
import { Text, View, ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import SearchVinList from '../components/SearchVinList'
import NavSearchBar from '../components/Bar/NavSearchBar'

const window = Dimensions.get('window')

const SearchVin = ({ vinList, vin, onPressItem, onPressIcon, onChangeSearchText, onEndReached }) => {
    return (
        <View style={{ flex: 1, width: window.width }}>
            <NavSearchBar
                ref='navSearchBar'
                vin={vin}
                onChangeSearchText={onChangeSearchText}
                onPressIcon={onPressIcon}
            />
            <SearchVinList
                vinList={vinList}
                onEndReached={onEndReached}
                onPressItem={onPressItem}
            />
        </View>
    )
}

export default SearchVin
