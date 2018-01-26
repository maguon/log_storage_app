import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    InteractionManager
} from 'react-native'
import { Item, Input, ListItem } from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../../../GlobalStyles'

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
    return <Item inlineLabel last={last} style={styles.body} onPress={() => _onPress({ showList, getList, onChange, getListWaiting })}>
        <Item style={styles.item} onPress={() => _onPress({ showList, getList, onChange, getListWaiting })}>
            <Text style={[globalStyles.midText, textStyle]} >{isRequired && <Text style={styles.errText}>*</Text>}{label}</Text>
            <Text style={[globalStyles.midText, textStyle]}>{value.value}</Text>
        </Item>
        {(touched && error) && <View style={styles.errView}>
            {errorComponent}
        </View>}
    </Item>

}

const styles = StyleSheet.create({
    errText: {
        color: 'red'
    },
    body: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingVertical: 15
    },
    item: {
        borderBottomWidth: 0
    },
    errView: {
        marginBottom: 10
    }
})


export default Select