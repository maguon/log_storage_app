import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import CarCamera from '../components/CarCamera/CarCamera'
import * as RouterDirection from '../../util/RouterDirection'
import Select from '../components/FormComponents/Select'
import DateTimePicker from '../components/FormComponents/DateTimePicker'


export default class CarInformation extends Component {
    constructor(props) {
        super(props)
        this.renderImported = this.renderImported.bind(this)
        this.renderExported = this.renderExported.bind(this)
        this.renderNeverImport = this.renderNeverImport.bind(this)
        this.onPressMove = this.onPressMove.bind(this)
        this.onPressImport = this.onPressImport.bind(this)
        this.onPressExport = this.onPressExport.bind(this)
        this.onPressExportOk = this.onPressExportOk.bind(this)
        this.onPressExportCancel = this.onPressExportCancel.bind(this)
    }

    componentWillMount() {
        console.log(this.props.car)
    }

    static defaultProps = {
        car: {}
    }

    onPressMove() {

    }

    onPressImport() {

    }

    onPressExport() {

    }

    onReceivePhote(param) {
        console.log(param)
    }

    onSelect(param) {
        console.log(param)
    }

    onPressExportOk() {

    }


    onPressExportCancel() {

    }

    renderImported() {
        let { vin, make_name, en_short_name, re_short_name, addr_name, route_start, route_end, order_date } = this.props.car
        return (
            <View style={{ flex: 1, backgroundColor: '#eee' }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                            <Text>vin:{vin}</Text>
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                            <Select
                                isRequire={false}
                                title='品牌：'
                                showList={RouterDirection.selectCarMake(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ makeId: param.id, makeName: param.value })}
                                defaultValue='请选择'
                            />
                            <Select
                                isRequire={false}
                                title='委托方：'
                                showList={RouterDirection.selectEntrust(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ entrustId: param.id })}
                                defaultValue='请选择'
                            />
                            <Select
                                isRequire={false}
                                title='经销商：'
                                showList={RouterDirection.selectReceive(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ receiveId: param.id })}
                                defaultValue='请选择'
                            />
                            <Select
                                isRequire={false}
                                title='起始城市：'
                                showList={RouterDirection.selectCity(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                                defaultValue='请选择'
                            />
                            <Select
                                isRequire={false}
                                title='发货地址：'
                                showList={RouterDirection.selectBaseAddr(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ baseAddrId: param.id })}
                                defaultValue='请选择'
                            />
                            <Select
                                isRequire={false}
                                title='目的城市：'
                                showList={RouterDirection.selectCity(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ routeEndId: param.id, routeEnd: param.value })}
                                defaultValue='请选择'
                            />
                            <DateTimePicker
                                isRequire={false}
                                title='指令时间：'
                                defaultValue='请选择'
                                onValueChange={(param) => this.onSelect({ orderDate: param })}
                            />
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                            <Text>当前位置:一号仓库5-5</Text>
                        </View>
                        <CarCamera
                            images={[]}
                            postImage={this.onReceivePhote}
                            showImagePage={Actions.ImagePageForCarInfo} />
                        <Button full onPress={this.onPressMove}>
                            <Text>移位</Text>
                        </Button>
                        <Button full onPress={this.onPressExport}>
                            <Text>出库</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }

    renderExported() {
        let { vin, make_name, en_short_name, re_short_name, addr_name, route_start, route_end, order_date } = this.props.car
        return (
            <View style={{ flex: 1, backgroundColor: '#eee' }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                            <Text>vin:{vin}</Text>
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                            <Text>品牌:{make_name}</Text>
                            <Text>委托方:{en_short_name}</Text>
                            <Text>经销商:{re_short_name}</Text>
                            <Text>起始城市:{route_start}</Text>
                            <Text>发货地址:{addr_name}</Text>
                            <Text>目的城市:{route_end}</Text>
                            <Text>指令时间:{order_date}</Text>
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                            <Text>当前位置:已出库</Text>
                        </View>
                        <CarCamera
                            images={[]}
                            postImage={this.onReceivePhote}
                            showImagePage={Actions.ImagePageForCarInfo} />
                        <Button full onPress={this.onPressImport}>
                            <Text>入库</Text>
                        </Button>

                    </View>
                </ScrollView>
            </View>
        )
    }

    renderNeverImport() {
        let { vin, make_name, en_short_name, re_short_name, addr_name, route_start, route_end, order_date } = this.props.car
        return (
            <View style={{ flex: 1, backgroundColor: '#eee' }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                            <Text>vin:{vin}</Text>
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                            <Select
                                isRequire={false}
                                title='品牌：'
                                showList={RouterDirection.selectCarMake(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ makeId: param.id, makeName: param.value })}
                                defaultValue={make_name}
                            />
                            <Select
                                isRequire={false}
                                title='委托方：'
                                showList={RouterDirection.selectEntrust(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ entrustId: param.id })}
                                defaultValue={en_short_name}
                            />
                            <Select
                                isRequire={false}
                                title='经销商：'
                                showList={RouterDirection.selectReceive(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ receiveId: param.id })}
                                defaultValue={re_short_name}
                            />
                            <Select
                                isRequire={false}
                                title='起始城市：'
                                showList={RouterDirection.selectCity(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ routeStartId: param.id, routeStart: param.value })}
                                defaultValue={route_start}
                            />
                            <Select
                                isRequire={false}
                                title='发货地址：'
                                showList={RouterDirection.selectBaseAddr(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ baseAddrId: param.id })}
                                defaultValue={addr_name}
                            />
                            <Select
                                isRequire={false}
                                title='目的城市：'
                                showList={RouterDirection.selectCity(this.props.parent)}
                                onValueChange={(param) => this.onSelect({ routeEndId: param.id, routeEnd: param.value })}
                                defaultValue={route_end}
                            />
                            <DateTimePicker
                                isRequire={false}
                                title='指令时间：'
                                defaultValue={order_date}
                                onValueChange={(param) => this.onSelect({ orderDate: param })}
                            />
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                            <Text>当前位置:未入库</Text>
                        </View>
                        <CarCamera
                            images={[]}
                            postImage={this.onReceivePhote}
                            showImagePage={Actions.ImagePageForCarInfo} />
                        <Button full onPress={this.onPressImport}>
                            <Text>入库</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>

        )
    }

    render() {
        console.log(this.props)
        return (
            <View style={{ flex: 1 }}>
                {!this.props.car.rel_status && this.renderNeverImport()}
                {this.props.car.rel_status == 1 && this.renderImported()}
                {this.props.car.rel_status == 2 && this.renderExported()}
            </View>
        )
    }
}
