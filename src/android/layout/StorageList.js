import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import SearchBar from '../components/Bar/SearchBar'
import NavBar from '../components/Bar/NavBar'
import StorageListComponent from '../components/StorageList/StorageList'
import Loading from '../components/Loading/Loading'
import {  Actions } from 'react-native-router-flux'

const StorageList = ({ storages, changeSearchVin }) => {
    let viewStyle = { backgroundColor: '#00cade' }
    //console.log(layout)
    return (
        <View style={{ flex: 1 }}>
            {/*<NavBar title={'车辆详情'} />*/}
            <SearchBar
                viewStyle={viewStyle}
                changeSearchVin={changeSearchVin}
                routerPos={Actions.searchCarListForStorage} />
            <StorageListComponent
                storages={storages}
            />
        </View>
    )
}

export default StorageList