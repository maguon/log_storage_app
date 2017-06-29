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

class ImportCar extends Component {
    constructor(props) {
        super(props)
        this.onGetParkingId = this.onGetParkingId.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { ImporCarReducer } = nextProps
        /*getStorageParkingList 执行状态*/
        if (ImporCarReducer.getStorageParkingList.isExecStatus == 1) {
            console.log('ImporCarReducer.getStorageParkingList开始执行')
        } else if (ImporCarReducer.getStorageParkingList.isExecStatus == 2) {
            console.log('ImporCarReducer.getStorageParkingList执行完毕')
            if (ImporCarReducer.getStorageParkingList.isResultStatus == 0) {
                console.log('ImporCarReducer.getStorageParkingList执行成功')
            } else if (ImporCarReducer.getStorageParkingList.isResultStatus == 1) {
                console.log('ImporCarReducer.getStorageParkingList执行错误')
            } else if (ImporCarReducer.getStorageParkingList.isResultStatus == 2) {
                console.log('ImporCarReducer.getStorageParkingList执行失败')
            }
        }
        /************************************************************************************************/
        return true
    }

    onGetParkingId(param) {
        console.log(param)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TopBar title='车辆入库' />
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
                        style={{ backgroundColor: '#00cade' }}>
                        <Text style={{ color: '#fff' }}>返回车辆列表</Text>
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
    pushCarImage: (param) => {
        dispatch(ImporCarAction.pushCarImage(param))
    },
    resetDelImage: () => {
        dispatch(ImporCarAction.resetDelImage())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportCar)