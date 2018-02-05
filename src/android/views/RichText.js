import React, { Component } from 'react'
import { Text, View, ScrollView, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
// import NavBar from '../components/Bar/NavBar'
import { Input, Button } from 'native-base'
import { validate } from '../../util/Validator'


const styles = StyleSheet.create({
    messageSytle: {
        color: 'red',
        fontSize: 10
    }
})


const basestyles = {
    btnSytle: {

        backgroundColor: '#00cade'
    },
    btnDisabledSytle: {

        backgroundColor: '#888888'
    }
}

export default class RichText extends Component {
    constructor(props) {
        super(props)
        this.state = {
            richTextValue: '',
            warnMessageList: [],
            btnFlag: false
        }
        this.onGetValue = this.onGetValue.bind(this)
        this.onChangeValue = this.onChangeValue.bind(this)
        this.renderValidateMessage = this.renderValidateMessage.bind(this)
    }
    componentWillMount() {
        this.setState({ richTextValue: this.props.richTextValue })
    }

    componentDidMount() {

        let warnMessageList = validate(this.state.richTextValue, this.props.verifications)

        if ((this.state.richTextValue == this.props.richTextValue) && (warnMessageList.length > 0))
            this.setState({ btnFlag: false })
        else this.setState({ btnFlag: true })
    }

    onChangeValue(value) {
        let state = { richTextValue: value }
        let warnMessageList = validate(value, this.props.verifications)
        if (warnMessageList.length > 0) {
            state.warnMessageList = warnMessageList
        } else {
            state.warnMessageList = []
        }
        state.btnFlag = !(warnMessageList.length > 0)
        this.setState({ ...state })

    }


    onGetValue(param) {
        param.flag = true
        this.props.onGetValue(param)
        Actions.pop()
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


    static defaultProps = {
        verifications: [],

        messageSytle: styles.messageSytle
    }


    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#eee' }}>
                <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 10 }}>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            multiline={true}
                            style={{ flex: 1, textAlignVertical: 'top', backgroundColor: '#fff' }}
                            underlineColorAndroid="transparent"
                            value={this.state.richTextValue}
                            onChangeText={(text) => this.onChangeValue(text)} />
                    </View>
                    {this.renderValidateMessage()}
                    <View style={{ flex: 1, marginTop: 10 }}>
                        <Button
                            block
                            disabled={!this.state.btnFlag}
                            style={!this.state.btnFlag ? basestyles.btnDisabledSytle : basestyles.btnSytle}
                            onPress={() => { this.onGetValue({ value: this.state.richTextValue }) }} >
                            <Text style={{ color: '#fff' }}>确定</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}

