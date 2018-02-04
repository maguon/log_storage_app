import React, { Component } from 'react'
import { Text, View, Dimensions, TextInput, StyleSheet,InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { Button, Container, Content, Input } from 'native-base'

import * as selectMakeAction from '../../../actions/components/select/selectMakeAction'
import * as selectCityAction from '../../../actions/components/select/selectCityAction'
import * as selectEntrustAction from '../../../actions/components/select/selectEntrustAction'
import * as selectStorageAction from '../../../actions/components/select/selectStorageAction'
import * as carListAction from '../../../actions/views/CarListAction'

import globalStyles ,{ styleColor} from '../../GlobalStyles'
import Select from '../../components/share/form/Select'
import DatePicker from '../../components/share/form/DatePicker'
import * as routerDirection from '../../../util/RouterDirection'
import TextBox from '../../components/FormComponents/TextBox'
import DisposableList from '../form/select/DisposableList'

const { width } = Dimensions.get('window')

const VinText = props => {
    const { input: { onChange, ...restProps }, meta: { error, touched } } = props
    return (
        <View style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, marginTop: 10 }}>
            <Text style={[globalStyles.largeText, globalStyles.styleColor]}>vin：</Text>
            <Input
                placeholder='请输入vin'
                placeholderTextColor='#ddd'
                onChangeText={onChange}
                style={[globalStyles.largeText, globalStyles.styleColor]}
                {...restProps} />
        </View>
    )
}

const QueryCar = props => {
    const { getMakeList, getMakeListWaiting, getCityList, getCityListWaiting, getEntrustList, getEntrustListWaiting,
        getStorageList, getStorageListWaiting, parent, reset, handleSubmit } = props
    return (
        <Container>
            <Content showsVerticalScrollIndicator={false}>
                <Field
                    name='vinCode'
                    component={VinText}
                />
                <View style={styles.body}>
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
                                title:'品牌',
                                ...param
                            })
                        }} />
                    <Field
                        label='选择仓库：'
                        name='storage'
                        component={Select}
                        getList={getStorageList}
                        getListWaiting={getStorageListWaiting}
                        showList={param => {
                            return routerDirection.listCennectNav(parent)({
                                mapStateToProps: storageMapStateToProps,
                                mapDispatchToProps: storageMapDispatchToProps,
                                List: DisposableList,
                                title:'仓库',
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
                                title:'发运地',
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
                            return routerDirection.listCennectNav(parent)({
                                mapStateToProps: cityMapStateToProps,
                                mapDispatchToProps: cityMapDispatchToProps,
                                List: DisposableList,
                                title:'目的地',
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
                                title:'委托方',
                                ...param
                            })
                        }} />
                    <View style={{ flexDirection: 'row' }}>
                        <Field
                            label='指令时间：'
                            name='orderStart'
                            component={DatePicker}
                            itemStyle={{ width: width / 2 - 30 }} />
                        <Field
                            label='至：'
                            name='orderEnd'
                            component={DatePicker}
                            itemStyle={{ width: width / 2 - 30 }} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Field
                            label='入库时间：'
                            name='enterStart'
                            component={DatePicker}
                            itemStyle={{ width: width / 2 - 30 }} />
                        <Field
                            label='至：'
                            name='enterEnd'
                            component={DatePicker}
                            itemStyle={{ width: width / 2 - 30 }} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Field
                            label='出库时间：'
                            name='realStart'
                            component={DatePicker}
                            itemStyle={{ width: width / 2 - 30 }} />
                        <Field
                            label='至：'
                            name='realEnd'
                            component={DatePicker}
                            itemStyle={{ width: width / 2 - 30 }} />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        full
                        onPress={reset}
                        style={[globalStyles.styleBackgroundColor, styles.button]}>
                        <Text style={[globalStyles.midText, styles.buttonTitle]}>重置</Text>
                    </Button>
                    <Button
                        full
                        style={[globalStyles.styleBackgroundColor, styles.button]}
                        onPress={handleSubmit}>
                        <Text style={[globalStyles.midText, styles.buttonTitle]}>查询</Text>
                    </Button>
                </View>
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

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
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
    getStorageList: () => {
        dispatch(selectStorageAction.getStorageList())
    },
    getStorageListWaiting: () => {
        dispatch(selectStorageAction.getStorageListWaiting())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'queryCarForm',
        onSubmit: (values, dispatch) => {
            dispatch(carListAction.getCarListWaiting())
            Actions.carList()
            InteractionManager.runAfterInteractions(()=>{
                dispatch(carListAction.getCarList(values))
            })
        }
    })(QueryCar)
)


const styles = StyleSheet.create({
    button: {
        flex: 1,
        margin: 10
    },
    buttonTitle: {
        color: '#fff'
    },
    buttonContainer: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    body: {
        marginTop: 10,
        backgroundColor: '#eff3f5',
        borderTopWidth: 1,
        borderColor:styleColor
    }
})