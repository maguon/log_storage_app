import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import SearchBar from '../../components/Bar/SearchBar'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { Button } from 'native-base'


import * as selectMakeAction from '../../../actions/components/select/selectMakeAction'
import * as selectCityAction from '../../../actions/components/select/selectCityAction'
import * as selectEntrustAction from '../../../actions/components/select/selectEntrustAction'
import * as selectStorageAction from '../../../actions/components/select/selectStorageAction'


import Select from '../../components/share/form/Select'
import DateTimePicker from '../../components/FormComponents/DateTimePicker'
import * as routerDirection from '../../../util/RouterDirection'
import TextBox from '../../components/FormComponents/TextBox'
import DisposableList from '../form/select/DisposableList'

class QueryCar extends Component {
    constructor(props) {
        super(props)

        this.onBarcodeReceived = this.onBarcodeReceived.bind(this)
        this.onPressIcon = this.onPressIcon.bind(this)
        this.onPressTextInput = this.onPressTextInput.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.onPressQuery = this.onPressQuery.bind(this)
        this.state = {
            queryCar: {
                vinCode: '',
                makeId: 0,
                markeName: '',
                storageId: 0,
                storageName: '',
                routeStartId: 0,
                routeStart: '',
                routeEndId: 0,
                routeEnd: '',
                entrustId: 0,
                entrust: '',
                orderStart: '',
                orderEnd: '',
                enterStart: '',
                enterEnd: '',
                realStart: '',
                realEnd: '',
            },
            vinRequire: true,
        }
    }

    onBarcodeReceived(param) {
        Actions.searchVinAtCarBlock({ vin: param })
    }
    onPressIcon() {
        Actions.searchVinAtCarBlock()
    }
    onPressTextInput() {
        Actions.searchVinAtCarBlock()
    }

    onSelect(param) {
        this.setState({ queryCar: { ...this.state.queryCar, ...param } })
    }

    onPressQuery() {
        let { vinCode, makeId, storageId, routeStartId, routeEndId, entrustId, orderStart, orderEnd, enterStart, enterEnd, realStart, realEnd } = this.state.queryCar
        let queryCar = { vinCode, makeId, storageId, routeStartId, routeEndId, entrustId, orderStart, orderEnd, enterStart, enterEnd, realStart, realEnd }
        for (item in queryCar) {
            if (!queryCar[item]) {
                delete queryCar[item]
            }
        }
        Actions.carList({ queryCar })
    }

    render() {
        const { getMakeList, getMakeListWaiting, getCityList, getCityListWaiting, getEntrustList, getEntrustListWaiting,
            getStorageList, getStorageListWaiting, parent } = this.props
        return (
            <View style={{ flex: 1 }}>
                {/* <SearchBar
                    onBarcodeReceived={this.onBarcodeReceived}
                    onPressIcon={this.onPressIcon}
                    onPressTextInput={this.onPressTextInput}
                /> */}
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={{ backgroundColor: '#fff', paddingHorizontal: 10 }}>
                            <TextBox
                                isRequire={false}
                                title='VIN:'
                                value={this.state.queryCar.vinCode}
                                defaultValue={''}
                                verifications={[{
                                    type: 'isLength',
                                    arguments: [0, 17],
                                    message: '长度不能超过17位'
                                }]}
                                onValueChange={(param) => this.onSelect({ vinCode: param })}
                                onRequire={(param) => this.setState({ vinRequire: param })}
                                placeholder='请输入vin码'
                            />
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: '#eff3f5', borderTopWidth: 1, borderTopColor: '#00cade' }}>
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
                                label='选择仓库：'
                                name='storage'
                                component={Select}
                                getList={getStorageList}
                                getListWaiting={getStorageListWaiting}
                                showList={param => {
                                    return routerDirection.listCennect(parent)({
                                        mapStateToProps: storageMapStateToProps,
                                        mapDispatchToProps: storageMapDispatchToProps,
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
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 8 }}>
                                    <DateTimePicker
                                        isRequire={false}
                                        labelStyle={{
                                            fontSize: 12,
                                            flex: 13,
                                            textAlign: 'right'
                                        }}
                                        iconSytle={{
                                            fontSize: 18,
                                            flex: 2,
                                            textAlign: 'right',
                                            color: '#7a7a7a'
                                        }}
                                        value={this.state.queryCar.orderStart}
                                        title='指令时间：'
                                        defaultValue={'请选择'}
                                        onValueChange={(param) => this.onSelect({ orderStart: param })}
                                    />
                                </View>
                                <View style={{ flex: 7 }}>
                                    <DateTimePicker
                                        isRequire={false}
                                        value={this.state.queryCar.orderEnd}
                                        title='至：'
                                        defaultValue={'请选择'}
                                        onValueChange={(param) => this.onSelect({ orderEnd: param })}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 8 }}>
                                    <DateTimePicker
                                        isRequire={false}
                                        value={this.state.queryCar.enterStart}
                                        labelStyle={{
                                            fontSize: 12,
                                            flex: 13,
                                            textAlign: 'right'
                                        }}
                                        iconSytle={{
                                            fontSize: 18,
                                            flex: 2,
                                            textAlign: 'right',
                                            color: '#7a7a7a'
                                        }}
                                        title='入库时间：'
                                        defaultValue={'请选择'}
                                        onValueChange={(param) => this.onSelect({ enterStart: param })}
                                    />
                                </View>
                                <View style={{ flex: 7 }}>
                                    <DateTimePicker
                                        isRequire={false}
                                        value={this.state.queryCar.enterEnd}
                                        title='至：'
                                        defaultValue={'请选择'}
                                        onValueChange={(param) => this.onSelect({ enterEnd: param })}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 8 }}>
                                    <DateTimePicker
                                        isRequire={false}
                                        value={this.state.queryCar.realStart}
                                        labelStyle={{
                                            fontSize: 12,
                                            flex: 13,
                                            textAlign: 'right'
                                        }}
                                        iconSytle={{
                                            fontSize: 18,
                                            flex: 2,
                                            textAlign: 'right',
                                            color: '#7a7a7a'
                                        }}
                                        title='出库时间：'
                                        defaultValue={'请选择'}
                                        onValueChange={(param) => this.onSelect({ realStart: param })}
                                    />
                                </View>
                                <View style={{ flex: 7 }}>
                                    <DateTimePicker
                                        isRequire={false}
                                        value={this.state.queryCar.realEnd}
                                        title='至：'
                                        defaultValue={'请选择'}
                                        onValueChange={(param) => this.onSelect({ realEnd: param })}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ marginVertical: 20, flexDirection: 'row', justifyContent: 'center', marginHorizontal: 20 }}>
                            <Button
                                full
                                onPress={() => {
                                    this.setState({
                                        queryCar: {
                                            vinCode: '', makeId: 0, markeName: '', storageId: 0, storageName: '', routeStartId: 0, routeStart: '',
                                            routeEndId: 0, routeEnd: '', entrustId: 0, entrust: '', orderStart: '', orderEnd: '', enterStart: '', enterEnd: '', realStart: '', realEnd: ''
                                        }
                                    })
                                }}
                                style={{ flex: 1, backgroundColor: '#00cade' }}>
                                <Text style={{ color: '#fff' }}>重置</Text>
                            </Button>
                            <Button
                                full
                                disabled={!this.state.vinRequire}
                                style={this.state.vinRequire ? styles.btnSytle : styles.btnDisabledSytle}
                                onPress={this.onPressQuery}>
                                <Text style={{ color: '#fff' }}>查询</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
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
                    return { id: item.id,value:item.short_name }
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
                    return { id: item.id ,value:item.storage_name}
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
        form: 'queryCarForm'
    })(QueryCar)
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



