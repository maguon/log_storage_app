import React, { Component } from 'react'
import {
    Text,
    View,
    ToastAndroid,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'native-base'
import DisposableList from '../views/form/select/DisposableList'
import * as importCarAction from '../../actions/views/ImporCarAction'
import * as selectStorageAction from '../../actions/components/select/selectStorageAction'
import * as selectAreaAction from '../../actions/components/select/selectAreaAction'
import * as selectParkingAction from '../../actions/components/select/selectParkingAction'
import { Actions } from 'react-native-router-flux'
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
            routerDirection.popToCarInfo(parent)
            InteractionManager.runAfterInteractions(() => {
                onSelect({ ...param, col: item })
            })
        }
    })
}

const ImportCar = props => {
    const {
        getStorageListWaiting,
        getStorageList,
        getAreaList,
        getAreaListWaiting,
        getParkingListWaiting,
        getParkingList,
        importCar,
        parent
    } = props
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
                <Button
                    full
                    onPress={() => onSelectStorage({
                        parent,
                        getParkingList,
                        getParkingListWaiting,
                        getAreaList,
                        getAreaListWaiting,
                        getStorageListWaiting,
                        getStorageList,
                        onSelect: (item) =>{
                            importCar(item)
                        } 
                    })}
                    style={{ marginBottom: 20, backgroundColor: '#00cade' }}>
                    <Text style={{ color: '#fff' }}>入库</Text>
                </Button>
                <Button
                    full
                    onPress={() => { }}
                    onPress={() => Actions.popTo('home')}
                    style={{ backgroundColor: '#00cade' }}>
                    <Text style={{ color: '#fff' }}>返回</Text>
                </Button>
            </View>
        </View>
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


const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => ({
    importCar: (param) => {
        dispatch(importCarAction.importCar(param))
    },
    getStorageList: () => {
        dispatch(selectStorageAction.getStorageList())
    },
    getStorageListWaiting: () => {
        dispatch(selectStorageAction.getStorageListWaiting())
    },
    getAreaList: (param) => {
        dispatch(selectAreaAction.getAreaList(param))
    },
    getAreaListWaiting: () => {
        dispatch(selectAreaAction.getAreaListWaiting())
    },
    getParkingList: (param) => {
        dispatch(selectParkingAction.getParkingList(param))
    },
    getParkingListWaiting: (param) => {
        dispatch(selectParkingAction.getParkingListWaiting())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportCar)



