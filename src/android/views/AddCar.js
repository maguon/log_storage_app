import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Text,
    View,
    ScrollView,
    DatePickerAndroid,
    TouchableHighlight,
} from 'react-native'

import NavBar from '../components/Bar/NavBar'
import { Button, Input, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import * as AddCarAction from '../../actions/AddCarAction'


class AddCar extends Component {
    constructor(props) {
        super(props)

        this.changeAddCarField = this.changeAddCarField.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { AddCarReducer } = nextProps

        /*addCar执行状态*/
        if (AddCarReducer.addCar.isExecStatus == 1) {
            console.log('AddCarReducer.addCar', '开始执行')
        } else if (AddCarReducer.addCar.isExecStatus == 2) {
            console.log('AddCarReducer.addCar', '执行完毕')
            if (AddCarReducer.addCar.isResultStatus == 0) {
                console.log('AddCarReducer.addCar执行成功')

            } else if (AddCarReducer.addCar.isResultStatus == 1) {
                console.log('AddCarReducer.addCar执行错误')

            } else if (AddCarReducer.addCar.isResultStatus == 2) {
                console.log('AddCarReducer.addCar执行失败')

            } else if (AddCarReducer.addCar.isResultStatus == 3) {
                console.log('AddCarReducer.addCar服务器错误')

            }
        }
        /************************************************************************************************/
        return true
    }

    addCar() {

    }


    async showPicker(stateKey, options) {      
        try {
            const { action, year, month, day } = await DatePickerAndroid.open(options)
            if (action !== DatePickerAndroid.dismissedAction) {
                let param = {}
                param[stateKey] = `${year}-${month + 1}-${day}`
                console.log(param)
                this.changeAddCarField(param)
            }
        } catch ({ code, message }) {
            console.warn(`Error in example '${stateKey}': `, message)
        }
    }

    changeAddCarField(param) {
        this.props.changeAddCarField(param)
        //console.log(this.props)
    }


    render() {
        // entrustId makeId makeName orderDate receiveId remark routeEnd routeEndId routeStart routeStartId vin

        let { makeName, vin, entrust, receive, routeStart, routeEnd, orderDate } = this.props.AddCarReducer.addCar.data
        console.log(this.props.AddCarReducer.addCar.data)
        return (
            <View style={{ flex: 1, backgroundColor: '#eee' }}>
                <NavBar title={'车辆入库'} />
                <ScrollView>
                    <View style={{ marginTop: 10, paddingHorizontal: 10, backgroundColor: '#fff' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                <Text style={{ color: 'red' }}>*</Text>
                                <Text style={{ color: '#00cade', marginLeft: 10, fontSize: 18, flex: 1 }}>VIN：</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 4 }}>
                                <Input
                                    onChangeText={(text) => this.changeAddCarField({ vin: text })}
                                    style={{ color: '#00cade', fontSize: 18 }} />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={() => Actions.SelectCarMake({ onSelectMake: this.changeAddCarField })}>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, paddingHorizontal: 10, borderColor: '#dddddd', paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, flex: 3, textAlign: 'right' }}>品牌：</Text>
                                <Text style={{ fontSize: 14, flex: 10 }}>{makeName}</Text>
                                <Icon name='ios-arrow-forward' style={{ fontSize: 18, flex: 1, textAlign: 'right', color: '#7a7a7a' }} />
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={() => Actions.SelectEntrust({ onSelectEntrust: this.changeAddCarField })}>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, paddingHorizontal: 10, borderColor: '#dddddd', paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, flex: 3, textAlign: 'right' }}>委托方：</Text>
                                <Text style={{ fontSize: 14, flex: 10 }}>{entrust}</Text>
                                <Icon name='ios-arrow-forward' style={{ fontSize: 18, flex: 1, textAlign: 'right', color: '#7a7a7a' }} />
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={() => { }}>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, paddingHorizontal: 10, borderColor: '#dddddd', paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, flex: 3, textAlign: 'right' }}>经销商：</Text>
                                <Text style={{ fontSize: 14, flex: 10 }}>{receive}</Text>
                                <Icon name='ios-arrow-forward' style={{ fontSize: 18, flex: 1, textAlign: 'right', color: '#7a7a7a' }} />
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={() => { }}>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, paddingHorizontal: 10, borderColor: '#dddddd', paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, flex: 3, textAlign: 'right' }}>起始城市：</Text>
                                <Text style={{ fontSize: 14, flex: 10 }}>{routeStart}</Text>
                                <Icon name='ios-arrow-forward' style={{ fontSize: 18, flex: 1, textAlign: 'right', color: '#7a7a7a' }} />
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={() => { }}>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, paddingHorizontal: 10, borderColor: '#dddddd', paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, flex: 3, textAlign: 'right' }}>起始地址：</Text>
                                <Text style={{ fontSize: 14, flex: 10 }}>1111111111111111111111111111111</Text>
                                <Icon name='ios-arrow-forward' style={{ fontSize: 18, flex: 1, textAlign: 'right', color: '#7a7a7a' }} />
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={() => { }}>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, paddingHorizontal: 10, borderColor: '#dddddd', paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, flex: 3, textAlign: 'right' }}>目的城市：</Text>
                                <Text style={{ fontSize: 14, flex: 10 }}>{routeEnd}</Text>
                                <Icon name='ios-arrow-forward' style={{ fontSize: 18, flex: 1, textAlign: 'right', color: '#7a7a7a' }} />
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={() => this.showPicker('orderDate', { date: new Date(), mode: 'spinner' })}>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, paddingHorizontal: 10, borderColor: '#dddddd', paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, flex: 3, textAlign: 'right' }}>指令日期：</Text>
                                <Text style={{ fontSize: 14, flex: 10 }}>{orderDate}</Text>
                                <Icon name='md-arrow-dropdown' style={{ fontSize: 18, flex: 1, textAlign: 'right', color: '#7a7a7a' }} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={() => { }}>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, flex: 3, textAlign: 'right' }}>备注：</Text>
                                <Text style={{ fontSize: 14, flex: 10 }}>11111111111</Text>
                                <Icon name='ios-arrow-forward' style={{ fontSize: 18, flex: 1, textAlign: 'right', color: '#7a7a7a' }} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{ marginTop: 10, paddingHorizontal: 20, flexDirection: 'row' }}>
                        <Button block style={{ flex: 1, marginRight: 10, backgroundColor: '#00cade' }} onPress={() => { }}>
                            <Text style={{ color: '#fff' }}>完成并提交</Text>
                        </Button>
                        <Button block style={{ flex: 1, marginLeft: 10, backgroundColor: '#00cade' }} onPress={() => { }}>
                            <Text style={{ color: '#fff' }}>继续入库</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.LoginReducer.user,
        AddCarReducer: state.AddCarReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    changeAddCarField: (param) => {
        dispatch(AddCarAction.changeAddCarField(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCar)