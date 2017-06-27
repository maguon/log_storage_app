import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    DatePickerAndroid
} from 'react-native'

import { Icon } from 'native-base'
import { validate } from '../../../util/Validator'
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
    containerSytle: {
        borderBottomWidth: 0.5,
        paddingHorizontal: 10,
        borderColor: '#dddddd',
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    labelStyle: {
        fontSize: 14,
        flex: 4,
        textAlign: 'right'
    },
    textStyle: {
        fontSize: 14,
        flex: 12
    },
    messageSytle: {
        color: 'red',
        fontSize: 10
    }
})

const baseStyles = {
    iconSytle: {
        fontSize: 18,
        flex: 1,
        textAlign: 'right',
        color: '#7a7a7a'
    }
}

export default class Select extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            warnMessageList: []
        }
        this.changeValue = this.changeValue.bind(this)
        this.showList = this.showList.bind(this)
    }

    componentWillMount() {
        this.setState({ value: this.props.defaultValue })
    }

    changeValue(param) {
        let state = { value: param.value }
        let warnMessageList = validate(param.value, this.props.verifications)
        if (warnMessageList.length > 0) {
            state.warnMessageList = warnMessageList
        } else {
            state.warnMessageList = []
        }
        this.setState({ ...state })
        this.props.onValueChange(param)
        let flag = !(warnMessageList.length > 0)
        if (this.props.isRequire) {
            flag = !((param.value == this.props.defaultValue) || !flag)
        }
        this.props.onRequire(flag)
    }

    showList() {
        this.props.showList({ onSelect: this.changeValue })
    }

    static defaultProps = {
        verifications: [],
        containerSytle: styles.containerSytle,
        labelStyle: styles.labelStyle,
        textStyle: styles.textStyle,
        iconSytle: baseStyles.iconSytle,
        messageSytle: styles.messageSytle
    }

    renderValidateMessage() {
        let warnMessage
        if (this.state.warnMessageList.length > 0) {
            warnMessage = this.state.warnMessageList.reduce((acc, val) => {
                return `${acc}${val}  `
            }, '')
            warnMessage = (<View style={{ alignSelf: 'flex-start' }}>
                <Text style={this.props.messageSytle}>{warnMessage}</Text>
            </View>)
        }
        return warnMessage
    }

    renderTag() {
        if (this.props.isRequire) {
            return <Text style={{ color: 'red', textAlign: 'left' }}>* </Text>
        }
        else {
            return
        }
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor='rgba(0,0,0,0.1)'
                onPress={this.showList}>
                
                    <View style={this.props.containerSytle}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={this.props.labelStyle}>{this.renderTag()}{this.props.title}</Text>
                            <Text style={this.props.textStyle}>{this.state.value}</Text>
                            <Icon
                                name='ios-arrow-forward'
                                style={this.props.iconSytle} />
                        </View>
                        {this.renderValidateMessage()}
                    </View>
              

            </TouchableHighlight>
        )
    }
}



