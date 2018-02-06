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
import { Button, Input, Icon, Spinner, Container, Content } from 'native-base'
import { Field, reduxForm, getFormValues } from 'redux-form'
import * as selectMakeAction from '../../actions/components/select/selectMakeAction'
import * as selectCityAction from '../../actions/components/select/selectCityAction'
import * as selectEntrustAction from '../../actions/components/select/selectEntrustAction'
import * as selectBaseAddrAction from '../../actions/components/select/selectBaseAddrAction'
import * as selectReceiveAction from '../../actions/components/select/selectReceiveAction'
import * as addCarAction from '../../actions/views/AddCarAction'
import Select from '../components/share/form/Select'
import DatePicker from '../components/share/form/DatePicker'
import TextBox from '../components/share/form/TextBox'
import RichTextBox from '../components/share/form/RichTextBox'
import globalStyles, { styleColor } from '../GlobalStyles'
import { Actions } from 'react-native-router-flux'
import * as routerDirection from '../../util/RouterDirection'
import DisposableList from './form/select/DisposableList'
import { requiredObj, required } from '../../util/Validator'

const validateRequiredObj = requiredObj('必选')
const validateRequired = required('必选')

const AddCar = props => {

    const { getMakeList, getMakeListWaiting, getCityList, getCityListWaiting, getEntrustList, getEntrustListWaiting, getBaseAddrList,
        getBaseAddrListWaiting, getReceiveList, getReceiveListWaiting, parent, handleSubmit,
        addCarFormValues = { routeStart: {}, routeEnd: {}, make: {}, entrust: {}, baseAddr: {}, receive: {} } } = props
    return (
        <Container>
            <Content showsVerticalScrollIndicator={false}>
                <View style={{marginLeft:15}}>
                <Field name='vin'
                    component={TextBox}
                    isRequired={true}
                    validate={[validateRequired]}
                    label='vin:'
                    textStyle={[globalStyles.largeText, globalStyles.styleColor]} />
                </View>
                    
                <Field
                    label='品牌：'
                    name='make'
                    component={Select}
                    isRequired={true}
                    validate={[validateRequiredObj]}
                    getList={getMakeList}
                    getListWaiting={getMakeListWaiting}
                    showList={param => {
                        return routerDirection.listCennectNav(parent)({
                            mapStateToProps: makeMapStateToProps,
                            mapDispatchToProps: makeMapDispatchToProps,
                            List: DisposableList,
                            title: '品牌',
                            ...param
                        })
                    }} />
                <Field
                    label='委托方：'
                    name='entrust'
                    component={Select}
                    isRequired={true}
                    validate={[validateRequiredObj]}
                    getList={getEntrustList}
                    getListWaiting={getEntrustListWaiting}
                    showList={param => {
                        return routerDirection.listCennectNav(parent)({
                            mapStateToProps: entrustMapStateToProps,
                            mapDispatchToProps: entrustMapDispatchToProps,
                            List: DisposableList,
                            title: '委托方',
                            ...param
                        })
                    }} />
                <Field
                    label='发运地：'
                    name='routeStart'
                    component={Select}
                    isRequired={true}
                    validate={[validateRequiredObj]}
                    getList={getCityList}
                    getListWaiting={getCityListWaiting}
                    showList={param => {
                        return routerDirection.listCennectNav(parent)({
                            mapStateToProps: cityMapStateToProps,
                            mapDispatchToProps: cityMapDispatchToProps,
                            List: DisposableList,
                            title: '发运地',
                            ...param
                        })
                    }} />
                {addCarFormValues.routeStart.id && <Field
                    label='发货地址：'
                    name='baseAddr'
                    component={Select}
                    isRequired={true}
                    validate={[validateRequiredObj]}
                    getList={() => getBaseAddrList({ cityId: addCarFormValues.routeStart.id })}
                    getListWaiting={getBaseAddrListWaiting}
                    showList={param => {
                        return routerDirection.listCennectNav(parent)({
                            mapStateToProps: baseAddrMapStateToProps,
                            mapDispatchToProps: baseAddrMapDispatchToProps,
                            List: DisposableList,
                            title: '发货地址',
                            ...param
                        })
                    }} />}

                <Field
                    label='目的地：'
                    name='routeEnd'
                    component={Select}
                    getList={getCityList}
                    getListWaiting={getCityListWaiting}
                    showList={param => {
                        return routerDirection.listCennectNav(parent)({
                            mapStateToProps: cityMapStateToProps,
                            mapDispatchToProps: cityMapDispatchToProps,
                            List: DisposableList,
                            title: '目的地',
                            ...param
                        })
                    }} />
                {addCarFormValues.routeEnd.id && <Field
                    label='经销商：'
                    name='receive'
                    component={Select}
                    getList={() => getReceiveList({ cityId: addCarFormValues.routeEnd.id })}
                    getListWaiting={getReceiveListWaiting}
                    showList={param => {
                        return routerDirection.listCennectNav(parent)({
                            mapStateToProps: receiveMapStateToProps,
                            mapDispatchToProps: receiveMapDispatchToProps,
                            List: DisposableList,
                            title: '经销商',
                            ...param
                        })
                    }} />}
                <Field label='指令时间：' name='orderDate' component={DatePicker} />
                <Field label='备注：' name='remark' component={RichTextBox} />
            </Content>
        </Container>
    )
}



const makeMapStateToProps = (state) => {
    return {
        listReducer: {
            Action: state.selectMakeReducer.getMakeList,
            data: {
                list: state.selectMakeReducer.data.makeList.map(item => {
                    return { id: item.id, value: item.make_name }
                })
            }
        }
    }
}

const makeMapDispatchToProps = (dispatch) => ({

})

const cityMapStateToProps = (state) => {
    return {
        listReducer: {
            Action: state.selectCityReducer.getCityList,
            data: {
                list: state.selectCityReducer.data.cityList.map(item => {
                    return { id: item.id, value: item.city_name }
                })
            }
        }
    }
}

const cityMapDispatchToProps = (dispatch) => ({

})

const entrustMapStateToProps = (state) => {
    return {
        listReducer: {
            Action: state.selectEntrustReducer.getEntrustList,
            data: {
                list: state.selectEntrustReducer.data.entrustList.map(item => {
                    return { id: item.id, value: item.short_name }
                })
            }
        }
    }
}

const entrustMapDispatchToProps = (dispatch) => ({

})

const baseAddrMapStateToProps = (state) => {
    return {
        listReducer: {
            Action: state.selectBaseAddrReducer.getBaseAddrList,
            data: {
                list: state.selectBaseAddrReducer.data.baseAddrList.map(item => {
                    return { id: item.id, value: item.addr_name }
                })
            }
        }
    }
}

const baseAddrMapDispatchToProps = (dispatch) => ({

})


const receiveMapStateToProps = (state) => {
    return {
        listReducer: {
            Action: state.selectReceiveReducer.getReceiveList,
            data: {
                list: state.selectReceiveReducer.data.receiveList.map(item => {
                    return { id: item.id, value: item.short_name }
                })
            }
        }
    }
}

const receiveMapDispatchToProps = (dispatch) => ({

})


const mapStateToProps = (state,ownProps) => {
    //console.log('ownProps',ownProps)
    return {
        loginReducer: state.loginReducer,
        addCarFormValues: getFormValues('addCarForm')(state),
        initialValues: {
            make: {},
            routeStart: {},
            routeEnd: {},
            entrust: {},
            baseAddr: {},
            receive: {},
            vin: ownProps.vin
        },
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMakeList: () => {
        dispatch(selectMakeAction.getMakeList())
    },
    getMakeListWaiting: () => {
        dispatch(selectMakeAction.getMakeListWaiting())
    },
    getCityList: () => {
        dispatch(selectCityAction.getCityList())
    },
    getCityListWaiting: () => {
        dispatch(selectCityAction.getCityListWaiting())
    },
    getEntrustList: () => {
        dispatch(selectEntrustAction.getEntrustList())
    },
    getEntrustListWaiting: () => {
        dispatch(selectEntrustAction.getEntrustListWaiting())
    },
    getBaseAddrList: param => {
        dispatch(selectBaseAddrAction.getBaseAddrList(param))
    },
    getBaseAddrListWaiting: () => {
        dispatch(selectBaseAddrAction.getBaseAddrListWaiting())
    },
    getReceiveList: param => {
        dispatch(selectReceiveAction.getReceiveList(param))
    },
    getReceiveListWaiting: () => {
        dispatch(selectReceiveAction.getReceiveListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'addCarForm',
        onSubmit: (values, dispatch, props) => {
            const { parent } = props
            dispatch(addCarAction.addCar(values, parent))
        }
    })(AddCar)
)


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


                /* <TextBox
                            isRequire={true}
                            title='VIN:'
                            value={vin}
                            defaultValue={vin}
                            verifications={[{
                                type: 'isLength',
                                arguments: [17, 17],
                                message: '长度必须是17位'
                            }]}
                            onValueChange={(param) => this.props.changeAddCarField({ vin: param })}
                            onRequire={(param) => { this.setState({ vinRequire: param }) }}
                            placeholder='请输入vin码'
                        /> */


   /* <Select
                                isRequire={true}
                                title='品牌：'
                                value={makeName}
                                showList={RouterDirection.selectCarMake(this.props.parent)}
                                onValueChange={(param) => this.props.changeAddCarField({ makeId: param.id, makeName: param.value })}
                                onRequire={(param) => {this.setState({ carMakeRequire: param })}}
                                defaultValue='请选择'
                            />
                            <Select
                                isRequire={true}
                                title='委托方：'
                                value={entrust}
                                showList={RouterDirection.selectEntrust(this.props.parent)}
                                onValueChange={(param) => this.props.changeAddCarField({ entrustId: param.id, entrust: param.value })}
                                onRequire={(param) => this.setState({ entrustRequire: param })}
                                defaultValue='请选择'
                            /> */
                                            /* <Select
                                isRequire={true}
                                title='起始城市：'
                                value={routeStart}
                                showList={RouterDirection.selectCity(this.props.parent)}
                                onValueChange={(param) => this.props.changeAddCarField({ routeStartId: param.id, routeStart: param.value })}
                                onRequire={(param) => this.setState({ routeStartRequire: param })}
                                defaultValue='请选择'
                            />
                            <Select
                                isRequire={true}
                                title='发货地址：'
                                value={baseAddr}
                                isEnable={routeStartId ? true : false}
                                showList={(param) => RouterDirection.selectBaseAddr(this.props.parent)({ cityId: routeStartId, ...param })}
                                onValueChange={(param) => this.props.changeAddCarField({ baseAddrId: param.id, baseAddr: param.value })}
                                onRequire={(param) => this.setState({ baseAddrRequire: param })}
                                defaultValue='请选择'
                            /> */
                                                /* <Select
                                isRequire={false}
                                title='目的城市：'
                                value={routeEnd}
                                showList={RouterDirection.selectCity(this.props.parent)}
                                onValueChange={(param) => this.props.changeAddCarField({ routeEndId: param.id, routeEnd: param.value })}
                                onRequire={(param) => this.setState({ routeEndRequire: param })}
                                defaultValue='请选择'
                            />
                            <Select
                                isRequire={false}
                                title='经销商：'
                                value={receive}
                                isEnable={routeEndId ? true : false}
                                showList={(param) => RouterDirection.selectReceive(this.props.parent)({ cityId: routeEndId, ...param })}
                                onValueChange={(param) => this.props.changeAddCarField({ receiveId: param.id, receive: param.value })}
                                onRequire={(param) => this.setState({ receiveRequire: param })}
                                defaultValue='请选择'
                            />
                            <DateTimePicker
                                isRequire={false}
                                title='指令时间：'
                                value={orderDate}
                                defaultValue='请选择'
                                onValueChange={(param) => this.props.changeAddCarField({ orderDate: param })}
                                onRequire={(param) => { this.setState({ orderDateRequire: param }) }}
                            /> */
                /* <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                    <RichTextBox
                                isRequire={false}
                                title='备注：'
                                verifications={[{
                                    type: 'isLength',
                                    arguments: [0, 300],
                                    message: '长度0-300位'
                                }]}
                                value={remark}
                                defaultValue={'请填写'}
                                onValueChange={(param) => this.props.changeAddCarField({ remark: param })}
                                onRequire={(flag) => { this.setState({ remarkRequire: flag }) }}
                                showRichText={RouterDirection.richText(this.props.parent)}
                            />
                </View> */

    // }

    // class AddCar extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         orderDateRequire: true,
    //         carMakeRequire: false,
    //         entrustRequire: false,
    //         receiveRequire: true,
    //         routeStartRequire: false,
    //         routeEndRequire: true,
    //         vinRequire: false,
    //         baseAddrRequire: false,
    //         remarkRequire: true,
    //     }
    //     this.addCar = this.addCar.bind(this)
    // }

    // componentWillMount() {
    //     if (this.props.vin) {
    //         this.props.changeAddCarField({ vin: this.props.vin })
    //     }
    // }

    // componentWillUnmount() {
    //     this.props.resetAddCar()
    // }

    // componentWillReceiveProps(nextProps) {
    //     let { AddCarReducer } = nextProps
    //     /*addCar执行状态*/
    //     if (AddCarReducer.addCar.isExecStatus == 1) {
    //         //  console.log('AddCarReducer.addCar', '开始执行')
    //     } else if (AddCarReducer.addCar.isExecStatus == 2) {
    //         // console.log('AddCarReducer.addCar', '执行完毕')
    //         if (AddCarReducer.addCar.isResultStatus == 0) {
    //             ToastAndroid.showWithGravity('保存成功', ToastAndroid.SHORT, ToastAndroid.CENTER)
    //             RouterDirection.importCarCamera(this.props.parent)({ carId: AddCarReducer.addCar.data.id, vin: AddCarReducer.addCar.data.vin })
    //             this.props.resetAddCar()
    //             this.setState({ carMakeRequire: false, entrustRequire: false, routeStartRequire: false, vinRequire: false, baseAddrRequire: false })
    //             //   console.log('AddCarReducer.addCar执行成功')
    //         } else if (AddCarReducer.addCar.isResultStatus == 1) {
    //             // console.log('AddCarReducer.addCar执行错误', AddCarReducer.addCar.errorMsg)
    //             this.props.resetAddCarStatus()
    //         } else if (AddCarReducer.addCar.isResultStatus == 2) {
    //             ToastAndroid.showWithGravity(AddCarReducer.addCar.failedMsg, ToastAndroid.LONG, ToastAndroid.CENTER)
    //             this.props.resetAddCarStatus()
    //             // console.log('AddCarReducer.addCar执行失败')
    //         } else if (AddCarReducer.addCar.isResultStatus == 3) {
    //             //console.log('AddCarReducer.addCar服务器错误')
    //             this.props.resetAddCarStatus()
    //         }
    //     }
    //     /************************************************************************************************/
    // }

    // addCar() {
    //     let param = {
    //         requiredParam: { userId: this.props.user.userId },
    //         postParam: { ...this.props.AddCarReducer.addCar.data }
    //     }
    //     this.props.addCar(param)
    // }


    // render() {
    // con { makeName, vin, entrust, receive, routeStart, routeEnd, orderDate, routeStartId, routeEndId, baseAddr, remark } = this.props.


//     <View style={{ marginVertical: 10, paddingHorizontal: 20, flexDirection: 'row' }}>
//     <Button
//         block
//          disabled={!(this.state.orderDateRequire
//             && this.state.carMakeRequire
//             && this.state.entrustRequire
//             && this.state.receiveRequire
//             && this.state.routeStartRequire
//             && this.state.routeEndRequire
//             && this.state.vinRequire
//             && this.state.baseAddrRequire
//             && this.state.remarkRequire)}
//         style={(this.state.orderDateRequire
//             && this.state.carMakeRequire
//             && this.state.entrustRequire
//             && this.state.receiveRequire
//             && this.state.routeStartRequire
//             && this.state.routeEndRequire
//             && this.state.vinRequire
//             && this.state.baseAddrRequire
//             && this.state.remarkRequire) ? styles.btnSytle : styles.btnDisabledSytle} 
//         onPress={handleSubmit}>
//         <Text style={{ color: '#fff' }}>下一步</Text>
//     </Button>
// </View>



                /*<Spinner animating={true} color='#blue' style={{ position: 'absolute', alignSelf: 'center' }} />*/