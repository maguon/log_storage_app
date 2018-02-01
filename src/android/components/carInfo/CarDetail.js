import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'

import { Icon, Container } from 'native-base'
import globalStyles from '../../GlobalStyles'
import moment from 'moment'

const CarDetail = props => {
    const { car: { vin, make_name, en_short_name, re_short_name, addr_name, route_start, route_end, order_date, remark } } = props
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={[globalStyles.largeText, globalStyles.styleColor, styles.headerText]}><Text style={styles.ItemTilte}>vin：</Text>{vin ? `${vin}` : ''}</Text>
            </View>
            <View style={styles.item}>
                <Text style={globalStyles.midText}><Text style={styles.ItemTilte}>品牌：</Text>{make_name ? `${make_name}` : ''}</Text>
            </View>
            <View style={styles.item}>
                <Text style={globalStyles.midText}><Text style={styles.ItemTilte}>委托方：</Text>{en_short_name ? `${en_short_name}` : ''}</Text>
            </View>
            <View style={styles.item}>
                <Text style={globalStyles.midText}><Text style={styles.ItemTilte}>经销商：</Text>{re_short_name ? `${re_short_name}` : ''}</Text>
            </View>
            <View style={styles.item}>
                <Text style={globalStyles.midText}><Text style={styles.ItemTilte}>起始城市：</Text>{route_start ? `${route_start}` : ''}</Text>
            </View>
            <View style={styles.item}>
                <Text style={globalStyles.midText}><Text style={styles.ItemTilte}>发货地址：</Text>{addr_name ? `${addr_name}` : ''}</Text>
            </View>
            <View style={styles.item}>
                <Text style={globalStyles.midText}><Text style={styles.ItemTilte}>目的城市：</Text>{route_end ? `${route_end}` : ''}</Text>
            </View>
            <View style={styles.item}>
                <Text style={globalStyles.midText}><Text style={styles.ItemTilte}>指令时间：</Text>{order_date ? `${moment(order_date).format('YYYY-MM-DD')}` : ''}</Text>
            </View>
            <View style={styles.item}>
                <Text style={globalStyles.midText}><Text style={styles.ItemTilte}>当前位置：</Text>{addr_name ? `${addr_name}` : ''}</Text>
            </View>
            <View style={styles.item}>
                <Text style={globalStyles.midText}><Text style={styles.ItemTilte}>备注：</Text>{remark ? `${remark}` : ''}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderColor: '#777',
        paddingVertical: 10
    },
    itemContainer: {
        paddingVertical: 5
    },
    item: {
        paddingVertical: 5,
        flexDirection: 'row'
    },
    headerIcon: {
        fontSize: 25
    },
    headerText: {
        paddingLeft: 10
    },
    ItemTilte: {
        fontWeight: 'bold'
    },
    container: {
        margin: 15
    }
})


export default CarDetail