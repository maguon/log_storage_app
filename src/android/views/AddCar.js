import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Text,
    View,
    ScrollView,
    DatePickerAndroid,
    TouchableHighlight,
    StyleSheet,
    ToastAndroid
} from 'react-native'

import NavBar from '../components/Bar/NavBar'
import DateTimePicker from '../components/FormComponents/DateTimePicker'
import Select from '../components/FormComponents/Select'
import TextBox from '../components/FormComponents/TextBox'
import RichTextBox from '../components/FormComponents/RichTextBox'
import { Button, Input, Icon, Spinner } from 'native-base'
import { Actions } from 'react-native-router-flux'
import * as AddCarAction from '../../actions/AddCarAction'
import * as RouterDirection from '../../util/RouterDirection'


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
            baseAddrRequire: true,
            remarkRequire: true,
        }
        this.addCar = this.addCar.bind(this)
    }

    componentWillMount() {
        if (this.props.vin) {
            this.props.changeAddCarField({ vin: this.props.vin })
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        let { AddCarReducer } = nextProps
        console.log(AddCarReducer)
        /*addCar执行状态*/
        if (AddCarReducer.addCar.isExecStatus == 1) {
            console.log('AddCarReducer.addCar', '开始执行')
        } else if (AddCarReducer.addCar.isExecStatus == 2) {
            console.log('AddCarReducer.addCar', '执行完毕')
            if (AddCarReducer.addCar.isResultStatus == 0) {
                ToastAndroid.showWithGravity('保存成功', ToastAndroid.SHORT, ToastAndroid.CENTER)
                RouterDirection.importCarCamera(this.props.parent)({ carId: AddCarReducer.addCar.data.id, vin: AddCarReducer.addCar.data.vin })
                console.log('AddCarReducer.addCar执行成功')

            } else if (AddCarReducer.addCar.isResultStatus == 1) {

                console.log('AddCarReducer.addCar执行错误', AddCarReducer.addCar.errorMsg)


            } else if (AddCarReducer.addCar.isResultStatus == 2) {
                ToastAndroid.showWithGravity(AddCarReducer.addCar.failedMsg, ToastAndroid.LONG, ToastAndroid.CENTER)
                this.props.resetAddCarStatus()
                console.log('AddCarReducer.addCar执行失败')

            } else if (AddCarReducer.addCar.isResultStatus == 3) {
                console.log('AddCarReducer.addCar服务器错误')

            }
        }
        /************************************************************************************************/
        return true
    }

    addCar() {
        let param = {
            requiredParam: { userId: this.props.user.userId },
            postParam: { ...this.props.AddCarReducer.addCar.data }
        }
        this.props.addCar(param)
    }


    render() {
        let { makeName, vin, entrust, receive, routeStart, routeEnd, orderDate, remark } = this.props.AddCarReducer.addCar.data
        console.log('this.props.AddCarReducer.addCar.data', this.props.AddCarReducer.addCar.data)
        return (
            <View style={{ flex: 1, backgroundColor: '#eee' }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <TextBox
                            isRequire={true}
                            title='VIN:'
                            defaultValue={this.props.vin ? this.props.vin : ''}
                            verifications={[{
                                type: 'isLength',
                                arguments: [17, 17],
                                message: '长度必须是17位'
                            }]}
                            onValueChange={(param) => this.props.changeAddCarField({ vin: param })}
                            onRequire={(param) => { this.setState({ vinRequire: param }) }}
                            placeholder='请输入vin码'
                        />
                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                            <Select
                                isRequire={true}
                                title='品牌：'
                                showList={RouterDirection.selectCarMake(this.props.parent)}
                                onValueChange={(param) => this.props.changeAddCarField({ makeId: param.id, makeName: param.value })}
                                onRequire={(param) => this.setState({ carMakeRequire: param })}
                                defaultValue='请选择'
                            />
                            <Select
                                isRequire={true}
                                title='委托方：'
                                showList={RouterDirection.selectEntrust(this.props.parent)}
                                onValueChange={(param) => this.props.changeAddCarField({ entrustId: param.id })}
                                onRequire={(param) => this.setState({ entrustRequire: param })}
                                defaultValue='请选择'
                            />
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                            <Select
                                isRequire={false}
                                title='起始城市：'
                                showList={RouterDirection.selectCity(this.props.parent)}
                                onValueChange={(param) => this.props.changeAddCarField({ routeStartId: param.id, routeStart: param.value })}
                                onRequire={(param) => this.setState({ routeStartRequire: param })}
                                defaultValue='请选择'
                            />
                            <Select
                                isRequire={false}
                                title='发货地址：'
                                showList={RouterDirection.selectBaseAddr(this.props.parent)}
                                onValueChange={(param) => this.props.changeAddCarField({ baseAddrId: param.id })}
                                onRequire={(param) => this.setState({ baseAddrRequire: param })}
                                defaultValue='请选择'
                            />
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                            <Select
                                isRequire={false}
                                title='目的城市：'
                                showList={RouterDirection.selectCity(this.props.parent)}
                                onValueChange={(param) => this.props.changeAddCarField({ routeEndId: param.id, routeEnd: param.value })}
                                onRequire={(param) => this.setState({ routeEndRequire: param })}
                                defaultValue='请选择'
                            />
                            <Select
                                isRequire={false}
                                title='经销商：'
                                showList={RouterDirection.selectReceive(this.props.parent)}
                                onValueChange={(param) => this.props.changeAddCarField({ receiveId: param.id })}
                                onRequire={(param) => this.setState({ receiveRequire: param })}
                                defaultValue='请选择'
                            />
                            <DateTimePicker
                                isRequire={false}
                                title='指令时间：'
                                defaultValue='请选择'
                                onValueChange={(param) => this.props.changeAddCarField({ orderDate: param })}
                                onRequire={(param) => { this.setState({ orderDateRequire: param }) }}
                            />
                        </View>

                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                            <RichTextBox
                                isRequire={false}
                                title='备注：'
                                verifications={[]}
                                defaultValue={remark ? remark : ''}
                                onValueChange={(param) => this.props.changeAddCarField({ remark: param })}
                                onRequire={(flag) => { this.setState({ remarkRequire: flag }) }}
                                showRichText={RouterDirection.richText(this.props.parent)}
                            />
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
                                    && this.state.baseAddrRequire
                                    && this.state.remarkRequire)}
                                style={(this.state.orderDateRequire
                                    && this.state.carMakeRequire
                                    && this.state.entrustRequire
                                    && this.state.receiveRequire
                                    && this.state.routeStartRequire
                                    && this.state.routeEndRequire
                                    && this.state.vinRequire
                                    && this.state.baseAddrRequire
                                    && this.state.remarkRequire) ? styles.btnSytle : styles.btnDisabledSytle}
                                onPress={this.addCar}>
                                <Text style={{ color: '#fff' }}>下一步</Text>
                            </Button>
                        </View>
                        {/*<Spinner animating={true} color='#blue' style={{ position: 'absolute', alignSelf: 'center' }} />*/}
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
    },
    addCar: (param) => {
        dispatch(AddCarAction.addCar(param))
    },
    resetAddCarStatus: () => {
        dispatch(AddCarAction.resetAddCarStatus())
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




// verifications={[]}
// {
// type: 'isLength',
// arguments: [8, 23],
// message: '长度必须在20-23之间'
// }