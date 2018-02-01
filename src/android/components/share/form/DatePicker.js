import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    InteractionManager,
    DatePickerAndroid,
    Dimensions
} from 'react-native'
import { Item, Input, ListItem, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../../../GlobalStyles'

const { width } = Dimensions.get('window')
const margin = 15

const showPicker = async (options, onChange) => {
    try {
        const { action, year, month, day } = await DatePickerAndroid.open(options)
        if (action !== DatePickerAndroid.dismissedAction) {
            onChange(`${year}-${month + 1}-${day}`)
        }
    } catch ({ code, message }) {
        console.warn(`Error in example : `, message)
    }
}

const DatePicker = props => {
    let { input: { onChange, value, ...restProps },
        label = '',
        secureTextEntry = false,
        isRequired = false,
        textStyle = {},
        itemStyle = {},
        meta: { error, touched } } = props
    return (
        <TouchableOpacity style={styles.body} onPress={() => showPicker({ date: new Date(), mode: 'spinner' }, onChange)}>
            <View style={[styles.item, itemStyle]}>
                <Text style={[globalStyles.midText, textStyle, {}]} >{isRequired && <Text style={styles.errText}>*</Text>}{label}{value}</Text>
                <Icon name='ios-arrow-down-outline' color='#777' fontSize={15} style={{ fontSize: 18, color: '#777' }} />
            </View>
            {touched && (error && <View style={styles.errView}>
                <Text style={[globalStyles.smallText, styles.errText]}>{`*${error}`}</Text>
            </View>)}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    errText: {
        color: 'red'
    },
    body: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: margin,
        paddingVertical: margin,
        paddingRight: margin,
        borderBottomWidth: 0.3,
        borderColor: '#ccc'
    },
    item: {
        width: width - margin * 2,
        borderBottomWidth: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    errView: {
        marginTop: margin
    }
})

export default DatePicker
