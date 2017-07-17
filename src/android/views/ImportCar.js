import React, { Component } from 'react'
import {
    Text,
    View,
    ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import TopBar from '../components/Bar/TopBar'
import { Button } from 'native-base'

import * as ImporCarAction from '../../actions/ImporCarAction'
import { Actions } from 'react-native-router-flux'
import * as RouterDirection from '../../util/RouterDirection'

class ImportCar extends Component {
    constructor(props) {
        super(props)
        this.onPressImport = this.onPressImport.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        let { ImporCarReducer } = nextProps
        /*importCar 执行状态*/

        if (ImporCarReducer.importCar.isExecStatus == 1) {
        } else if (ImporCarReducer.importCar.isExecStatus == 2) {
            if (ImporCarReducer.importCar.isResultStatus == 0) {
                ToastAndroid.showWithGravity('入库成功', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetImportCar()
            } else if (ImporCarReducer.importCar.isResultStatus == 1) {
                ToastAndroid.showWithGravity('系统错误', ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetImportCar()
            } else if (ImporCarReducer.importCar.isResultStatus == 2) {
                ToastAndroid.showWithGravity(`入库失败:${ImporCarReducer.importCar.failedMsg}`, ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetImportCar()
            }
            else if (ImporCarReducer.importCar.isResultStatus == 3) {
                ToastAndroid.showWithGravity(`服务器错误`, ToastAndroid.SHORT, ToastAndroid.CENTER)
                this.props.resetImportCar()
            }
        }
        /************************************************************************************************/
    }
    static defaultProps = {
        carId: 0,
        vin: ''
    }

    onPressImport(param) {
        this.props.importCar({
            requiredParam: { userId: this.props.user.userId, carId: this.props.carId },
            OptionalParam: { vin: this.props.vin },
            putParam: { parkingId: param.parkingId, storageId: param.storageId, storageName: param.storageName }
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
                    <Button
                        full
                        onPress={() => RouterDirection.selectStorage(this.props.parent)({
                            routerIndex: 0,
                            popName: this.props.parent,
                            routerList: [RouterDirection.selectRow(this.props.parent), RouterDirection.selectColumn(this.props.parent)],
                            onSelect: this.onPressImport
                        })}
                        style={{ marginBottom: 20, backgroundColor: '#00cade' }}>
                        <Text style={{ color: '#fff' }}>入库</Text>
                    </Button>
                    <Button
                        full
                        onPress={() => Actions.pop({ popNum: 2 })}
                        style={{ marginBottom: 20, backgroundColor: '#00cade' }}>
                        <Text style={{ color: '#fff' }}>继续增加车辆</Text>
                    </Button>
                    <Button
                        full
                        onPress={() => Actions.pop({ popNum: 4 })}
                        style={{ backgroundColor: '#00cade' }}>
                        <Text style={{ color: '#fff' }}>返回</Text>
                    </Button>
                </View>
            </View>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        ImporCarReducer: state.ImporCarReducer,
        user: state.LoginReducer.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    importCar: (param) => {
        dispatch(ImporCarAction.importCar(param))
    },
    resetImportCar: () => {
        dispatch(ImporCarAction.resetImportCar())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportCar)