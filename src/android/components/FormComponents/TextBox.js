import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'

import { Icon, Input } from 'native-base'
import { validate } from '../../../util/Validator'

const styles = StyleSheet.create({
    containerSytle: {
        marginTop: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    labelStyle: {
        color: '#00cade',
        marginLeft: 10,
        fontSize: 18,
        flex: 1
    },
    messageSytle: {
        color: 'red',
        fontSize: 10
    }
})

const baseStyles = {
    inputStyle: {
        color: '#00cade',
        fontSize: 15,
        flex: 5
    }
}

export default class TextBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            warnMessageList: []
        }
        this.changeValue = this.changeValue.bind(this)
    }

    componentWillMount() {
        this.changeValue(this.props.defaultValue)
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.value) {
            this.setState({ value: nextProps.value })
        } else {
            this.setState({ value: nextProps.defaultValue })
        }
    }

    changeValue(value) {
        //let state = { value: value }
        let state = {}
        if (!this.props.value) {
            state.value = value
        }
        let warnMessageList = validate(value, this.props.verifications)
        if (warnMessageList.length > 0) {
            state.warnMessageList = warnMessageList
        } else {
            state.warnMessageList = []
        }
        this.setState({ ...state })
        this.props.onValueChange(value)
        let flag = !(warnMessageList.length > 0)
        if (this.props.isRequire) {
            flag = value && flag
        }
        this.props.onRequire(flag)
    }

    static defaultProps = {
        verifications: [],
        containerSytle: styles.containerSytle,
        labelStyle: styles.labelStyle,
        inputStyle: baseStyles.inputStyle,
        messageSytle: styles.messageSytle,
        onRequire: (param) => { }
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
            return <Text style={{ color: 'red', textAlign: 'left' }}>*</Text>
        }
        else {
            return
        }
    }

    render() {
        return (

            <View style={this.props.containerSytle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={this.props.labelStyle}>{this.renderTag()}{this.props.title}</Text>
                    <Input
                        placeholder={this.props.placeholder}
                        placeholderTextColor='#ddd'
                        value={this.state.value}
                        onChangeText={(value) => { this.changeValue(value) }}
                        style={this.props.inputStyle} />
                </View>
                {this.renderValidateMessage()}
            </View>

        )
    }
}
