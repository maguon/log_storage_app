import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Text,
    View,
    ScrollView,
    DatePickerAndroid,
    TouchableHighlight,
    StyleSheet
} from 'react-native'

import NavBar from '../components/Bar/NavBar'
import DateTimePicker from '../components/FormComponents/DateTimePicker'
import Select from '../components/FormComponents/Select'
import TextBox from '../components/FormComponents/TextBox'
import { Button, Input, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import * as AddCarAction from '../../actions/AddCarAction'


class AddCar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderDateRequire: true,
            carMakeRequire: false,
            entrustRequire: false,
            receiveRequire: true,
            routeStartRequire: true,
            routeEndRequire: true,
            vinRequire: false,
            baseAddrRequire: false
        }
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
        // verifications={[]}
        // {
        // type: 'isLength',
        // arguments: [8, 23],
        // message: '长度必须在20-23之间'
        // }
    }



    changeAddCarField(param) {
        this.props.changeAddCarField(param)
    }

    render() {
        // entrustId makeId makeName orderDate receiveId remark routeEnd routeEndId routeStart routeStartId vin

        let { makeName, vin, entrust, receive, routeStart, routeEnd, orderDate, remark } = this.props.AddCarReducer.addCar.data
        console.log(this.props.AddCarReducer.addCar.data)
        return (
            <View style={{ flex: 1, backgroundColor: '#eee' }}>
                <NavBar title={'车辆入库'} />
                <ScrollView>
                    <TextBox
                        isRequire={true}
                        title='VIN:'
                        defaultValue=''
                        verifications={[{
                            type: 'isLength',
                            arguments: [6, 17],
                            message: '长度必须在6-17之间'
                        }]}
                        onValueChange={(param) => this.changeAddCarField({ vin: param })}
                        onRequire={(param) => { this.setState({ vinRequire: param }) }}
                        placeholder='请输入vin码'
                    />
                    <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                        <Select
                            isRequire={true}
                            title='品牌：'
                            showList={Actions.SelectCarMake}
                            onValueChange={(param) => this.changeAddCarField({ makeId: param.id, makeName: param.value })}
                            onRequire={(param) => this.setState({ carMakeRequire: param })}
                            defaultValue='请选择'
                        />
                        <Select
                            isRequire={true}
                            title='委托方：'
                            showList={Actions.SelectEntrust}
                            onValueChange={(param) => this.changeAddCarField({ entrustId: param.id, entrust: param.value })}
                            onRequire={(param) => this.setState({ entrustRequire: param })}
                            defaultValue='请选择'
                        />
                        <Select
                            isRequire={false}
                            title='经销商：'
                            showList={Actions.SelectReceive}
                            onValueChange={(param) => this.changeAddCarField({ receiveId: param.id, receive: param.value })}
                            onRequire={(param) => this.setState({ receiveRequire: param })}
                            defaultValue='请选择'
                        />
                        <Select
                            isRequire={false}
                            title='起始城市：'
                            showList={Actions.SelectCity}
                            onValueChange={(param) => this.changeAddCarField({ routeStartId: param.id, routeStart: param.value })}
                            onRequire={(param) => this.setState({ routeStartRequire: param })}
                            defaultValue='请选择'
                        />
                        <Select
                            isRequire={false}
                            title='起始地址：'
                            showList={Actions.SelectBaseAddr}
                            onValueChange={(param) => this.changeAddCarField({ baseAddrId: param.id, baseAddr: param.value })}
                            onRequire={(param) => this.setState({ baseAddrRequire: param })}
                            defaultValue='请选择'
                        />
                        <Select
                            isRequire={false}
                            title='目的城市：'
                            showList={Actions.SelectCity}
                            onValueChange={(param) => this.changeAddCarField({ routeEndId: param.id, routeEnd: param.value })}
                            onRequire={(param) => this.setState({ routeEndRequire: param })}
                            defaultValue='请选择'
                        />
                        <DateTimePicker
                            isRequire={false}
                            title='指令时间：'
                            defaultValue='请选择'
                            onValueChange={(param) => this.changeAddCarField({ orderDate: param })}
                            onRequire={(param) => { this.setState({ orderDateRequire: param }) }}
                        />
                    </View>
                    <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={() => Actions.RichText({ onGetValue: this.changeAddCarField, richTextValue: remark })}>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, flex: 3, textAlign: 'right' }}>备注：</Text>
                                <Text style={{ fontSize: 14, flex: 10 }}>{remark}</Text>
                                <Icon name='ios-arrow-forward' style={{ fontSize: 18, flex: 1, textAlign: 'right', color: '#7a7a7a' }} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{ marginVertical: 10, paddingHorizontal: 20, flexDirection: 'row' }}>
                        <Button
                            block
                            disabled={!(this.state.orderDateRequire
                                && this.state.carMakeRequire
                                && this.state.entrustRequire
                                && this.state.receiveRequire
                                && this.state.routeStartRequire
                                && this.state.routeEndRequire
                                && this.state.vinRequire
                                && this.state.baseAddrRequire)}
                            style={(this.state.orderDateRequire
                                && this.state.carMakeRequire
                                && this.state.entrustRequire
                                && this.state.receiveRequire
                                && this.state.routeStartRequire
                                && this.state.routeEndRequire
                                && this.state.vinRequire
                                && this.state.baseAddrRequire) ? styles.btnSytle : styles.btnDisabledSytle}
                            onPress={() => { console.log(22222) }}>
                            <Text style={{ color: '#fff' }}>完成并提交</Text>
                        </Button>
                        <Button
                            block
                            disabled={!(this.state.orderDateRequire
                                && this.state.carMakeRequire
                                && this.state.entrustRequire
                                && this.state.receiveRequire
                                && this.state.routeStartRequire
                                && this.state.routeEndRequire
                                && this.state.vinRequire
                                && this.state.baseAddrRequire)}
                            style={(this.state.orderDateRequire
                                && this.state.carMakeRequire
                                && this.state.entrustRequire
                                && this.state.receiveRequire
                                && this.state.routeStartRequire
                                && this.state.routeEndRequire
                                && this.state.vinRequire
                                && this.state.baseAddrRequire) ? styles.btnSytle : styles.btnDisabledSytle}
                            onPress={() => { console.log(11111) }}>
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


const styles = {
    btnSytle: {
        flex: 1,
        marginLeft: 10,
        backgroundColor: '#00cade'
    },
    btnDisabledSytle: {
        flex: 1,
        marginLeft: 10,
        backgroundColor: '#888888'
    }
}