import React, { Component } from 'react'
import {
    Text,
    View,
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
        this.onGetParkingId = this.onGetParkingId.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { ImporCarReducer } = nextProps
        /*getStorageParkingList 执行状态*/
        if (ImporCarReducer.importCar.isExecStatus == 1) {
            console.log('ImporCarReducer.importCar开始执行')
        } else if (ImporCarReducer.importCar.isExecStatus == 2) {
            console.log('ImporCarReducer.importCar执行完毕')
            if (ImporCarReducer.importCar.isResultStatus == 0) {
                console.log('ImporCarReducer.importCar执行成功')
            } else if (ImporCarReducer.importCar.isResultStatus == 1) {
                console.log('ImporCarReducer.importCar执行错误')
            } else if (ImporCarReducer.importCar.isResultStatus == 2) {
                console.log('ImporCarReducer.importCar执行失败', ImporCarReducer.importCar.failedMsg)
            }
        }
        /************************************************************************************************/
        return true
    }
    static defaultProps = {
        carId: 514,
        vin: '11231233453245544'
    }

    onGetParkingId(param) {
        this.props.importCar({
            requiredParam: { userId: this.props.user.userId, carId: this.props.carId },
            OptionalParam: { vin: this.props.vin },
            putParam: { parkingId: param.parkingId, storageId: param.storageId, storageName: param.storageName }
        })
    }

    render() {
        
        return (
            <View style={{ flex: 1 }}>
                {/*<TopBar title='车辆入库' />*/}
                <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
                    <Button
                        full
                        onPress={() => { Actions.SelectStorage({ chageParkingId: this.onGetParkingId }) }}
                        style={{ marginBottom: 20, backgroundColor: '#00cade' }}>
                        <Text style={{ color: '#fff' }}>入库</Text>
                    </Button>
                    <Button
                        full
                        onPress={() => { }}
                        style={{ marginBottom: 20, backgroundColor: '#00cade' }}>
                        <Text style={{ color: '#fff' }}>继续增加车辆</Text>
                    </Button>
                    <Button
                        full
                        onPress={() => { }}
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
    resetImportCarExecuteStatus: () => {
        dispatch(ImporCarAction.resetImportCarExecuteStatus())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportCar)