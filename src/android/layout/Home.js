import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions
} from 'react-native'
import RecordList from '../components/RecordListForHome/RecordList'
import StorageList from '../components/StorageListForHome/StorageList'
import SearchBar from '../components/Bar/SearchBar'
import { Actions } from 'react-native-router-flux'


const window = Dimensions.get('window')

const Home = ({ storages, recordList, onBarcodeReceived, onPressIcon, onPressTextInput, onPressItem }) => {
    return (
        <View style={{ flex: 1 }}>
            <SearchBar
                onBarcodeReceived={onBarcodeReceived}
                onPressIcon={onPressIcon}
                onPressTextInput={onPressTextInput}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode='auto'>
                <StorageList storages={storages} />
                <RecordList
                    recordList={recordList}
                    onPressItem={onPressItem}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: window.width,
        height: window.width / 16 * 9,
    },
    search: {
        width: window.width,
        position: 'absolute',
        top: 0,
        height: 20
    }
})

export default Home

