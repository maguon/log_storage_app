import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import { reduxForm, Field, getFormValues } from 'redux-form'
import globalStyles from '../../GlobalStyles'
import * as selectMakeAction from '../../../actions/components/select/selectMakeAction'
import * as selectCityAction from '../../../actions/components/select/selectCityAction'
import * as selectEntrustAction from '../../../actions/components/select/selectEntrustAction'
import * as selectBaseAddrAction from '../../../actions/components/select/selectBaseAddrAction'
import * as selectReceiveAction from '../../../actions/components/select/selectReceiveAction'
import * as carInfoEditorAction from '../../../actions/components/carInfo/CarInfoEditorAction'
import Select from '../../components/share/form/Select'
import DatePicker from '../../components/share/form/DatePicker'
import DisposableList from '../../views/form/select/DisposableList'
import * as routerDirection from '../../../util/RouterDirection'
import RichTextBox from '../../components/share/form/RichTextBox'

const CarInfoEditor = props => {
    const { car: { vin }, car, parent, getMakeList, getMakeListWaiting, getCityList, getCityListWaiting,
        getEntrustList, getEntrustListWaiting, getReceiveList, getReceiveListWaiting, getBaseAddrList,
        getBaseAddrListWaiting,
        carInfoEditorFormValues = { routeStart: {}, routeEnd: {}, make: {}, entrust: {}, baseAddr: {}, receive: {} } } = props
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={[globalStyles.largeText, globalStyles.styleColor, styles.headerText]}><Text style={styles.ItemTilte}>vin：</Text>{vin ? `${vin}` : ''}</Text>
            </View>
            <Field
                label='品牌：'
                name='make'
                component={Select}
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
            {carInfoEditorFormValues.routeStart.id && <Field
                label='发货地址：'
                name='baseAddr'
                component={Select}
                getList={() => getBaseAddrList({ cityId: carInfoEditorFormValues.routeStart.id })}
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

            {carInfoEditorFormValues.routeEnd.id && <Field
                label='经销商：'
                name='receive'
                component={Select}
                getList={() => getReceiveList({ cityId: carInfoEditorFormValues.routeEnd.id })}
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
            <Field
                label='指令时间：'
                name='orderDate'
                component={DatePicker} />
            <View style={styles.item}>
                <Text style={globalStyles.midText}><Text>当前位置：</Text>{car.storage_name ? `${car.storage_name}` : ''}{car.area_name ? `-${car.area_name}` : ''}{car.row && car.col ? `(${car.row}-${car.col})` : ''}</Text>
            </View>
            <Field label='备注：' name='remark' component={RichTextBox} />
        </View>
    )
}


const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        paddingVertical: 15,
        paddingRight: 15,
        borderBottomWidth: 0.3,
        borderColor: '#ccc',
    },
    item: {
        flexDirection: 'row',
        marginLeft: 15,
        paddingVertical: 15,
        paddingRight: 15,
        borderBottomWidth: 0.3,
        borderColor: '#ccc',
    },
    headerText: {
        paddingLeft: 10
    },
    ItemTilte: {
        fontWeight: 'bold'
    }
})

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



const mapStateToProps = (state, ownProps) => {
    const { car } = ownProps
    let orderDate
 
   

    if (car.order_date) {
        if(car.order_date.indexOf(':')>0){
            orderDate = moment(car.order_date).format('YYYY-MM-DD')
        }else {
            orderDate = car.order_date
        }

           
    } else {
        orderDate = ''
    }
    return {
        initialValues: {
            make: { id: car.make_id, value: car.make_name },
            routeStart: { id: car.route_start_id, value: car.route_start },
            routeEnd: { id: car.route_end_id, value: car.route_end },
            entrust: { id: car.entrust_id, value: car.en_short_name },
            baseAddr: { id: car.base_addr_id, value: car.addr_name },
            receive: { id: car.receive_id, value: car.receive_name },
            orderDate,
            remark: car.remark
        },
        carInfoEditorFormValues: getFormValues('carInfoEditorForm')(state)
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
        form: 'carInfoEditorForm',
        onSubmit: (values, dispatch, props) => {
            dispatch(carInfoEditorAction.updateCarInfo({ ...values, carId: props.car.id, vin: props.car.vin }))
        }
    })(CarInfoEditor))