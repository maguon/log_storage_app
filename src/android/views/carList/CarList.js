import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as carListAction from './CarListAction'
import * as imageListForCarInfoAction from '../../../actions/components/carInfo/ImageListForCarInfoAction'
import { Actions } from 'react-native-router-flux'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    RefreshControl,
    FlatList,
    Button,
    TouchableOpacity,
    Image,
    InteractionManager,
    ActivityIndicator
} from 'react-native'
import { Container, Icon, Thumbnail, Spinner } from 'native-base'
import * as RouterDirection from '../../../util/RouterDirection'
import globalStyles, { styleColor } from '../../GlobalStyles'
import moment from 'moment'
import * as selectStorageAction from '../../../actions/components/select/selectStorageAction'
import * as selectAreaAction from '../../../actions/components/select/selectAreaAction'
import * as selectParkingAction from '../../../actions/components/select/selectParkingAction'
import * as carInfoAction from '../../../actions/views/CarInfoAction'

const renderListItem = props => {
    const { item: { plan_out_time, make_name, storage_name, vin, colour,id, enter_time, real_out_time, col, row, area_name },
    item, index, parent,getCarImageListWaiting,getCarImageList } = props
    return (
        <TouchableOpacity key={index} onPress={() => {
            getCarImageListWaiting()
            RouterDirection.carInfoConnect(parent)({
                 mapStateToProps:carInfoMapStateToProps, 
                 mapDispatchToProps:carInfoMapDispatchToProps,
                 parent,
                 carId: id 
            })
            InteractionManager.runAfterInteractions(() => {
                getCarImageList({ carId: id })
            })
        }}>
            <View style={styles.item}>
                <View style={styles.itemRow}>
                    <Text style={[globalStyles.largeText, globalStyles.styleColor]}>vin:{vin}</Text>
                </View>
                <View style={styles.itemRow}>
                    <View style={styles.el}>
                        <Image source={{ uri: 'import_car' }} style={styles.image} />
                        <Text style={[globalStyles.midText, styles.elText]}>{enter_time ? moment(enter_time).format('YYYY-MM-DD HH:mm:ss') : '未入库'}</Text>
                    </View>
                    <View style={styles.el}>
                        <Image source={{ uri: 'planexport_car' }} style={styles.image} />
                        <Text style={[globalStyles.midText, styles.elText]}>{real_out_time ? moment(real_out_time).format('YYYY-MM-DD HH:mm:ss') : '未出库'}</Text>
                    </View>
                </View>
                <View style={styles.itemRow}>
                    <View style={styles.el}>
                        <Icon name='ios-car' style={styles.elIcon} type="ionicons" />
                        <Text style={[globalStyles.midText, styles.elText]}>{make_name ? make_name : ''}</Text>
                    </View>
                    <View style={styles.el}>
                        <Icon name='ios-pin' style={styles.elIcon} type="ionicons" />
                        <Text style={[globalStyles.midText, styles.elText]}>{row && col ? `${storage_name}  ${area_name}  ${row}-${col}` : '已出库'}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const renderEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Thumbnail square source={{ uri: 'emptylisticon' }} />
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无车辆</Text>
        </View>
    )
}

const ListFooterComponent = () => {
    return (
        <View style={styles.footerContainer}>
            <ActivityIndicator color={styleColor} styleAttr='Small' />
            <Text style={[globalStyles.smallText, styles.footerText]}>正在加载...</Text>
        </View>
    )
}


const CarList = props => {
    const { carListReducer: { data: { carList, isComplete } }, carListReducer, getCarListMore, getCarImageListWaiting, getCarImageList,
        parent } = props
    if (carListReducer.getCarList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    }
    else {
        return (
            <Container>
                <FlatList
                    ListEmptyComponent={renderEmpty}
                    ListFooterComponent={carListReducer.getCarListMore.isResultStatus == 1 ? ListFooterComponent : <View style={{ height: 10 }} />}
                    onEndReached={() => {
                        if (carListReducer.getCarList.isResultStatus == 2 && !isComplete) {
                            getCarListMore()
                        }
                    }}
                    data={carList}
                    onEndReachedThreshold={0.5}
                    renderItem={(param) => renderListItem({ ...param, parent,getCarImageListWaiting,getCarImageList })}
                />
            </Container>
        )
    }
}


const styles = StyleSheet.create({
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#f1f1f1'
    },
    itemRow: {
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        width: 12,
        height: 12
    },
    el: {
        flexDirection: 'row',
        alignItems: 'center'

    },
    elText: {
        paddingLeft: 5
    },
    footerContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center'
    },
    footerText: {
        paddingLeft: 10
    },
    listEmptyContainer: {
        alignItems: 'center',
        marginTop: 60
    },
    listEmptyText: {
        color: '#aaa',
        marginTop: 30
    },
    elIcon: {
        fontSize: 15,
        color: '#cccccc'
    }
})


const mapStateToProps = (state) => {
    return {
        carListReducer: state.carListReducer,
       // user: state.LoginReducer.user,
       // selectStorageForCarListReducer: state.SelectStorageForCarListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarListMore: () => {
        dispatch(carListAction.getCarListMore())
    },
    getCarImageListWaiting: (param) => {
        dispatch(imageListForCarInfoAction.getCarImageListWaiting())
    },
    getCarImageList: (param) => {
        dispatch(imageListForCarInfoAction.getCarImageList(param))
    }
})



const carInfoMapStateToProps = (state,ownProps) => {
    return {
        carInfoReducer: {
            car:state.carListReducer.data.carList.find(item => item.id == ownProps.carId)
        }
    }
}

const carInfoMapDispatchToProps = (dispatch) => ({
    exportCar: param => {
        dispatch(carInfoAction.exportCar(param,carInfoAction.changeCarListCarInfo))
    },
    moveCar: param => {
        dispatch(carInfoAction.moveCar(param,carInfoAction.changeCarListCarInfo))
    },
    sendCar: param => {
        dispatch(carInfoAction.sendCar(param, carInfoAction.changeCarListCarInfo))
    },
    importCar: param => {
        dispatch(carInfoAction.importCar(param,carInfoAction.changeCarListCarInfo))
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
    updateCarInfo:()=>{
        dispatch(submit('carInfoEditorForm'))
    }
    
})




export default connect(mapStateToProps, mapDispatchToProps)(CarList)


