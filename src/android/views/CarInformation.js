import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, ListItem, Spinner, Content, Button } from 'native-base'
import globalStyles, { styleColor } from '../GlobalStyles'
import * as selectStorageAction from '../../actions/components/select/selectStorageAction'
import * as selectAreaAction from '../../actions/components/select/selectAreaAction'
// import CarInfoForDemage from '../components/demageInfo/CarInfoForDemage'
// import RecordForDemage from '../components/demageInfo/RecordForDemage'
// import ImageListForDemage from '../components/demageInfo/ImageListForDemage'
// import DemageOpResult from '../components/demageInfo/DemageOpResult'
// import DemageDetail from '../components/demageInfo/DemageDetail'
// import ImageEditorForDemage from '../components/demageInfo/ImageEditorForDemage'
// import DemageEditor from '../components/demageInfo/DemageEditor'
import { Actions } from 'react-native-router-flux'
import * as carInfoAction from '../../actions/views/CarInfoAction'
import CarDetail from '../components/carInfo/CarDetail'
import CarInfoEditor from '../components/carInfo/CarInfoEditor'
import ImageListForCarInfo from '../components/carInfo/ImageListForCarInfo'
import RecordForCarInfo from '../components/carInfo/RecordForCarInfo'
import DisposableList from '../views/form/select/DisposableList'
import * as routerDirection from '../../util/RouterDirection'

const onPressMoveCar = ({ getList, onChange, getListWaiting, parent }) => {
    getListWaiting()
    routerDirection.listCennect(parent)({
        mapStateToProps: areaMapStateToProps,
        mapDispatchToProps: areaMapDispatchToProps,
        List: DisposableList,
        onSelect: (param) => {
            //Actions.pop()

            InteractionManager.runAfterInteractions(() => {
                onSelectRow(param)
            })
        }
    })
    InteractionManager.runAfterInteractions(getList)
}

const onSelectRow = () => {

}

const onSelectColumn = () => {

}

const CarInformation = props => {
    const { initParam: { car, car: { rel_status, car_status } },
        initParam,
        exportCar,
        getStorageListWaiting,
        getStorageList,
        getAreaList,
        getAreaListWaiting,
        // carInfoForDemageReducer: { getCarInfo },
        // recordForDemageReducer: { getCarInfoRecord },
        // demageOpResultReducer: { getDemageOpResult },
        parent } = props
    console.log('car', car)
    return (
        <Container style={globalStyles.listBackgroundColor}>
            <Tabs>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: '#ddd' }]}
                    heading="车辆">
                    <Content showsVerticalScrollIndicator={false}>
                        {car_status != 9 && rel_status != 1 && <CarDetail car={car} />}
                        {car_status != 9 && !rel_status && <CarDetail car={car} />}
                        {car_status == 9 && <CarDetail car={car} />}
                        {car_status != 9 && rel_status == 1 && <CarInfoEditor car={car} />}
                        {car_status != 9 && rel_status == 2 && <Button full
                            onPress={() => { }}
                            style={{ margin: 15, backgroundColor: '#00cade' }}>
                            <Text style={{ color: '#fff' }}>入库</Text>
                        </Button>}
                        {car_status != 9 && !rel_status && <View style={{ flexDirection: 'row', margin: 10 }}>
                            <Button full
                                onPress={() => { }}
                                style={{ margin: 5, backgroundColor: '#00cade', flex: 1 }}>
                                <Text style={{ color: '#fff' }}>入库</Text>
                            </Button>
                            <Button full
                                onPress={() => { }}
                                style={{ margin: 5, backgroundColor: '#00cade', flex: 1 }}>
                                <Text style={{ color: '#fff' }}>送达</Text>
                            </Button>
                        </View>}
                        {car_status != 9 && rel_status == 1 &&
                            <View style={{ flexDirection: 'row', margin: 10 }}>
                                <Button full
                                    onPress={() => { }}
                                    style={{ margin: 5, backgroundColor: '#00cade', flex: 1 }}>
                                    <Text style={{ color: '#fff' }}>修改</Text>
                                </Button>
                                <Button full
                                    onPress={() => exportCar(car)}
                                    style={{ margin: 5, backgroundColor: '#00cade', flex: 1 }}>
                                    <Text style={{ color: '#fff' }}>出库</Text>
                                </Button>
                                <Button full
                                    onPress={() => onPressMoveCar({
                                        parent,
                                        getList: ()=>getAreaList({storage_id:car.storage_id}),
                                        getListWaiting: getAreaListWaiting,
                                        onChange: (item) => console.log(item)
                                    })}
                                    style={{ margin: 5, backgroundColor: '#00cade', flex: 1 }}>
                                    <Text style={{ color: '#fff' }}>移位</Text>
                                </Button>
                            </View>}
                    </Content>
                    {/* {(getCarInfo.isResultStatus == 1 || getCarInfoRecord.isResultStatus == 1) ?
                        <Container>
                            <Spinner color={styleColor} />
                        </Container>
                        : <Container>
                            <CarInfoForDemage />
                            <RecordForDemage />
                        </Container>} */}
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: '#ddd' }]}
                    heading="照片">
                    <Container>
                        <ImageListForCarInfo />
                        {/* {damage_status != 1 && <ImageListForDemage initParam={initParam} parent={parent} />}
                        {damage_status == 1 && <ImageEditorForDemage initParam={initParam} parent={parent} />} */}
                    </Container>
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: '#ddd' }]}
                    heading="记录">
                    <Container>
                        <RecordForCarInfo />
                        {/* {damage_status == 1 && <DemageEditor initParam={initParam} parent={parent} />}
                        {damage_status != 1 && <DemageDetail initParam={initParam} />} */}
                    </Container>
                </Tab>
            </Tabs>
        </Container>
    )
}

const storageMapStateToProps = (state) => {
    return {
        listReducer: {
            Action: state.selectStorageReducer.getStorageList,
            data: {
                list: state.selectStorageReducer.data.storageList.map(item => {
                    return { id: item.id, value: item.storage_name }
                })
            }
        }
    }
}

const storageMapDispatchToProps = (dispatch) => ({

})


const areaMapStateToProps = (state) => {
    return {
        listReducer: {
            Action: state.selectAreaReducer.getAreaList,
            data: {
                list: state.selectAreaReducer.data.areaList.map(item => {
                    return { id: item.id, value: item.area_name }
                })
            }
        }
    }
}

const areaMapDispatchToProps = (dispatch) => ({

})

const mapStateToProps = (state) => {
    return {
        carInfoForDemageReducer: state.carInfoForDemageReducer,
        recordForDemageReducer: state.recordForDemageReducer,
        demageOpResultReducer: state.demageOpResultReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    exportCar: param => {
        dispatch(carInfoAction.exportCar(param))
    },
    getStorageList: () => {
        dispatch(selectStorageAction.getStorageList())
    },
    getStorageListWaiting: () => {
        dispatch(selectStorageAction.getStorageListWaiting())
    },
    getAreaList: (param) => {
        console.log('getAreaList')
        dispatch(selectAreaAction.getAreaList(param))
    },
    getAreaListWaiting: () => {
        dispatch(selectAreaAction.getAreaListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CarInformation)




// import React, { Component } from 'react'
// import { View, Text, ScrollView } from 'react-native'
// import { Button } from 'native-base'
// import { connect } from 'react-redux'
// import { Actions } from 'react-native-router-flux'
// import CarCamera from '../components/CarCamera/CarCamera'
// import * as RouterDirection from '../../util/RouterDirection'
// import Select from '../components/FormComponents/Select'
// import DateTimePicker from '../components/FormComponents/DateTimePicker'
// import * as CarInfoAction from '../../actions/CarInfoAction'
// import * as CarListAction from '../../actions/views/CarListAction'
// import RichTextBox from '../components/FormComponents/RichTextBox'
// import ConfirmModal from '../components/ConfirmModal'
// import RecordList from '../components/RecordListForCarInfo/RecordList'

// class CarInformation extends Component {
//     constructor(props) {
//         super(props)
//         this.renderImported = this.renderImported.bind(this)
//         this.renderExported = this.renderExported.bind(this)
//         this.renderNeverImport = this.renderNeverImport.bind(this)
//         this.onPressMove = this.onPressMove.bind(this)
//         this.onPressImport = this.onPressImport.bind(this)
//         this.onPressExport = this.onPressExport.bind(this)
//         this.onPressExportOk = this.onPressExportOk.bind(this)
//         this.onPressExportCancel = this.onPressExportCancel.bind(this)
//         this.getCarInformation = this.getCarInformation.bind(this)
//         this.onReceivePhote = this.onReceivePhote.bind(this)
//         this.onPressSendOk = this.onPressSendOk.bind(this)
//         this.onPressSendCancel = this.onPressSendCancel.bind(this)
//         this.renderSended = this.renderSended.bind(this)
//         this.state = {
//             confirmModalVisible: false,
//             confirmModalVisibleSend: false
//         }
//     }

//     componentWillMount() {
//         if (typeof (this.props.car) == "undefined") {
//             this.props.getCarInformation({
//                 requiredParam: {
//                     userId: this.props.user.userId,
//                     carId: this.props.carId
//                 },
//                 carOptionalParam: {
//                     vin: this.props.vin,
//                     active: 1
//                 },
//                 carListOptionalParam: {
//                     vin: this.props.vin
//                 }
//             })
//         }
//         else {
//             this.props.carInfoInit({
//                 requiredParam: {
//                     userId: this.props.user.userId,
//                     carId: this.props.car.id
//                 },
//                 car: this.props.car
//             })
//         }
//     }

//     getCarInformation() {
//         this.props.getCarInformation({
//             requiredParam: {
//                 userId: this.props.user.userId,
//                 carId: this.props.CarInfoReducer.data.car.id
//             },
//             carOptionalParam: {
//                 vin: this.props.CarInfoReducer.data.car.vin,
//                 active: 1
//             },
//             carListOptionalParam: {
//                 vin: this.props.CarInfoReducer.data.car.vin
//             }
//         })
//     }


//     componentWillReceiveProps(nextProps) {
//         let { CarInfoReducer } = nextProps

//         /*getCarInfo 执行状态*/
//         if (CarInfoReducer.getCarInfo.isExecStatus == 1) {
//             // console.log('CarInfoReducer.getCarInfo', '开始执行')
//         } else if (CarInfoReducer.getCarInfo.isExecStatus == 2) {
//             // console.log('CarInfoReducer.getCarInfo', '执行完毕')
//             if (CarInfoReducer.getCarInfo.isResultStatus == 0) {
//                 // console.log('CarInfoReducer.getCarInfo', '执行成功')
//                 this.props.resetGetCarInfo()
//             } else if (CarInfoReducer.getCarInfo.isResultStatus == 1) {
//                 // console.log('CarInfoReducer.getCarInfo执行错误', CarInfoReducer.getCarInfo.errorMsg)
//                 this.props.resetGetCarInfo()
//             } else if (CarInfoReducer.getCarInfo.isResultStatus == 2) {
//                 //  console.log('CarInfoReducer.getCarInfo', '执行失败')
//                 this.props.resetGetCarInfo()
//             } else if (CarInfoReducer.getCarInfo.isResultStatus == 3) {
//                 // console.log('CarInfoReducer.getCarInfo', '服务器错误')
//                 this.props.resetGetCarInfo()
//             }
//         }
//         /************************************************************************************************/


//         /*updateCarInfo 执行状态*/

//         if (CarInfoReducer.updateCarInfo.isExecStatus == 1) {
//             // console.log('CarInfoReducer.updateCarInfo', '开始执行')
//         } else if (CarInfoReducer.updateCarInfo.isExecStatus == 2) {
//             //  console.log('CarInfoReducer.updateCarInfo', '执行完毕')
//             if (CarInfoReducer.updateCarInfo.isResultStatus == 0) {
//                 // console.log('CarInfoReducer.updateCarInfo', '执行成功')
//                 this.props.resetUpdateCarInfo()
//                 this.getCarInformation()
//             } else if (CarInfoReducer.updateCarInfo.isResultStatus == 1) {
//                 //  console.log('CarInfoReducer.updateCarInfo执行错误', CarInfoReducer.updateCarInfo.errorMsg)
//                 this.props.resetUpdateCarInfo()
//             } else if (CarInfoReducer.updateCarInfo.isResultStatus == 2) {
//                 //  console.log('CarInfoReducer.updateCarInfo', '执行失败')
//                 this.props.resetUpdateCarInfo()
//             } else if (CarInfoReducer.updateCarInfo.isResultStatus == 3) {
//                 //  console.log('CarInfoReducer.updateCarInfo', '服务器错误')
//                 this.props.resetUpdateCarInfo()
//             }
//         }
//         /************************************************************************************************/

//         /*moveCar执行状态*/
//         if (CarInfoReducer.moveCar.isExecStatus == 1) {
//             // console.log('CarInfoReducer.moveCar', '开始执行')
//         } else if (CarInfoReducer.moveCar.isExecStatus == 2) {
//             //console.log('CarInfoReducer.moveCar', '执行完毕')
//             if (CarInfoReducer.moveCar.isResultStatus == 0) {
//                 //  console.log('CarInfoReducer.moveCar', '执行成功')
//                 this.props.resetMoveCar()
//                 this.getCarInformation()
//             } else if (CarInfoReducer.moveCar.isResultStatus == 1) {
//                 //console.log('CarInfoReducer.moveCar', '执行错误')
//                 this.props.resetMoveCar()
//             } else if (CarInfoReducer.moveCar.isResultStatus == 2) {
//                 //console.log('CarInfoReducer.moveCar', '执行失败')
//                 this.props.resetMoveCar()
//             } else if (CarInfoReducer.moveCar.isResultStatus == 3) {
//                 //console.log('CarInfoReducer.moveCar', '服务器错误')
//                 this.props.resetMoveCar()
//             }
//         }
//         /************************************************************************************************/

//         /*importCar 执行状态*/

//         if (CarInfoReducer.importCar.isExecStatus == 1) {
//             //  console.log('CarInfoReducer.importCar', '开始执行')
//         } else if (CarInfoReducer.importCar.isExecStatus == 2) {
//             // console.log('CarInfoReducer.importCar', '执行完毕')
//             if (CarInfoReducer.importCar.isResultStatus == 0) {
//                 //console.log('CarInfoReducer.importCar', '执行成功')
//                 this.props.resetImportCar()
//                 this.getCarInformation()
//             } else if (CarInfoReducer.importCar.isResultStatus == 1) {
//                 //console.log('CarInfoReducer.importCar执行错误')
//                 this.props.resetImportCar()
//             } else if (CarInfoReducer.importCar.isResultStatus == 2) {
//                 // console.log('CarInfoReducer.importCar', '执行失败')
//                 this.props.resetImportCar()
//             } else if (CarInfoReducer.importCar.isResultStatus == 3) {
//                 // console.log('CarInfoReducer.importCar', '服务器错误')
//                 this.props.resetImportCar()
//             }
//         }
//         /************************************************************************************************/

//         /*exportCar 执行状态*/

//         if (CarInfoReducer.exportCar.isExecStatus == 1) {
//             // console.log('CarInfoReducer.exportCar', '开始执行')
//         } else if (CarInfoReducer.exportCar.isExecStatus == 2) {
//             // console.log('CarInfoReducer.exportCar', '执行完毕')
//             if (CarInfoReducer.exportCar.isResultStatus == 0) {
//                 // console.log('CarInfoReducer.exportCar', '执行成功')
//                 this.props.resetExportCar()
//                 this.getCarInformation()
//             } else if (CarInfoReducer.exportCar.isResultStatus == 1) {
//                 // console.log('CarInfoReducer.exportCar执行错误')
//                 this.props.resetExportCar()
//             } else if (CarInfoReducer.exportCar.isResultStatus == 2) {
//                 // console.log('CarInfoReducer.exportCar执行失败', CarInfoReducer.exportCar.failedMsg)
//                 this.props.resetExportCar()
//             } else if (CarInfoReducer.exportCar.isResultStatus == 3) {
//                 //  console.log('CarInfoReducer.exportCar服务器错误')
//                 this.props.resetExportCar()
//             }
//         }
//         /************************************************************************************************/

//         /*appendImage执行状态*/
//         if (CarInfoReducer.appendImage.isExecStatus == 1) {
//             //console.log('CarInfoReducer.appendImage开始执行')
//         } else if (CarInfoReducer.appendImage.isExecStatus == 2) {
//             // console.log('CarInfoReducer.appendImage执行完毕')
//             if (CarInfoReducer.appendImage.isResultStatus == 0) {
//                 //  console.log('CarInfoReducer.appendImage执行成功')
//                 this.props.resetAppendImage()
//                 this.getCarInformation()
//             } else if (CarInfoReducer.appendImage.isResultStatus == 1) {
//                 // console.log('CarInfoReducer.appendImage执行错误')
//                 this.props.resetAppendImage()
//             } else if (CarInfoReducer.appendImage.isResultStatus == 2) {
//                 // console.log('CarInfoReducer.appendImage执行失败')
//                 this.props.resetAppendImage()
//             } else if (CarInfoReducer.appendImage.isResultStatus == 3) {
//                 // console.log('CarInfoReducer.appendImage服务器错误')
//                 this.props.resetAppendImage()
//             }
//         }
//         /************************************************************************************************/


//         /*appendImage执行状态*/
//         if (CarInfoReducer.sendCarisExecStatus == 1) {
//             //console.log('CarInfoReducer.sendCar开始执行')
//         } else if (CarInfoReducer.sendCar.isExecStatus == 2) {
//             // console.log('CarInfoReducer.sendCar执行完毕')
//             if (CarInfoReducer.sendCar.isResultStatus == 0) {
//                 //  console.log('CarInfoReducer.sendCar执行成功')
//                 this.props.resetSendCar()
//                 Actions.pop()
//             } else if (CarInfoReducer.sendCar.isResultStatus == 1) {
//                 // console.log('CarInfoReducer.sendCar执行错误')
//                 this.props.resetSendCar()

//             } else if (CarInfoReducer.sendCar.isResultStatus == 2) {
//                 // console.log('CarInfoReducer.sendCar执行失败')
//                 this.props.resetSendCar()

//             } else if (CarInfoReducer.sendCar.isResultStatus == 3) {
//                 // console.log('CarInfoReducer.sendCar服务器错误')
//                 this.props.resetSendCar()

//             }
//         }
//         /************************************************************************************************/
//     }

//     onPressMove(param) {
//         this.props.moveCar({
//             requiredParam:
//             {
//                 userId: this.props.user.userId,
//                 parkingId: param.parkingId
//             },
//             optionalParam: {
//                 carId: this.props.CarInfoReducer.data.car.id
//             }
//         })
//     }

//     onPressImport(param) {
//         const { vin, id } = this.props.CarInfoReducer.data.car
//         let postParam = param
//         this.props.importCar({ requiredParam: { userId: this.props.user.userId, carId: id }, optionalParam: { vin }, postParam })
//     }

//     onPressExport() {
//         this.setState({ confirmModalVisible: true })

//     }

//     onReceivePhote(param) {
//         const { vin, id } = this.props.CarInfoReducer.data.car
//         let { postFileParam } = param
//         this.props.appendImage({
//             requiredParam: {
//                 carId: id,
//                 vin: vin
//             },
//             postParam: {
//                 username: this.props.user.mobile,
//                 userId: this.props.user.userId,
//                 userType: this.props.user.userType
//             },
//             optionalParam: {
//                 imageType: 4
//             },
//             postFileParam: {
//                 ...postFileParam,
//                 key: 'image'
//             }
//         })
//     }

//     onSelect(param) {
//         const { vin, make_id, make_name, route_start_id, route_start, base_addr_id, route_end_id, route_end, receive_id, entrust_id, order_date, remark, id }
//             = this.props.CarInfoReducer.data.car
//         let putParam = {
//             vin: vin,
//             makeId: make_id,
//             makeName: make_name,
//             routeStartId: route_start_id,
//             routeStart: route_start,
//             baseAddrId: base_addr_id,
//             routeEndId: route_end_id,
//             routeEnd: route_end,
//             receiveId: receive_id,
//             entrustId: entrust_id,
//             orderDate: order_date,
//             remark,
//             ...param
//         }
//         for (item in putParam) {
//             if (!putParam[item]) {
//                 delete putParam[item]
//             }
//         }
//         if (putParam.orderDate) {
//             putParam.orderDate = new Date(putParam.orderDate).toLocaleDateString()
//         }
//         if (route_end_id != putParam.routeEndId) {
//             delete putParam['receiveId']
//         }
//         if (route_start_id != putParam.routeStartId) {
//             delete putParam['baseAddrId']
//         }
//         this.props.updateCarInfo({
//             requiredParam: {
//                 userId: this.props.user.userId,
//                 carId: id
//             },
//             putParam
//         })
//     }


//     onPressSendOk() {
//         let { id } = this.props.CarInfoReducer.data.car
//         this.props.sendCar({
//             requiredParam: {
//                 userId: this.props.user.userId,
//                 carId: id,
//                 carStatus: 9
//             }
//         })
//         this.setState({ confirmModalVisibleSend: false })
//     }

//     onPressSendCancel() {
//         this.setState({ confirmModalVisibleSend: false })
//     }

//     onPressExportOk() {
//         let { r_id, p_id, storage_id, id } = this.props.CarInfoReducer.data.car
//         this.props.exportCar({
//             requiredParam: {
//                 userId: this.props.user.userId,
//                 relId: r_id,
//                 relStatus: 2
//             },
//             optionalParam: {
//                 parkingId: p_id,
//                 storageId: storage_id,
//                 carId: id
//             }
//         })
//         this.setState({ confirmModalVisible: false })
//     }

//     onPressExportCancel() {
//         this.setState({ confirmModalVisible: false })
//     }

//     renderImported() {
//         let { vin, make_name, en_short_name, re_short_name, addr_name, route_start, route_end, route_end_id, route_start_id, order_date, storage_name, row, col, remark, area_name, storage_id } = this.props.CarInfoReducer.data.car
//         return (
//             <View style={{ flex: 1, backgroundColor: '#eee' }}>
//                 <ScrollView>
//                     <View style={{ flex: 1 }}>
//                         <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                             <Text style={{ color: '#00cade', flex: 4, textAlign: 'right' }}>vin：</Text>
//                             <Text style={{ color: '#00cade', flex: 13 }}>{vin}</Text>
//                         </View>
//                         <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
//                             <Select
//                                 isRequire={false}
//                                 title='品牌：'
//                                 value={make_name}
//                                 showList={RouterDirection.selectCarMake(this.props.parent)}
//                                 onValueChange={(param) => this.onSelect({ makeId: param.id, makeName: param.value }, {})}
//                                 defaultValue={'请选择'}
//                             />
//                             <Select
//                                 isRequire={false}
//                                 title='委托方：'
//                                 value={en_short_name}
//                                 showList={RouterDirection.selectEntrust(this.props.parent)}
//                                 onValueChange={(param) => this.onSelect({ entrustId: param.id })}
//                                 defaultValue={'请选择'}
//                             />
//                         </View>
//                         <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
//                             <Select
//                                 isRequire={false}
//                                 title='起始城市：'
//                                 value={route_start}
//                                 showList={RouterDirection.selectCity(this.props.parent)}
//                                 onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
//                                 defaultValue={'请选择'}
//                             />
//                             <Select
//                                 isRequire={false}
//                                 title='发货地址：'
//                                 value={addr_name}
//                                 showList={(param) => RouterDirection.selectBaseAddr(this.props.parent)({ cityId: route_start_id, ...param })}
//                                 onValueChange={(param) => this.onSelect({ baseAddrId: param.id })}
//                                 defaultValue={'请选择'}
//                             />
//                         </View>
//                         <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
//                             <Select
//                                 isRequire={false}
//                                 title='目的城市：'
//                                 value={route_end}
//                                 showList={RouterDirection.selectCity(this.props.parent)}
//                                 onValueChange={(param) => this.onSelect({ routeEndId: param.id, routeEnd: param.value })}
//                                 defaultValue={'请选择'}
//                             />
//                             <Select
//                                 isRequire={false}
//                                 title='经销商：'
//                                 value={re_short_name}
//                                 showList={(param) => RouterDirection.selectReceive(this.props.parent)({ cityId: route_end_id, ...param })}
//                                 onValueChange={(param) => this.onSelect({ receiveId: param.id })}
//                                 defaultValue={'请选择'}
//                             />
//                             <DateTimePicker
//                                 isRequire={false}
//                                 title='指令时间：'
//                                 value={order_date ? new Date(order_date).toLocaleDateString() : ''}
//                                 defaultValue={'请选择'}
//                                 onValueChange={(param) => this.onSelect({ orderDate: param })}
//                             />
//                         </View>
//                         <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                             <Text style={{ flex: 4, textAlign: 'right', fontSize: 12 }}>当前位置：</Text>
//                             <Text style={{ flex: 13, fontSize: 12 }}>{storage_name ? `${storage_name}${area_name}${row.toString()}-${col.toString()}` : '请选择'}</Text>
//                         </View>
//                         <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
//                             <RichTextBox
//                                 isRequire={false}
//                                 value={remark}
//                                 verifications={[]}
//                                 title='备注：'
//                                 defaultValue={'请选择'}
//                                 onValueChange={(param) => this.onSelect({ remark: param })}
//                                 showRichText={RouterDirection.richText(this.props.parent)}
//                             />
//                         </View>
//                         <CarCamera
//                             images={this.props.CarInfoReducer.data.imageList}
//                             postImage={this.onReceivePhote}
//                             showImagePage={RouterDirection.ImagePageForCarInfo(this.props.parent)} />
//                         <Button
//                             full
//                             onPress={() => RouterDirection.selectArea(this.props.parent)({
//                                 routerIndex: 0,
//                                 storageId: storage_id,
//                                 storageName: storage_name,
//                                 popName: this.props.name,
//                                 routerList: [RouterDirection.selectRow(this.props.parent), RouterDirection.selectColumn(this.props.parent)],
//                                 onSelect: this.onPressMove
//                             })}
//                             style={{ marginHorizontal: 20, marginBottom: 10, backgroundColor: '#00cade' }}>
//                             <Text style={{ color: '#fff' }}>移位</Text>
//                         </Button>
//                         <Button full onPress={this.onPressExport} style={{ marginHorizontal: 20, marginBottom: 10, backgroundColor: '#00cade' }}>
//                             <Text style={{ color: '#fff' }}>出库</Text>
//                         </Button>
//                         <RecordList records={this.props.CarInfoReducer.data.recordList} />
//                     </View>
//                 </ScrollView>
//                 <ConfirmModal
//                     title='确认出库？'
//                     isVisible={this.state.confirmModalVisible}
//                     onPressOk={this.onPressExportOk}
//                     onPressCancel={this.onPressExportCancel} />
//             </View>
//         )
//     }

//     renderExported() {
//         let { vin, make_name, en_short_name, re_short_name, addr_name, route_start, route_end, order_date, remark } = this.props.CarInfoReducer.data.car
//         return (
//             <View style={{ flex: 1, backgroundColor: '#eee' }}>
//                 <ScrollView>
//                     <View style={{ flex: 1 }}>
//                         <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                             <Text style={{ color: '#00cade', flex: 4, textAlign: 'right' }}>vin：</Text>
//                             <Text style={{ color: '#00cade', flex: 13 }}>{vin}</Text>
//                         </View>
//                         <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
//                             <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                                 <Text style={{ flex: 4, textAlign: 'right', fontSize: 12 }}>品牌：</Text>
//                                 <Text style={{ flex: 13, fontSize: 12 }}>{make_name}</Text>
//                             </View>
//                             <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                                 <Text style={{ flex: 4, textAlign: 'right', fontSize: 12 }}>委托方：</Text>
//                                 <Text style={{ flex: 13, fontSize: 12 }}>{en_short_name}</Text>
//                             </View>
//                             <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                                 <Text style={{ flex: 4, textAlign: 'right', fontSize: 12 }}>经销商：</Text>
//                                 <Text style={{ flex: 13, fontSize: 12 }}>{re_short_name}</Text>
//                             </View>
//                             <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                                 <Text style={{ flex: 4, textAlign: 'right', fontSize: 12 }}>起始城市：</Text>
//                                 <Text style={{ flex: 13, fontSize: 12 }}>{route_start}</Text>
//                             </View>
//                             <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                                 <Text style={{ flex: 4, textAlign: 'right', fontSize: 12 }}>发货地址：</Text>
//                                 <Text style={{ flex: 13, fontSize: 12 }}>{addr_name}</Text>
//                             </View>
//                             <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                                 <Text style={{ flex: 4, textAlign: 'right', fontSize: 12 }}>目的城市：</Text>
//                                 <Text style={{ flex: 13, fontSize: 12 }}>{route_end}</Text>
//                             </View>
//                             <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                                 <Text style={{ flex: 4, textAlign: 'right', fontSize: 12 }}>指令时间：</Text>
//                                 <Text style={{ flex: 13, fontSize: 12 }}>{order_date ? new Date(order_date).toLocaleDateString() : ''}</Text>
//                             </View>
//                         </View>
//                         <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                             <Text style={{ flex: 4, textAlign: 'right', fontSize: 12 }}>当前位置：</Text>
//                             <Text style={{ flex: 13, fontSize: 12 }}>已出库</Text>
//                         </View>
//                         <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                             <Text style={{ flex: 4, textAlign: 'right', fontSize: 12 }}>备注：</Text>
//                             <Text style={{ flex: 13, fontSize: 12 }}>{remark}</Text>
//                         </View>
//                         <CarCamera
//                             images={this.props.CarInfoReducer.data.imageList}
//                             postImage={this.onReceivePhote}
//                             showImagePage={RouterDirection.ImagePageForCarInfo(this.props.parent)} />
//                         <Button full
//                             onPress={() => RouterDirection.selectStorage(this.props.parent)({
//                                 routerIndex: 0,
//                                 popName: this.props.name,
//                                 routerList: [RouterDirection.selectArea(this.props.parent), RouterDirection.selectRow(this.props.parent), RouterDirection.selectColumn(this.props.parent)],
//                                 onSelect: this.onPressImport
//                             })}
//                             style={{ marginHorizontal: 20, marginBottom: 10, backgroundColor: '#00cade' }}>
//                             <Text style={{ color: '#fff' }}>入库</Text>
//                         </Button>
//                         <RecordList records={this.props.CarInfoReducer.data.recordList} />
//                     </View>
//                 </ScrollView>
//             </View>
//         )
//     }

//     renderNeverImport() {
//         let { vin, make_name, en_short_name, re_short_name, addr_name, route_start_id, route_end_id, route_start, route_end, order_date, remark } = this.props.CarInfoReducer.data.car
//         return (
//             <View style={{ flex: 1, backgroundColor: '#eee' }}>
//                 <ScrollView showsVerticalScrollIndicator={false}>
//                     <View style={{ flex: 1 }}>
//                         <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                             <Text style={{ color: '#00cade', flex: 4, textAlign: 'right' }}>vin：</Text>
//                             <Text style={{ color: '#00cade', flex: 13 }}>{vin}</Text>
//                         </View>
//                         <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
//                             <Select
//                                 isRequire={false}
//                                 title='品牌：'
//                                 value={make_name}
//                                 showList={RouterDirection.selectCarMake(this.props.parent)}
//                                 onValueChange={(param) => this.onSelect(param)}
//                                 defaultValue={'请选择'}
//                             />
//                             <Select
//                                 isRequire={false}
//                                 value={en_short_name}
//                                 title='委托方：'
//                                 showList={RouterDirection.selectEntrust(this.props.parent)}
//                                 onValueChange={(param) => this.onSelect({ entrustId: param.id })}
//                                 defaultValue={'请选择'}
//                             /></View>
//                         <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
//                             <Select
//                                 isRequire={false}
//                                 title='起始城市：'
//                                 value={route_start}
//                                 showList={RouterDirection.selectCity(this.props.parent)}
//                                 onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
//                                 defaultValue={'请选择'}
//                             />
//                             <Select
//                                 isRequire={false}
//                                 value={addr_name}
//                                 title='发货地址：'
//                                 showList={(param) => RouterDirection.selectBaseAddr(this.props.parent)({ cityId: route_start_id, ...param })}
//                                 onValueChange={(param) => this.onSelect({ baseAddrId: param.id })}
//                                 defaultValue={'请选择'}
//                             />
//                         </View>
//                         <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
//                             <Select
//                                 isRequire={false}
//                                 value={route_end}
//                                 title='目的城市：'
//                                 showList={RouterDirection.selectCity(this.props.parent)}
//                                 onValueChange={(param) => this.onSelect({ routeEndId: param.id, routeEnd: param.value })}
//                                 defaultValue={'请选择'}
//                             />
//                             <Select
//                                 isRequire={false}
//                                 value={re_short_name}
//                                 title='经销商：'
//                                 showList={(param) => RouterDirection.selectReceive(this.props.parent)({ cityId: route_end_id, ...param })}
//                                 onValueChange={(param) => this.onSelect({ receiveId: param.id })}
//                                 defaultValue={'请选择'}
//                             />
//                             <DateTimePicker
//                                 isRequire={false}
//                                 value={order_date ? new Date(order_date).toLocaleDateString() : ''}
//                                 title='指令时间：'
//                                 defaultValue={'请选择'}
//                                 onValueChange={(param) => this.onSelect({ orderDate: param })}
//                             />
//                         </View>
//                         <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                             <Text style={{ flex: 4, textAlign: 'right', fontSize: 12 }}>当前位置：</Text>
//                             <Text style={{ flex: 13, fontSize: 12 }}>未入库</Text>
//                         </View>
//                         <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
//                             <RichTextBox
//                                 isRequire={false}
//                                 value={remark}
//                                 verifications={[]}
//                                 title='备注：'
//                                 defaultValue={'请选择'}
//                                 onValueChange={(param) => this.onSelect({ remark: param })}
//                                 showRichText={RouterDirection.richText(this.props.parent)}
//                             />
//                         </View>
//                         <CarCamera
//                             images={this.props.CarInfoReducer.data.imageList}
//                             postImage={this.onReceivePhote}
//                             showImagePage={RouterDirection.ImagePageForCarInfo(this.props.parent)} />
//                         <Button
//                             block
//                             onPress={() => RouterDirection.selectStorage(this.props.parent)({
//                                 routerIndex: 0,
//                                 popName: this.props.name,
//                                 routerList: [RouterDirection.selectArea(this.props.parent),RouterDirection.selectRow(this.props.parent), RouterDirection.selectColumn(this.props.parent)],
//                                 onSelect: this.onPressImport
//                             })}
//                             style={{ marginHorizontal: 20, marginBottom: 10, backgroundColor: '#00cade' }}>
//                             <Text style={{ color: '#fff' }}>入库</Text>
//                         </Button>
//                         <Button
//                             block
//                             onPress={() => { this.setState({ confirmModalVisibleSend: true }) }}
//                             style={{ marginHorizontal: 20, marginBottom: 10, backgroundColor: '#00cade' }}>
//                             <Text style={{ color: '#fff' }}>直接送达</Text>
//                         </Button>
//                         <RecordList records={this.props.CarInfoReducer.data.recordList} />
//                     </View>
//                 </ScrollView>
//                 <ConfirmModal
//                     title='确认未入库车辆直接送达？'
//                     isVisible={this.state.confirmModalVisibleSend}
//                     onPressOk={this.onPressSendOk}
//                     onPressCancel={this.onPressSendCancel} />
//             </View>
//         )
//     }

//     renderSended() {
//         let { vin, make_name, en_short_name, re_short_name, addr_name, route_start, route_end, order_date, remark } = this.props.CarInfoReducer.data.car
//         return (
//             <View style={{ flex: 1, backgroundColor: '#eee' }}>
//                 <ScrollView>
//                     <View style={{ flex: 1 }}>
//                         <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                             <Text style={{ color: '#00cade', flex: 4, textAlign: 'right' }}>vin：</Text>
//                             <Text style={{ color: '#00cade', flex: 13 }}>{vin}</Text>
//                         </View>
//                         <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
//                             <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                                 <Text style={{ flex: 4, textAlign: 'right', fontSize: 12 }}>品牌：</Text>
//                                 <Text style={{ flex: 13, fontSize: 12 }}>{make_name}</Text>
//                             </View>
//                             <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                                 <Text style={{ flex: 4, textAlign: 'right', fontSize: 12 }}>委托方：</Text>
//                                 <Text style={{ flex: 13, fontSize: 12 }}>{en_short_name}</Text>
//                             </View>
//                             <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                                 <Text style={{ flex: 4, textAlign: 'right', fontSize: 12 }}>经销商：</Text>
//                                 <Text style={{ flex: 13, fontSize: 12 }}>{re_short_name}</Text>
//                             </View>
//                             <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                                 <Text style={{ flex: 4, textAlign: 'right', fontSize: 12 }}>起始城市：</Text>
//                                 <Text style={{ flex: 13, fontSize: 12 }}>{route_start}</Text>
//                             </View>
//                             <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                                 <Text style={{ flex: 4, textAlign: 'right', fontSize: 12 }}>发货地址：</Text>
//                                 <Text style={{ flex: 13, fontSize: 12 }}>{addr_name}</Text>
//                             </View>
//                             <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                                 <Text style={{ flex: 4, textAlign: 'right', fontSize: 12 }}>目的城市：</Text>
//                                 <Text style={{ flex: 13, fontSize: 12 }}>{route_end}</Text>
//                             </View>
//                             <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                                 <Text style={{ flex: 4, textAlign: 'right', fontSize: 12 }}>指令时间：</Text>
//                                 <Text style={{ flex: 13, fontSize: 12 }}>{order_date ? new Date(order_date).toLocaleDateString() : ''}</Text>
//                             </View>
//                         </View>
//                         <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                             <Text style={{ flex: 4, textAlign: 'right', fontSize: 12 }}>当前位置：</Text>
//                             <Text style={{ flex: 13, fontSize: 12 }}>已送达</Text>
//                         </View>
//                         <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
//                             <Text style={{ flex: 4, textAlign: 'right', fontSize: 12 }}>备注：</Text>
//                             <Text style={{ flex: 13, fontSize: 12 }}>{remark}</Text>
//                         </View>
//                         <CarCamera
//                             images={this.props.CarInfoReducer.data.imageList}
//                             postImage={this.onReceivePhote}
//                             showImagePage={RouterDirection.ImagePageForCarInfo(this.props.parent)} />
//                         <RecordList records={this.props.CarInfoReducer.data.recordList} />
//                     </View>
//                 </ScrollView>
//             </View>
//         )
//     }

//     render() {
//         console.log(this.props.CarInfoReducer)
//         return (
//             <View style={{ flex: 1 }}>
//                 {this.props.CarInfoReducer.data.car && !this.props.CarInfoReducer.data.car.rel_status && this.props.CarInfoReducer.data.car.car_status != 9 && this.renderNeverImport()}
//                 {this.props.CarInfoReducer.data.car && this.props.CarInfoReducer.data.car.rel_status == 1 && this.props.CarInfoReducer.data.car.car_status != 9 && this.renderImported()}
//                 {this.props.CarInfoReducer.data.car && this.props.CarInfoReducer.data.car.rel_status == 2 && this.props.CarInfoReducer.data.car.car_status == 9 && this.renderExported()}
//                 {this.props.CarInfoReducer.data.car.car_status == 9 && !this.props.CarInfoReducer.data.car.rel_status && this.renderSended()}
//             </View>
//         )
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         user: state.LoginReducer.user,
//         CarInfoReducer: state.CarInfoReducer,
//     }
// }

// const mapDispatchToProps = (dispatch) => ({
//     carInfoInit: (param) => {
//         dispatch(CarInfoAction.carInfoInit(param))
//     },
//     getCarInformation: (param) => {
//         dispatch(CarInfoAction.getCarInformation(param))
//     },
//     resetGetCarInfo: () => {
//         dispatch(CarInfoAction.resetGetCarInfo())
//     },
//     updateCarInfo: (param) => {
//         dispatch(CarInfoAction.updateCarInfo(param))
//     },
//     resetUpdateCarInfo: () => {
//         dispatch(CarInfoAction.resetUpdateCarInfo())
//     },
//     importCar: (param) => {
//         dispatch(CarInfoAction.importCar(param))
//     },
//     resetImportCar: () => {
//         dispatch(CarInfoAction.resetImportCar())
//     },
//     exportCar: (param) => {
//         dispatch(CarInfoAction.exportCar(param))
//     },
//     resetExportCar: () => {
//         dispatch(CarInfoAction.resetExportCar())
//     },
//     moveCar: (param) => {
//         dispatch(CarInfoAction.moveCar(param))
//     },
//     resetMoveCar: () => {
//         dispatch(CarInfoAction.resetMoveCar())
//     },
//     appendImage: (param) => {
//         dispatch(CarInfoAction.appendImage(param))
//     },
//     resetAppendImage: () => {
//         dispatch(CarInfoAction.resetAppendImage())
//     },
//     delImage: (param) => {
//         dispatch(CarInfoAction.delImage(param))
//     },
//     resetDelImage: () => {
//         dispatch(CarInfoAction.resetDelImage())
//     },
//     sendCar: (param) => {
//         dispatch(CarInfoAction.sendCar(param))
//     },
//     resetSendCar: () => {
//         dispatch(CarInfoAction.resetSendCar())
//     }
// })

// export default connect(mapStateToProps, mapDispatchToProps)(CarInformation)
