import React, { Component } from 'react'
import {
    Text,
    View,
    Button,
    TouchableHighlight,
    StyleSheet,
    Image
} from 'react-native'
import { Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'

const CarListItem = ({ car, showCarInfo }) => {
    let { plan_out_time, make_name, storage_name, vin, colour, enter_time, real_out_time, col, row } = car
    return (
        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={() => {
            showCarInfo({ car })
        }}>
            <View style={{ paddingVertical: 5, marginHorizontal: 20, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#f1f1f1' }}>
                <View style={{ flexDirection: 'column', flex: 14 }}>
                    <View>
                        <Text style={{ color: '#00cade', fontSize: 16 }}>vin:{vin}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 5, alignItems: 'center' }}>
                        <View style={{ flex: 1 }}>
                            <Image source={{ uri: 'import_car' }} style={{ width: 12, height: 12 }} />
                        </View>
                        <View style={{ flex: 7 }}>
                            <Text style={{ textAlign: 'left', fontSize: 12 }}>{enter_time ? new Date(enter_time).toLocaleString() : '未入库'}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Image source={{ uri: 'planexport_car' }} style={{ width: 12, height: 12 }} />
                        </View>
                        <View style={{ flex: 4 }}>
                            <Text style={{ textAlign: 'left', fontSize: 12 }}>{real_out_time ? new Date(real_out_time).toLocaleDateString() : '未出库'}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 5, alignItems: 'center' }}>
                        <View style={{ flex: 1 }}>
                            <Icon name='ios-car' style={{ fontSize: 15, color: '#cccccc' }} type="ionicons" />
                        </View>
                        <View style={{ flex: 5, flexDirection: 'row', alignItems: 'center' }}>
                            <Text>{make_name ? make_name : '无'}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Icon name='ios-pin' style={{ fontSize: 15, color: '#cccccc' }} type="ionicons" />
                        </View>
                        <View style={{ flex: 6 }}>
                            <Text>{row && col ? `${storage_name}  ${row}-${col}` : '已出库'}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, alignSelf: 'center'}}>
                    <Icon name='ios-arrow-forward' style={{ fontSize: 20, color: '#888888', textAlign: 'right' }} type="ionicons" />
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderBottomWidth: 1,
        height: 40,
        alignItems: 'center',
        borderColor: '#dddddd'
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentText: {
        textAlign: 'center',
        color: '#999999',
        fontSize: 12
    },
    contentTag: {
        width: 5,
        height: 5,
        backgroundColor: '#f7656a',
        borderRadius: 3
    },
    contentAction: {
        color: '#cbd0d3'
    }
})

export default CarListItem