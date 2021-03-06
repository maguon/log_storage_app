/**
* Created by rbyu on 2017/5/11.
*/
import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, Image } from 'react-native'
import { Button, Icon } from 'native-base'

const RecordListItem = ({ record }) => {

    let created_on = new Date(record.timez)
    let date = created_on.toLocaleDateString()
    let time = created_on.toLocaleTimeString()

    let textStyle
    let op
    let opImgUri = { uri: 'icon_note_in' }

    if (record.op == '11') {
        op = '入库'
        textStyle = styles.inText
        opImgUri.uri = 'icon_note_in'
    }
    else if (record.op == '12') {
        op = '移位'
        textStyle = styles.moveText
        opImgUri.uri = 'icon_note_move'
    }
    else if (record.op == '13') {
        opImgUri.uri = 'icon_note_out'
        op = '出库'
        textStyle = styles.outText
    }
    else if (record.op == '10') {
        op = '新增'
        opImgUri.uri = 'icon_note_new'
        textStyle = styles.newText
    }
    else if (record.op == '19') {
        op = '直送'
        opImgUri.uri = 'icon_note_send'
        textStyle = styles.sendText
    }

    return (

        <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <View>
                    <Text style={{ fontSize: 10 }}>{date}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 14 }}>{time}</Text>
                </View>
            </View>
            <View style={{ flex: 1, alignSelf: 'flex-start', justifyContent: 'flex-start' }}>
                <Image source={opImgUri} style={{ width: 25, height: 65 }} />
            </View>
            <View style={{ flex: 5, justifyContent: 'center' }}>
                <Text style={{ fontSize: 12 }}>
                    <Text style={{ fontStyle: 'italic' }}>[{record.name}]</Text>
                    {record.content}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inText: {
        color: '#00bfd8'
    },
    outText: {
        color: '#f7666b'
    },
    moveText: {
        color: '#ffa700'
    },
    newText: {
        color: '#90cf69'
    },
    sendText: {
        color: '#b576f1'
    }
})

export default RecordListItem