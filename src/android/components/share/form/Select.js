import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    InteractionManager,
    Dimensions
} from 'react-native'
import { Item, Input, ListItem, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../../../GlobalStyles'

const { width } = Dimensions.get('window')
const margin = 15

const _onPress = ({ showList, getList, onChange, getListWaiting }) => {
    getListWaiting()
    showList({
        onSelect: (param) => {
            Actions.pop()
            InteractionManager.runAfterInteractions(() => {
                onChange(param)
            })
        }
    })
    InteractionManager.runAfterInteractions(getList)
}

const Select = props => {
    const { input: { onChange, value, ...restProps },
        label = '',
        last = false,
        secureTextEntry = false,
        isRequired = false,
        textStyle = {},
        getList,
        showList,
        getListWaiting,
        meta: { error, touched } } = props
    const errorComponent = error ? error.map((item, i) => <Text key={i} style={[globalStyles.smallText, styles.errText]}>{`*${item}`}</Text>) : undefined
    return (
        <TouchableOpacity style={styles.body} onPress={() => _onPress({ showList, getList, onChange, getListWaiting })}>
            <View style={styles.item} onPress={() => _onPress({ showList, getList, onChange, getListWaiting })}>
                <Text style={[globalStyles.midText, textStyle, {}]} >{isRequired && <Text style={styles.errText}>*</Text>}{label}{value.value}</Text>
                <Icon name='ios-arrow-forward-outline' color='#777' fontSize={15} style={{ fontSize: 18, color: '#777' }} />
            </View>
            {(touched && error) && <View style={styles.errView}>
                {errorComponent}
            </View>}
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


export default Select