import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as CarListAction from '../../actions/CarListAction'
import { Actions } from 'react-native-router-flux'
import CarListItem from '../components/CarList/CarListItem'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    RefreshControl,
    FlatList,
    Button,
    TouchableHighlight
} from 'react-native'

class CarList extends Component {
    constructor(props) {
        super(props)
        this.getCarList = this.getCarList.bind(this)
        this.getCarListMore = this.getCarListMore.bind(this)
    }
    componentWillMount() {
        console.log(this.props)
        if (this.props.queryCar) {
            this.getCarList(this.props.queryCar)
        }
        else {
            this.getCarList({})
        }
    }

    getCarList(param) {
        // let { userId } = this.props.user
        // let { selectStorageListForCarList } = this.props.selectStorageForCarListReducer
        // let param = {
        //     optionalParam: {
        //         start: 0,
        //         size: 20,
        //         active: 1,
        //         relStatus: 1
        //     }
        // }
        // if (storageId != 0)
        //     param.optionalParam.storageId = storageId
        this.props.getCarList({ optionalParam: { ...param, start: 0, size: 20, active: 1, } })
    }

    componentWillReceiveProps(nextProps) {
        let { carListReducer } = nextProps
        let { selectStorageForCarListReducer } = nextProps
        /*getCarList 执行状态*/
        if (carListReducer.getCarList.isExecStatus == 1) {
            console.log('carListReducer.getCarList开始执行')
        } else if (carListReducer.getCarList.isExecStatus == 2) {
            console.log('carListReducer.getCarList执行完毕')
            if (carListReducer.getCarList.isResultStatus == 0) {
                console.log('carListReducer.getCarList执行成功')
                this.props.resetGetCarList()
            } else if (carListReducer.getCarList.isResultStatus == 1) {
                console.log('carListReducer.getCarList执行错误')
                this.props.resetGetCarList()
            } else if (carListReducer.getCarList.isResultStatus == 2) {
                console.log('carListReducer.getCarList执行失败')
                this.props.resetGetCarList()
            }
        }

        /************************************************************************************************/


        /*getCarListMore 执行状态*/
        // if (carListReducer.getCarListMore.isExecStatus == 1) {
        //     console.log('carListReducer.getCarListMore开始执行')
        // } else if (carListReducer.getCarListMore.isExecStatus == 2) {
        //     console.log('carListReducer.getCarListMore执行完毕')
        //     if (carListReducer.getCarListMore.isResultStatus == 0) {
        //         console.log('carListReducer.getCarListMore执行成功没有到底')
        //     } else if (carListReducer.getCarListMore.isResultStatus == 1) {
        //         console.log('carListReducer.getCarListMore执行错误')
        //     } else if (carListReducer.getCarListMore.isResultStatus == 2) {
        //         console.log('carListReducer.getCarListMore执行失败')
        //     } else if (carListReducer.getCarListMore.isResultStatus == 3) {
        //         console.log('carListReducer.getCarListMore已经到底')
        //     }
        // }

        /************************************************************************************************/

        if (selectStorageForCarListReducer.selectStorageListForCarList.id != this.props.selectStorageForCarListReducer.selectStorageListForCarList.id) {

            // console.log('刷新', selectStorageForCarListReducer.selectStorageListForCarList.id)
            this.getCarList(selectStorageForCarListReducer.selectStorageListForCarList.id)
        }
        else {
            // console.log('不刷新', selectStorageForCarListReducer.selectStorageListForCarList.id)
        }
        return true
    }

    getCarListMore() {
        let { userId } = this.props.user
        let { carList } = this.props.carListReducer.getCarList.data
        let { selectStorageListForCarList } = this.props.selectStorageForCarListReducer
        let param = {
            // requiredParam: {
            //     userid: userId
            // },
            optionalParam: {
                start: carList.length,
                size: 20,
                active: 1,
                relStatus: 1
            }
        }
        if (selectStorageListForCarList.id != 0)
            param.optionalParam.storageId = selectStorageListForCarList.id
        // console.log(param)
        this.props.getCarListMore(param)
    }

    render() {
        let { carList } = this.props.carListReducer.getCarList.data
        let { selectStorageListForCarList } = this.props.selectStorageForCarListReducer
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    colors={'#00cade'}
                    onEndReached={this.getCarListMore}
                    data={carList}
                    onEndReachedThreshold={1}
                    renderItem={({ item }) => <CarListItem car={item} key={item.r_id} />}
                />
            </View>
            /*<CarListLayout
                cars={carList}
                getCarListWaiting={this.props.carListReducer.getCarList.isExecStatus == 1}
                getCarListMore={this.getCarListMore}
                storageName={selectStorageListForCarList.storage_name}
                changeSearchVin={this.props.changeSearchVin} />*/
        )
    }
}

const mapStateToProps = (state) => {
    return {
        carListReducer: state.CarListReducer,
        user: state.LoginReducer.user,
        selectStorageForCarListReducer: state.SelectStorageForCarListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarList: (param) => {
        dispatch(CarListAction.getCarList(param))
    },
    getCarListMore: (param) => {
        dispatch(CarListAction.getCarListMore(param))
    },
    resetGetCarList: () => {
        dispatch(CarListAction.resetGetCarList())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CarList)