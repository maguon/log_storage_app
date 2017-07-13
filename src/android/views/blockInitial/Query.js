import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import SearchBar from '../../components/Bar/SearchBar'
import { Actions } from 'react-native-router-flux'
import Select from '../../components/FormComponents/Select'
import DateTimePicker from '../../components/FormComponents/DateTimePicker'
import * as RouterDirection from '../../../util/RouterDirection'
import { Button } from 'native-base'
import TextBox from '../../components/FormComponents/TextBox'

export default class Query extends Component {
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
        Actions.carList({queryCar})
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <SearchBar
                    onBarcodeReceived={this.onBarcodeReceived}
                    onPressIcon={this.onPressIcon}
                    onPressTextInput={this.onPressTextInput}
                />
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
                            <Select
                                isRequire={false}
                                title='品牌：'
                                value={this.state.queryCar.markeName}
                                showList={RouterDirection.selectCarMake(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ makeId: param.id, markeName: param.value })}
                                defaultValue={'请选择'}
                            />
                            <Select
                                isRequire={false}
                                title='选择仓库：'
                                value={this.state.queryCar.storageName}
                                showList={() => RouterDirection.selectStorage(this.props.parent)({
                                    routerIndex: 0,
                                    popName: this.props.name,
                                    routerList: [],
                                    onSelect: this.onSelect
                                })}
                                onValueChange={() => { }}
                                defaultValue={'请选择'}
                            />
                            <Select
                                isRequire={false}
                                title='发运地：'
                                value={this.state.queryCar.routeStart}
                                showList={RouterDirection.selectCity(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                                defaultValue={'请选择'}
                            />
                            <Select
                                isRequire={false}
                                value={this.state.queryCar.routeEnd}
                                title='目的地：'
                                showList={RouterDirection.selectCity(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ routeEndId: param.id, routeEnd: param.value })}
                                defaultValue={'请选择'}
                            />
                            <Select
                                isRequire={false}
                                value={this.state.queryCar.entrust}
                                title='委托方：'
                                showList={RouterDirection.selectEntrust(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ entrustId: param.id, entrust: param.value })}
                                defaultValue={'请选择'}
                            />
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 8 }}>
                                    <DateTimePicker
                                        isRequire={false}
                                        labelStyle={{
                                            fontSize: 14,
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
                                            fontSize: 14,
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
                                            fontSize: 14,
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



