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
        this.state = {
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
            realEnd: ''
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
        this.setState({ ...param })
    }

    render() {
        console.log(this.state)
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
                        <View style={{ marginTop: 10, backgroundColor: '#eff3f5', borderTopWidth: 1, borderTopColor: '#00cade' }}>
                            <Select
                                isRequire={false}
                                title='品牌：'
                                value={this.state.markeName}
                                showList={RouterDirection.selectCarMake(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ makeId: param.id, markeName: param.value })}
                                defaultValue={'请选择'}
                            />
                            <Select
                                isRequire={false}
                                title='选择仓库：'
                                value={''}
                                showList={RouterDirection.selectCarMake(this.props.parent)}
                                onValueChange={(param) => this.onSelect(param)}
                                defaultValue={'请选择'}
                            />
                            <Select
                                isRequire={false}
                                title='发运地：'
                                value={this.state.routeStart}
                                showList={RouterDirection.selectCity(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                                defaultValue={'请选择'}
                            />
                            <Select
                                isRequire={false}
                                value={this.state.routeEnd}
                                title='目的地：'
                                showList={RouterDirection.selectCity(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ routeEndId: param.id, routeEnd: param.value })}
                                defaultValue={'请选择'}
                            />
                            <Select
                                isRequire={false}
                                value={this.state.entrust}
                                title='委托方：'
                                showList={RouterDirection.selectEntrust(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ entrustId: param.id, entrust: param.value })}
                                defaultValue={'请选择'}
                            />
                            <DateTimePicker
                                isRequire={false}
                                value={''}
                                title='指令时间：'
                                defaultValue={'请选择'}
                                onValueChange={(param) => this.onSelect({ orderDate: param })}
                            />
                            <DateTimePicker
                                isRequire={false}
                                value={''}
                                title='入库时间：'
                                defaultValue={'请选择'}
                                onValueChange={(param) => this.onSelect({ orderDate: param })}
                            />
                            <DateTimePicker
                                isRequire={false}
                                value={''}
                                title='出库时间：'
                                defaultValue={'请选择'}
                                onValueChange={(param) => this.onSelect({ orderDate: param })}
                            />
                        </View>
                        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                            <Button
                                full
                                onPress={() => { this.setState({ car: {} }) }}
                                style={{ marginHorizontal: 20, marginBottom: 10, backgroundColor: '#00cade' }}>
                                <Text style={{ color: '#fff' }}>重置</Text>
                            </Button>
                            <Button
                                full
                                onPress={() => { }}
                                style={{ marginHorizontal: 20, marginBottom: 10, backgroundColor: '#00cade' }}>
                                <Text style={{ color: '#fff' }}>查询</Text>
                            </Button>
                        </View>
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
