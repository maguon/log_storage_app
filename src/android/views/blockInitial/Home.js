import React, { Component } from 'react'
import { connect } from 'react-redux'
import LayoutHome from '../../layout/Home'
import * as HomeAction from '../../../actions/HomeAction'
import { Actions } from 'react-native-router-flux'

class Home extends Component {
    constructor(props) {
        super(props)

        this.onBarcodeReceived = this.onBarcodeReceived.bind(this)
        this.onPressIcon = this.onPressIcon.bind(this)
        this.onPressTextInput = this.onPressTextInput.bind(this)
        this.onPressItem = this.onPressItem.bind(this)
        this.getData = this.getData.bind(this)
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        let now = new Date()
        year = now.getFullYear()
        month = now.getMonth() + 1
        month = month >= 10 ? month : `0${month}`
        day = now.getDate()
        day = day >= 10 ? day : `0${day}`
        now = `${year}${month}${day}`

        let { getRecordsForHome, getStoragesForHome } = this.props
        let { userId } = this.props.userReducer
        getRecordsForHome({ OptionalParam: { start: 0, size: 10, userId: userId } })
        getStoragesForHome({ OptionalParam: { dateStart: now, dateEnd: now } })
    }

    componentWillReceiveProps(nextProps) {
        let { homeReducer, CarInfoReducer, AddCarReducer } = nextProps
        let { resetStoragesForHome, resetRecordsForHome } = this.props
        // console.log(nextProps)
        /** homeReducer.getStoragesHome */
        if (homeReducer.getStoragesHome.isExecStatus == 1) {
            console.log('homeReducer.getStoragesHome', '开始执行')
        } else if (homeReducer.getStoragesHome.isExecStatus == 2) {
            if (homeReducer.getStoragesHome.isResultStatus == 0) {
                console.log('homeReducer.getStoragesHome执行成功', homeReducer.getStoragesHome.data)
                resetStoragesForHome()
            } else if (homeReducer.getStoragesHome.isResultStatus == 1) {
                console.log('homeReducer.getStoragesHome执行错误', homeReducer.getStoragesHome.errorMsg)
                resetStoragesForHome()
            }
            else if (homeReducer.getStoragesHome.isResultStatus == 2) {
                console.log('homeReducer.getStoragesHome执行失败', homeReducer.getStoragesHome.failedMsg)
                resetStoragesForHome()
            }
        }
        /*********************************************************************** */



        /** homeReducer.getStoragesHome */
        if (homeReducer.getRecordsHome.isExecStatus == 1) {
            console.log('homeReducer.getRecordsHome', '开始执行')
        } else if (homeReducer.getRecordsHome.isExecStatus == 2) {
            if (homeReducer.getRecordsHome.isResultStatus == 0) {
                console.log('homeReducer.getRecordsHome执行成功', homeReducer.getRecordsHome.data)
                resetRecordsForHome()
            } else if (homeReducer.getRecordsHome.isResultStatus == 1) {
                console.log('homeReducer.getRecordsHome执行错误', homeReducer.getRecordsHome.errorMsg)
                resetRecordsForHome()
            }
            else if (homeReducer.getRecordsHome.isResultStatus == 2) {
                console.log('homeReducer.getRecordsHome执行失败', homeReducer.getRecordsHome.failedMsg)
                resetRecordsForHome()
            }
        }
        /*********************************************************************** */


        if (CarInfoReducer.sendCar.isExecStatus == 2) {
            console.log('CarInfoReducer.sendCar执行完毕')
            if (CarInfoReducer.sendCar.isResultStatus == 0) {
                console.log('CarInfoReducer.sendCar执行成功')
                this.getData()
            }
        }


        if (CarInfoReducer.exportCar.isExecStatus == 2) {
            console.log('CarInfoReducer.exportCar', '执行完毕')
            if (CarInfoReducer.exportCar.isResultStatus == 0) {
                console.log('CarInfoReducer.exportCar', '执行成功')
                this.getData()
            }
        }


        if (CarInfoReducer.importCar.isExecStatus == 2) {
            console.log('CarInfoReducer.importCar', '执行完毕')
            if (CarInfoReducer.importCar.isResultStatus == 0) {
                console.log('CarInfoReducer.importCar', '执行成功')
                this.getData()
            }
        }

        if (CarInfoReducer.moveCar.isExecStatus == 2) {
            console.log('CarInfoReducer.moveCar', '执行完毕')
            if (CarInfoReducer.moveCar.isResultStatus == 0) {
                console.log('CarInfoReducer.moveCar', '执行成功')
                this.getData()
            }
        }

        if (AddCarReducer.addCar.isExecStatus == 2) {
            console.log('AddCarReducer.addCar', '执行完毕')
            if (AddCarReducer.addCar.isResultStatus == 0) {
                console.log('AddCarReducer.addCar执行成功')
                this.getData()
            }
        }
    }

    onBarcodeReceived(param) {
        Actions.searchVinAtHomeBlock({ vin: param })
    }
    onPressIcon() {
        Actions.searchVinAtHomeBlock()
    }
    onPressTextInput() {
        Actions.searchVinAtHomeBlock()
    }

    onPressItem(param) {
        Actions.carInformationAtHomeBlock(param)
    }

    render() {
        // console.log(this.props)
        let { storageList } = this.props.homeReducer.getStoragesHome.data
        let { recordList } = this.props.homeReducer.getRecordsHome.data
        return (
            <LayoutHome
                onBarcodeReceived={this.onBarcodeReceived}
                onPressIcon={this.onPressIcon}
                onPressTextInput={this.onPressTextInput}
                onPressItem={this.onPressItem}
                storages={storageList}
                recordList={recordList}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        CarInfoReducer: state.CarInfoReducer,
        userReducer: state.LoginReducer.user,
        homeReducer: state.HomeReducer,
        AddCarReducer: state.AddCarReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRecordsForHome: (param) => {
        dispatch(HomeAction.getRecordsForHome(param))
    },
    getStoragesForHome: (param) => {
        dispatch(HomeAction.getStoragesForHome(param))
    },
    resetStoragesForHome: () => {
        dispatch(HomeAction.resetStoragesForHome())
    },
    resetRecordsForHome: () => {
        dispatch(HomeAction.resetRecordsForHome())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

