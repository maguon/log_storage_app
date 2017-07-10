import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import CarCamera from '../components/CarCamera/CarCamera'
import * as RouterDirection from '../../util/RouterDirection'
import Select from '../components/FormComponents/Select'
import DateTimePicker from '../components/FormComponents/DateTimePicker'
import * as CarInfoAction from '../../actions/CarInfoAction'
import * as CarListAction from '../../actions/CarListAction'
import RichTextBox from '../components/FormComponents/RichTextBox'

class CarInformation extends Component {
    constructor(props) {
        super(props)
        this.renderImported = this.renderImported.bind(this)
        this.renderExported = this.renderExported.bind(this)
        this.renderNeverImport = this.renderNeverImport.bind(this)
        this.onPressMove = this.onPressMove.bind(this)
        this.onPressImport = this.onPressImport.bind(this)
        this.onPressExport = this.onPressExport.bind(this)
        this.onPressExportOk = this.onPressExportOk.bind(this)
        this.onPressExportCancel = this.onPressExportCancel.bind(this)
        this.state = {
            car: {}
        }
    }

    componentWillMount() {
        if (typeof (this.props.car) == "undefined") {
            this.props.getCarInformation({
                requiredParam: {
                    userId: this.props.user.userId,
                    carId: this.props.carId
                },
                optionalParam: {
                    vin: this.props.vin,
                    active: 1
                }
            })
        }
        else {
            this.props.carInfoInit({
                requiredParam: {
                    userId: this.props.user.userId,
                    carId: this.props.car.id
                },
                car: this.props.car
            })
        }
    }


    componentWillReceiveProps(nextProps) {
        let { CarInfoReducer } = nextProps


        /*getCarInfo 执行状态*/

        if (CarInfoReducer.getCarInfo.isExecStatus == 1) {
            console.log('CarInfoReducer.getCarInfo', '开始执行')
        } else if (CarInfoReducer.getCarInfo.isExecStatus == 2) {
            console.log('CarInfoReducer.getCarInfo', '执行完毕')
            if (CarInfoReducer.getCarInfo.isResultStatus == 0) {
                console.log('CarInfoReducer.getCarInfo', '执行成功')
                this.props.resetGetCarInfo()
            } else if (CarInfoReducer.getCarInfo.isResultStatus == 1) {
                console.log('CarInfoReducer.getCarInfo执行错误', CarInfoReducer.getCarInfo.errorMsg)
                this.props.resetGetCarInfo()
            } else if (CarInfoReducer.getCarInfo.isResultStatus == 2) {
                console.log('CarInfoReducer.getCarInfo', '执行失败')
                this.props.resetGetCarInfo()
            } else if (CarInfoReducer.getCarInfo.isResultStatus == 3) {
                console.log('CarInfoReducer.getCarInfo', '服务器错误')
                this.props.resetGetCarInfo()
            }
        }
        /************************************************************************************************/


        /*updateCarInfo 执行状态*/

        if (CarInfoReducer.updateCarInfo.isExecStatus == 1) {
            console.log('CarInfoReducer.updateCarInfo', '开始执行')
        } else if (CarInfoReducer.updateCarInfo.isExecStatus == 2) {
            console.log('CarInfoReducer.updateCarInfo', '执行完毕')
            if (CarInfoReducer.updateCarInfo.isResultStatus == 0) {
                console.log('CarInfoReducer.updateCarInfo', '执行成功')

                //this.props.resetGetCarInfo()
            } else if (CarInfoReducer.updateCarInfo.isResultStatus == 1) {
                console.log('CarInfoReducer.updateCarInfo执行错误', CarInfoReducer.updateCarInfo.errorMsg)
                //this.props.resetGetCarInfo()
            } else if (CarInfoReducer.updateCarInfo.isResultStatus == 2) {
                console.log('CarInfoReducer.updateCarInfo', '执行失败')
                //this.props.resetGetCarInfo()
            } else if (CarInfoReducer.updateCarInfo.isResultStatus == 3) {
                console.log('CarInfoReducer.updateCarInfo', '服务器错误')
                //this.props.resetGetCarInfo()
            }
        }
        /************************************************************************************************/

        /*exportCar 执行状态*/

        // if (CarInfoReducer.exportCar.isExecStatus == 1) {
        //     console.log('CarInfoReducer.exportCar', '开始执行')
        // } else if (CarInfoReducer.exportCar.isExecStatus == 2) {
        //     console.log('CarInfoReducer.exportCar', '执行完毕')
        //     if (CarInfoReducer.exportCar.isResultStatus == 0) {
        //         console.log('CarInfoReducer.exportCar', '执行成功')
        //         resetExportCar()
        //         removeCar(carId)
        //         removeSearchCar(carId)
        //         this.getCarInfo()

        //     } else if (CarInfoReducer.exportCar.isResultStatus == 1) {
        //         resetExportCar()
        //         console.log('CarInfoReducer.exportCar执行错误', CarInfoReducer.exportCar.failedMsg)

        //     } else if (CarInfoReducer.exportCar.isResultStatus == 2) {
        //         console.log('CarInfoReducer.exportCar', '执行失败')
        //         resetExportCar()
        //     }
        // }
        /************************************************************************************************/

        /*appendCarImage执行状态*/
        // if (CarInfoReducer.appendCarImage.isExecStatus == 1) {
        //     console.log('CarInfoReducer.appendCarImage', '开始执行')
        // } else if (CarInfoReducer.appendCarImage.isExecStatus == 2) {
        //     console.log('CarInfoReducer.appendCarImage', '执行完毕')
        //     if (CarInfoReducer.appendCarImage.isResultStatus == 0) {
        //         console.log('CarInfoReducer.appendCarImage', '执行成功')
        //         resetAppendCarImage()
        //     } else if (CarInfoReducer.appendCarImage.isResultStatus == 1) {
        //         console.log('CarInfoReducer.appendCarImage', '执行错误')
        //         resetAppendCarImage()
        //     } else if (CarInfoReducer.appendCarImage.isResultStatus == 2) {
        //         console.log('CarInfoReducer.appendCarImage', '执行失败')
        //         resetAppendCarImage()
        //     }
        // }
        /************************************************************************************************/

        /*moveCar执行状态*/
        // if (CarInfoReducer.moveCar.isExecStatus == 1) {
        //     console.log('CarInfoReducer.moveCar', '开始执行')
        // } else if (CarInfoReducer.moveCar.isExecStatus == 2) {
        //     console.log('CarInfoReducer.moveCar', '执行完毕')
        //     if (CarInfoReducer.moveCar.isResultStatus == 0) {
        //         console.log('CarInfoReducer.moveCar', '执行成功')
        //         resetMoveCar()
        //         this.getCarInfo()
        //     } else if (CarInfoReducer.moveCar.isResultStatus == 1) {
        //         console.log('CarInfoReducer.moveCar', '执行错误')
        //         resetMoveCar()
        //     } else if (CarInfoReducer.moveCar.isResultStatus == 2) {
        //         console.log('CarInfoReducer.moveCar', '执行失败')
        //         resetMoveCar()
        //     }
        // }
        /************************************************************************************************/



        /*editCarInfo执行状态*/
        // if (CarInfoReducer.editCarInfo.isExecStatus == 1) {
        //     console.log('CarInfoReducer.editCarInfo', '开始执行')
        // } else if (CarInfoReducer.editCarInfo.isExecStatus == 2) {
        //     console.log('CarInfoReducer.editCarInfo', '执行完毕')
        //     if (CarInfoReducer.editCarInfo.isResultStatus == 0) {
        //         console.log('CarInfoReducer.editCarInfo', '执行成功')
        //         this.changeViewType(0)

        //     } else if (CarInfoReducer.editCarInfo.isResultStatus == 1) {
        //         console.log('CarInfoReducer.editCarInfo', '执行错误')

        //     } else if (CarInfoReducer.editCarInfo.isResultStatus == 2) {
        //         console.log('CarInfoReducer.editCarInfo', '执行失败')

        //     }
        // }
        /************************************************************************************************/


        /*updatePlanOutTime执行状态*/
        // if (CarInfoReducer.updatePlanOutTime.isExecStatus == 1) {
        //     console.log('CarInfoReducer.updatePlanOutTime', '开始执行')
        // } else if (CarInfoReducer.updatePlanOutTime.isExecStatus == 2) {
        //     console.log('CarInfoReducer.updatePlanOutTime', '执行完毕')
        //     if (CarInfoReducer.updatePlanOutTime.isResultStatus == 0) {
        //         console.log('CarInfoReducer.updatePlanOutTime', '执行成功')
        //         this.changeViewType(0)
        //         this.getCarInfo()

        //     } else if (CarInfoReducer.updatePlanOutTime.isResultStatus == 1) {
        //         console.log('CarInfoReducer.updatePlanOutTime', '执行错误')

        //     } else if (CarInfoReducer.updatePlanOutTime.isResultStatus == 2) {
        //         console.log('CarInfoReducer.updatePlanOutTime', '执行失败')

        //     }
        // }
        /************************************************************************************************/



        /*importAgain执行状态*/
        // if (CarInfoReducer.carImportAgain.isExecStatus == 1) {
        //     console.log('CarInfoReducer.carImportAgain', '开始执行')
        // } else if (CarInfoReducer.carImportAgain.isExecStatus == 2) {
        //     console.log('CarInfoReducer.carImportAgain', '执行完毕')
        //     if (CarInfoReducer.carImportAgain.isResultStatus == 0) {
        //         console.log('CarInfoReducer.carImportAgain', '执行成功')
        //         this.changeViewType(0)
        //         this.props.resetImportAgain()
        //         this.getCarInfo()
        //     } else if (CarInfoReducer.carImportAgain.isResultStatus == 1) {
        //         console.log('CarInfoReducer.carImportAgain执行错误', CarInfoReducer.carImportAgain)
        //         this.props.resetImportAgain()
        //     } else if (CarInfoReducer.carImportAgain.isResultStatus == 2) {
        //         console.log('CarInfoReducer.carImportAgain', '执行失败')
        //         Alert.alert('入库失败', CarInfoReducer.carImportAgain.failedMsg)
        //         this.props.resetImportAgain()
        //     }
        // }
        /************************************************************************************************/

        /*delImage执行状态*/
        // if (CarInfoReducer.delImage.isExecStatus == 1) {
        //     console.log('CarInfoReducer.delImage', '开始执行')
        // } else if (CarInfoReducer.delImage.isExecStatus == 2) {
        //     console.log('CarInfoReducer.delImage', '执行完毕')
        //     if (CarInfoReducer.delImage.isResultStatus == 0) {
        //         console.log('CarInfoReducer.delImage执行成功')

        //         this.props.resetDelImage()
        //         this.getCarInfo()
        //     } else if (CarInfoReducer.delImage.isResultStatus == 1) {
        //         console.log('CarInfoReducer.delImage执行错误')
        //         this.props.resetDelImage()

        //     } else if (CarInfoReducer.delImage.isResultStatus == 2) {
        //         console.log('CarInfoReducer.delImage执行失败', CarInfoReducer.delImage.failedMsg)
        //         this.props.resetDelImage()
        //     }
        // }
        /************************************************************************************************/

    }

    onPressMove() {

    }

    onPressImport(param) {
        const { vin, id } = this.props.CarInfoReducer.data.car
        let postParam = param
        this.props.importCar({ requiredParam: { userId: this.props.user.userId, carId: id }, OptionalParam: { vin }, postParam })
    }

    onPressExport() {

    }

    onReceivePhote(param) {
        console.log(param)
    }

    onSelect(param) {
        const { vin, make_id, make_name, route_start_id, route_start, base_addr_id, route_end_id, route_end, receive_id, entrust_id, order_date, remark }
            = this.props.CarInfoReducer.data.car
        let putParam = {
            vin: vin,
            makeId: make_id,
            makeName: make_name,
            routeStartId: route_start_id,
            routeStart: route_start,
            baseAddrId: base_addr_id,
            routeEndId: route_end_id,
            routeEnd: route_end,
            receiveId: receive_id,
            entrustId: entrust_id,
            orderDate: order_date,
            remark,
            ...param
        }
        for (item in putParam) {
            if (!putParam[item]) {
                delete putParam[item]
            }
        }
        if (putParam.orderDate) {
            putParam.orderDate = new Date(putParam.orderDate).toLocaleDateString()
        }
        if (route_end_id != putParam.routeEndId) {
            delete putParam['entrustId']
        }
        if (route_start_id != putParam.routeStartId) {
            delete putParam['receiveId']
        }
        this.props.updateCarInfo({
            requiredParam: {
                userId: this.props.user.userId,
                carId: this.props.car.id
            },
            putParam
        })
    }

    onPressExportOk() {

    }

    onPressExportCancel() {

    }

    renderImported() {
        let { vin, make_name, en_short_name, re_short_name, addr_name, route_start, route_end, order_date, storage_name, row, col } = this.props.car
        return (
            <View style={{ flex: 1, backgroundColor: '#eee' }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
                            <Text style={{ color: '#00cade', flex: 4, textAlign: 'right' }}>vin：</Text>
                            <Text style={{ color: '#00cade', flex: 13 }}>{vin}</Text>
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                            <Select
                                isRequire={false}
                                title='品牌：'
                                showList={RouterDirection.selectCarMake(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ makeId: param.id, makeName: param.value }, {})}
                                defaultValue={make_name ? make_name : '请选择'}
                            />
                            <Select
                                isRequire={false}
                                title='委托方：'
                                showList={RouterDirection.selectEntrust(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ entrustId: param.id })}
                                defaultValue={en_short_name ? en_short_name : '请选择'}
                            />
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>

                            <Select
                                isRequire={false}
                                title='起始城市：'
                                showList={RouterDirection.selectCity(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                                defaultValue={route_start ? route_start : '请选择'}
                            />
                            <Select
                                isRequire={false}
                                title='发货地址：'
                                showList={RouterDirection.selectBaseAddr(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ baseAddrId: param.id })}
                                defaultValue={addr_name ? addr_name : '请选择'}
                            />
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                            <Select
                                isRequire={false}
                                title='目的城市：'
                                showList={RouterDirection.selectCity(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ routeEndId: param.id, routeEnd: param.value })}
                                defaultValue={route_end ? route_end : '请选择'}
                            />
                            <Select
                                isRequire={false}
                                title='经销商：'
                                showList={RouterDirection.selectReceive(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ receiveId: param.id })}
                                defaultValue={re_short_name ? re_short_name : '请选择'}
                            />
                            <DateTimePicker
                                isRequire={false}
                                title='指令时间：'
                                defaultValue={order_date ? new Date(order_date).toLocaleDateString() : '请选择'}
                                onValueChange={(param) => this.onSelect({ orderDate: param })}
                            />
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
                            <Text style={{ flex: 4, textAlign: 'right' }}>当前位置：</Text>
                            <Text style={{ flex: 13 }}>{storage_name ? `${storage_name}${row.toString()}-${col.toString()}` : '请选择'}</Text>
                        </View>
                        <CarCamera
                            images={[]}
                            postImage={this.onReceivePhote}
                            showImagePage={Actions.ImagePageForCarInfo} />
                        <Button full onPress={this.onPressMove} style={{ marginHorizontal: 20, marginBottom: 10, backgroundColor: '#00cade' }}>
                            <Text style={{ color: '#fff' }}>移位</Text>
                        </Button>
                        <Button full onPress={this.onPressExport} style={{ marginHorizontal: 20, marginBottom: 10, backgroundColor: '#00cade' }}>
                            <Text style={{ color: '#fff' }}>出库</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }

    renderExported() {
        let { vin, make_name, en_short_name, re_short_name, addr_name, route_start, route_end, order_date } = this.props.car
        return (
            <View style={{ flex: 1, backgroundColor: '#eee' }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
                            <Text style={{ color: '#00cade', flex: 4, textAlign: 'right' }}>vin：</Text>
                            <Text style={{ color: '#00cade', flex: 13 }}>{vin}</Text>
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                            <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ flex: 4, textAlign: 'right' }}>品牌：</Text>
                                <Text style={{ flex: 13 }}>{make_name}</Text>
                            </View>
                            <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ flex: 4, textAlign: 'right' }}>委托方：</Text>
                                <Text style={{ flex: 13 }}>{en_short_name}</Text>
                            </View>
                            <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ flex: 4, textAlign: 'right' }}>经销商：</Text>
                                <Text style={{ flex: 13 }}>{re_short_name}</Text>
                            </View>
                            <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ flex: 4, textAlign: 'right' }}>起始城市：</Text>
                                <Text style={{ flex: 13 }}>{route_start}</Text>
                            </View>
                            <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ flex: 4, textAlign: 'right' }}>发货地址：</Text>
                                <Text style={{ flex: 13 }}>{addr_name}</Text>
                            </View>
                            <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ flex: 4, textAlign: 'right' }}>目的城市：</Text>
                                <Text style={{ flex: 13 }}>{route_end}</Text>
                            </View>
                            <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ flex: 4, textAlign: 'right' }}>指令时间：</Text>
                                <Text style={{ flex: 13 }}>{new Date(order_date).toLocaleDateString()}</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
                            <Text style={{ flex: 4, textAlign: 'right' }}>当前位置：</Text>
                            <Text style={{ flex: 13 }}>已出库</Text>
                        </View>
                        <CarCamera
                            images={[]}
                            postImage={this.onReceivePhote}
                            showImagePage={Actions.ImagePageForCarInfo} />
                        <Button full
                            onPress={() => RouterDirection.selectStorage(this.props.parent)({
                                routerIndex: 0,
                                popName: this.props.name,
                                routerList: [RouterDirection.selectRow(this.props.parent), RouterDirection.selectColumn(this.props.parent)],
                                onSelect: this.onPressImport
                            })}
                            style={{ marginHorizontal: 20, marginBottom: 10, backgroundColor: '#00cade' }}>
                            <Text style={{ color: '#fff' }}>入库</Text>
                        </Button>

                    </View>
                </ScrollView>
            </View>
        )
    }

    renderNeverImport() {
        let { vin, make_name, en_short_name, re_short_name, addr_name, route_start, route_end, order_date } = this.props.car
        return (
            <View style={{ flex: 1, backgroundColor: '#eee' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
                            <Text style={{ color: '#00cade', flex: 4, textAlign: 'right' }}>vin：</Text>
                            <Text style={{ color: '#00cade', flex: 13 }}>{vin}</Text>
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                            <Select
                                isRequire={false}
                                title='品牌：'
                                value={make_name}
                                showList={RouterDirection.selectCarMake(this.props.parent)}
                                onValueChange={(param) => this.onSelect(param)}
                                defaultValue={'请选择'}
                            />
                            <Select
                                isRequire={false}
                                value={en_short_name}
                                title='委托方：'
                                showList={RouterDirection.selectEntrust(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ entrustId: param.id })}
                                defaultValue={'请选择'}
                            /></View>
                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                            <Select
                                isRequire={false}
                                title='起始城市：'
                                value={route_start}
                                showList={RouterDirection.selectCity(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                                defaultValue={'请选择'}
                            />
                            <Select
                                isRequire={false}
                                value={addr_name}
                                title='发货地址：'
                                showList={RouterDirection.selectBaseAddr(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ baseAddrId: param.id })}
                                defaultValue={'请选择'}
                            />
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                            <Select
                                isRequire={false}
                                value={route_end}
                                title='目的城市：'
                                showList={RouterDirection.selectCity(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ routeEndId: param.id, routeEnd: param.value })}
                                defaultValue={'请选择'}
                            />
                            <Select
                                isRequire={false}
                                value={re_short_name}
                                title='经销商：'
                                showList={RouterDirection.selectReceive(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ receiveId: param.id })}
                                defaultValue={'请选择'}
                            />
                            <DateTimePicker
                                isRequire={false}
                                value={new Date(order_date).toLocaleDateString()}
                                title='指令时间：'
                                defaultValue={'请选择'}
                                onValueChange={(param) => this.onSelect({ orderDate: param })}
                            />
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
                            <Text style={{ flex: 4, textAlign: 'right' }}>当前位置：</Text>
                            <Text style={{ flex: 13 }}>未入库</Text>
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                            <RichTextBox
                                isRequire={false}
                                value={addr_name}
                                verifications={[]}
                                title='备注：'
                                defaultValue={'请选择'}
                                onValueChange={(param) => this.onSelect({ remark: param })}
                                showRichText={RouterDirection.richText(this.props.parent)}
                            />
                        </View>
                        <CarCamera
                            images={[]}
                            postImage={this.onReceivePhote}
                            showImagePage={Actions.ImagePageForCarInfo} />
                        <Button
                            block
                            onPress={() => RouterDirection.selectStorage(this.props.parent)({
                                routerIndex: 0,
                                popName: this.props.name,
                                routerList: [RouterDirection.selectRow(this.props.parent), RouterDirection.selectColumn(this.props.parent)],
                                onSelect: this.onPressImport
                            })}
                            style={{ marginHorizontal: 20, marginBottom: 10, backgroundColor: '#00cade' }}>
                            <Text style={{ color: '#fff' }}>入库</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }

    render() {
        console.log(this.props.CarInfoReducer.data)
        return (
            <View style={{ flex: 1 }}>
                {!this.props.car.rel_status && this.renderNeverImport()}
                {this.props.car.rel_status == 1 && this.renderImported()}
                {this.props.car.rel_status == 2 && this.renderExported()}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.LoginReducer.user,
        CarInfoReducer: state.CarInfoReducer,
    }
}

const mapDispatchToProps = (dispatch) => ({
    carInfoInit: (param) => {
        dispatch(CarInfoAction.carInfoInit(param))
    },
    getCarInformation: (param) => {
        dispatch(CarInfoAction.getCarInformation(param))
    },
    resetGetCarInfo: () => {
        dispatch(CarInfoAction.resetGetCarInfo())
    },
    updateCarInfo: (param) => {
        dispatch(CarInfoAction.updateCarInfo(param))
    },
    importCar: (param) => {
        dispatch(CarInfoAction.importCar(param))
    },
    resetImportCar: () => {
        dispatch(CarInfoAction.resetImportCar())
    },
    exportCar: (param) => {
        dispatch(CarInfoAction.exportCar(param))
    },
    resetExportCar: () => {
        dispatch(CarInfoAction.resetExportCar())
    },
    moveCar: (param) => {
        dispatch(CarInfoAction.moveCar(param))
    },
    resetMoveCar: () => {
        dispatch(CarInfoAction.resetMoveCar())
    },
    appendImage: (param) => {
        dispatch(CarInfoAction.appendImage(param))
    },
    resetAppendCarImage: () => {
        dispatch(CarInfoAction.resetAppendCarImage())
    },
    delImage: (param) => {
        dispatch(CarInfoAction.delImage(param))
    },
    resetDelImage: () => {
        dispatch(CarInfoAction.resetDelImage())
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(CarInformation)
