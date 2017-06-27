import React, { Component } from 'react'
import { Text, View, ScrollView, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import NavBar from '../components/Bar/NavBar'
import * as SelectCityAction from '../../actions/SelectCityAction'
import { Input, Button } from 'native-base'


export default class RichText extends Component {
    constructor(props) {
        super(props)
        this.state = {
            richTextValue: ''
        }
        this.onGetValue = this.onGetValue.bind(this)
    }
    componentWillMount() {

        this.setState({ richTextValue: this.props.richTextValue })
    }


    onGetValue(param) {
        this.props.onGetValue(param)
        Actions.pop()
    }



    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#eee' }}>
                <NavBar title={'填写备注'} />
                <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 10 }}>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            multiline={true}
                            style={{ flex: 1, textAlignVertical: 'top', backgroundColor: '#fff' }}
                            underlineColorAndroid="transparent"
                            value={this.state.richTextValue}
                            onChangeText={(text) => this.setState({ richTextValue: text })} />
                    </View>
                    <View style={{ flex: 1, marginTop:10 }}>
                        <Button block style={{ backgroundColor: '#00cade' }} onPress={() => { this.onGetValue({ remark: this.state.richTextValue }) }} >
                            <Text style={{ color: '#fff' }}>确定</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}

