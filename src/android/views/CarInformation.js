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
import * as selectParkingAction from '../../actions/components/select/selectParkingAction'
import { Actions } from 'react-native-router-flux'
import * as carInfoAction from '../../actions/views/CarInfoAction'
import CarDetail from '../components/carInfo/CarDetail'
import CarInfoEditor from '../components/carInfo/CarInfoEditor'
import ImageListForCarInfo from '../components/carInfo/ImageListForCarInfo'
import RecordForCarInfo from '../components/carInfo/RecordForCarInfo'
import DisposableList from '../views/form/select/DisposableList'
import * as routerDirection from '../../util/RouterDirection'



const onSelectStorage = ({ getAreaList, getStorageListWaiting, getStorageList, onSelect, getAreaListWaiting, parent, getParkingListWaiting, getParkingList }) => {
    getStorageListWaiting()
    routerDirection.listCennectNav(parent)({
        mapStateToProps: storageMapStateToProps,
        mapDispatchToProps: storageMapDispatchToProps,
        List: DisposableList,
        title: '仓库',
        onSelect: (item) => {
            InteractionManager.runAfterInteractions(() => {
                onSelectArea({ param: { storage: item }, getParkingListWaiting, parent, getParkingList, getAreaList, getAreaListWaiting, onSelect })
            })
        }
    })
    InteractionManager.runAfterInteractions(getStorageList)
}

const onSelectArea = ({ getAreaList, onSelect, getAreaListWaiting, parent, getParkingListWaiting, getParkingList, param }) => {
    getAreaListWaiting()
    routerDirection.listCennectNav(parent)({
        mapStateToProps: areaMapStateToProps,
        mapDispatchToProps: areaMapDispatchToProps,
        List: DisposableList,
        title: '区',
        onSelect: (item) => {
            InteractionManager.runAfterInteractions(() => {
                onSelectRow({ param: { ...param, area: item }, getParkingListWaiting, parent, getParkingList, onSelect })
            })
        }
    })
    InteractionManager.runAfterInteractions(() => getAreaList(param.storage))
}

const onSelectRow = ({ param, getParkingListWaiting, parent, getParkingList, onSelect }) => {
    getParkingListWaiting()
    routerDirection.listCennectNav(parent)({
        mapStateToProps: rowMapStateToProps,
        mapDispatchToProps: rowMapDispatchToProps,
        List: DisposableList,
        title: '排',
        onSelect: (item) => {
            InteractionManager.runAfterInteractions(() => {
                onSelectColumn({ param: { ...param, row: item }, parent, onSelect })
            })
        }
    })
    InteractionManager.runAfterInteractions(() => getParkingList(param))

}

const onSelectColumn = ({ param, parent, onSelect }) => {
    routerDirection.listCennectNav(parent)({
        mapStateToProps: (state, ownProps) => columnMapStateToProps(state, ownProps, param.row),
        mapDispatchToProps: columnMapDispatchToProps,
        List: DisposableList,
        title: '列',
        onSelect: (item) => {
            routerDirection.popToCarInfoConnect(parent)
            InteractionManager.runAfterInteractions(() => {
                onSelect({ ...param, col: item })
            })
        }
    })
}

const CarInformation = props => {
    const { carInfoReducer: { car, car: { rel_status, car_status } },
        initParam,
        exportCar,
        moveCar,
        importCar,
        updateCarInfo,
        getStorageListWaiting,
        getStorageList,
        getAreaList,
        getAreaListWaiting,
        getParkingListWaiting,
        getParkingList,
        selectParkingReducer,
        sendCar,
        parent } = props
        console.log('props',props)
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
                        {car_status == 9 && rel_status == 2 && <CarDetail car={car} />}
                        {car_status != 9 && !rel_status && <CarDetail car={car} />}
                        {car_status == 9 && !rel_status && <CarDetail car={car} />}
                        {car_status != 9 && rel_status == 1 && <CarInfoEditor car={car} parent={parent} />}
                        {car_status == 9 && rel_status == 2 && <Button full
                            onPress={() => onSelectStorage({
                                parent,
                                getParkingList,
                                getParkingListWaiting,
                                getAreaList,
                                getAreaListWaiting,
                                getStorageListWaiting,
                                getStorageList,
                                onSelect: (item) => importCar({ ...item, car })
                            })}
                            style={{ margin: 15, backgroundColor: '#00cade' }}>
                            <Text style={{ color: '#fff' }}>入库</Text>
                        </Button>}
                        {car_status != 9 && !rel_status && <View style={{ flexDirection: 'row', margin: 10 }}>
                            <Button full
                                onPress={() => onSelectStorage({
                                    parent,
                                    getParkingList,
                                    getParkingListWaiting,
                                    getAreaList,
                                    getAreaListWaiting,
                                    getStorageListWaiting,
                                    getStorageList,
                                    onSelect: (item) => importCar({ ...item, car })
                                })}
                                style={{ margin: 5, backgroundColor: '#00cade', flex: 1 }}>
                                <Text style={{ color: '#fff' }}>入库</Text>
                            </Button>
                            <Button full
                                onPress={() => sendCar({ carId: car.id })}
                                style={{ margin: 5, backgroundColor: '#00cade', flex: 1 }}>
                                <Text style={{ color: '#fff' }}>送达</Text>
                            </Button>
                        </View>}
                        {car_status != 9 && rel_status == 1 &&
                            <View style={{ flexDirection: 'row', margin: 10 }}>
                                <Button full
                                    onPress={updateCarInfo}
                                    style={{ margin: 5, backgroundColor: '#00cade', flex: 1 }}>
                                    <Text style={{ color: '#fff' }}>修改</Text>
                                </Button>
                                <Button full
                                    onPress={() => exportCar(car)}
                                    style={{ margin: 5, backgroundColor: '#00cade', flex: 1 }}>
                                    <Text style={{ color: '#fff' }}>出库</Text>
                                </Button>
                                <Button full
                                    onPress={() => onSelectArea({
                                        parent,
                                        getParkingList,
                                        getParkingListWaiting,
                                        param: { storage: { id: car.storage_id } },
                                        getAreaList,
                                        getAreaListWaiting,
                                        onSelect: (item) => moveCar({ ...item, carId: car.id })
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
                        <ImageListForCarInfo car={car} parent={parent} />
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
                        <RecordForCarInfo car={car} />
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

const rowMapStateToProps = (state) => {
    return {
        listReducer: {
            Action: state.selectParkingReducer.getParkingList,
            data: {
                list: Array.from(new Set(state.selectParkingReducer.data.parkingList
                    .filter(item => !item.rel_status)
                    .map(item => item.row))).map(item => {
                        return { id: item, value: item }
                    })
            }
        }
    }
}

const rowMapDispatchToProps = (dispatch) => ({

})


const columnMapStateToProps = (state, ownProps, row) => {
    return {
        listReducer: {
            Action: state.selectParkingReducer.getParkingList,
            data: {
                list: state.selectParkingReducer.data.parkingList
                    .filter(item => !item.rel_status && item.row == row.value)
                    .map(item => {
                        return { id: item.id, value: item.col }
                    })
            }
        }
    }
}
const columnMapDispatchToProps = (dispatch) => ({

})


export default CarInformation