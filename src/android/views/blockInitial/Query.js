import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import SearchBar from '../../components/Bar/SearchBar'
import { Actions } from 'react-native-router-flux'
import Select from '../../components/FormComponents/Select'
import DateTimePicker from '../../components/FormComponents/DateTimePicker'
import * as RouterDirection from '../../../util/RouterDirection'
import { Button } from 'native-base'

class Query extends Component {
    constructor(props) {
        super(props)

        this.onBarcodeReceived = this.onBarcodeReceived.bind(this)
        this.onPressIcon = this.onPressIcon.bind(this)
        this.onPressTextInput = this.onPressTextInput.bind(this)
        this.onSelect = this.onSelect.bind(this)

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
                        <View style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
                            <Text style={{ color: '#00cade', flex: 4, textAlign: 'right' }}>vin：</Text>
                            <Text style={{ color: '#00cade', flex: 13 }}></Text>
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                            <Select
                                isRequire={false}
                                title='品牌：'
                                value={''}
                                showList={RouterDirection.selectCarMake(this.props.parent)}
                                onValueChange={(param) => this.onSelect(param)}
                                defaultValue={'请选择'}
                            />
                            <Select
                                isRequire={false}
                                value={''}
                                title='委托方：'
                                showList={RouterDirection.selectEntrust(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ entrustId: param.id })}
                                defaultValue={'请选择'}
                            /></View>
                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                            <Select
                                isRequire={false}
                                title='起始城市：'
                                value={''}
                                showList={RouterDirection.selectCity(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                                defaultValue={'请选择'}
                            />
                            <Select
                                isRequire={false}
                                value={''}
                                title='发货地址：'
                                showList={(param) => RouterDirection.selectBaseAddr(this.props.parent)({ cityId: route_start_id, ...param })}
                                onValueChange={(param) => this.onSelect({ baseAddrId: param.id })}
                                defaultValue={'请选择'}
                            />
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                            <Select
                                isRequire={false}
                                value={''}
                                title='目的城市：'
                                showList={RouterDirection.selectCity(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ routeEndId: param.id, routeEnd: param.value })}
                                defaultValue={'请选择'}
                            />
                            <Select
                                isRequire={false}
                                value={''}
                                title='经销商：'
                                showList={(param) => RouterDirection.selectReceive(this.props.parent)({ cityId: route_end_id, ...param })}
                                onValueChange={(param) => this.onSelect({ receiveId: param.id })}
                                defaultValue={'请选择'}
                            />
                            <DateTimePicker
                                isRequire={false}
                                value={''}
                                title='指令时间：'
                                defaultValue={'请选择'}
                                onValueChange={(param) => this.onSelect({ orderDate: param })}
                            />
                        </View>
                        <Button
                            block
                            onPress={() => { }}
                            style={{ marginHorizontal: 20, marginBottom: 10, backgroundColor: '#00cade' }}>
                            <Text style={{ color: '#fff' }}>查询</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }

}


const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => ({


})

export default connect(mapStateToProps, mapDispatchToProps)(Query)
