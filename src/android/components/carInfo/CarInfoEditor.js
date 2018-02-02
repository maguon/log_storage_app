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
import Select from '../../components/share/form/Select'
import DisposableList from '../../views/form/select/DisposableList'
import * as routerDirection from '../../../util/RouterDirection'

const CarInfoEditor = props => {
    const { car: { vin }, parent, getMakeList, getMakeListWaiting, getCityList, getCityListWaiting,
        getEntrustList, getEntrustListWaiting, getReceiveList, getReceiveListWaiting, getBaseAddrList,
        getBaseAddrListWaiting, carInfoEditorFormValues } = props
    console.log('carInfoEditorFormValues', carInfoEditorFormValues)
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
                    return routerDirection.listCennect(parent)({
                        mapStateToProps: makeMapStateToProps,
                        mapDispatchToProps: makeMapDispatchToProps,
                        List: DisposableList,
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
                    return routerDirection.listCennect(parent)({
                        mapStateToProps: entrustMapStateToProps,
                        mapDispatchToProps: entrustMapDispatchToProps,
                        List: DisposableList,
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
                    return routerDirection.listCennect(parent)({
                        mapStateToProps: cityMapStateToProps,
                        mapDispatchToProps: cityMapDispatchToProps,
                        List: DisposableList,
                        ...param
                    })
                }} />
            <Field
                label='发货地址：'
                name='baseAddr'
                component={Select}
                getList={() => getBaseAddrList({ cityId: carInfoEditorFormValues.routeStart.id })}
                getListWaiting={getBaseAddrListWaiting}
                showList={param => {
                    return routerDirection.listCennect(parent)({
                        mapStateToProps: baseAddrMapStateToProps,
                        mapDispatchToProps: baseAddrMapDispatchToProps,
                        List: DisposableList,
                        ...param
                    })
                }} />

            <Field
                label='目的地：'
                name='routeEnd'
                component={Select}
                getList={getCityList}
                getListWaiting={getCityListWaiting}
                showList={param => {
                    return routerDirection.listCennect(parent)({
                        mapStateToProps: cityMapStateToProps,
                        mapDispatchToProps: cityMapDispatchToProps,
                        List: DisposableList,
                        ...param
                    })
                }} />
            <Field
                label='经销商：'
                name='receive'
                component={Select}
                getList={() => getReceiveList({ cityId: carInfoEditorFormValues.routeEnd.id })}
                getListWaiting={getReceiveListWaiting}
                showList={param => {
                    return routerDirection.listCennect(parent)({
                        mapStateToProps: receiveMapStateToProps,
                        mapDispatchToProps: receiveMapDispatchToProps,
                        List: DisposableList,
                        ...param
                    })
                }} />
            
            {/* <View style={styles.item}>
                <Text style={globalStyles.midText}><Text style={styles.ItemTilte}>指令时间：</Text>{order_date ? `${moment(order_date).format('YYYY-MM-DD')}` : ''}</Text>
            </View>
            <View style={styles.item}>
                <Text style={globalStyles.midText}><Text style={styles.ItemTilte}>当前位置：</Text>{addr_name ? `${addr_name}` : ''}</Text>
            </View>
            <View style={styles.item}>
                <Text style={globalStyles.midText}><Text style={styles.ItemTilte}>备注：</Text>{remark ? `${remark}` : ''}</Text>
            </View> */}
        </View>
    )
}


const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderColor: '#777',
    },
    itemContainer: {
        paddingVertical: 5
    },
    item: {
        paddingVertical: 5,
        flexDirection: 'row'
    },
    headerIcon: {
        fontSize: 25
    },
    headerText: {
        paddingLeft: 10
    },
    ItemTilte: {
        fontWeight: 'bold'
    },
    container: {

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
    console.log('car', car)
    return {
        initialValues: {
            make: { id: car.make_id, value: car.make_name },
            routeStart: { id: car.route_start_id, value: car.route_start },
            routeEnd: { id: car.route_end_id, value: car.route_end },
            entrust: { id: car.entrust_id, value: car.en_short_name },
            baseAddr: { id: car.base_addr_id, value: car.addr_name },
            receive: { id: car.receive_id, value: car.receive_name }
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
        form: 'carInfoEditorForm'
    })(CarInfoEditor))



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