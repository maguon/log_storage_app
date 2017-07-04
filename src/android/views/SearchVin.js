import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as searchVinAction from '../../actions/SearchVinAction'
import { Actions } from 'react-native-router-flux'
import SearchCarListLayout from '../layout/SearchVin'
import { View } from 'react-native'

class SearchVin extends Component {
    constructor(props) {
        super(props)
        this.searchVinList = this.searchVinList.bind(this)
        this.onChangeSearchText = this.onChangeSearchText.bind(this)
        this.onPressIcon = this.onPressIcon.bind(this)
    }
    componentWillMount() {
        if (this.props.vin) { this.vin = this.props.vin }
        else {
            console.log('componentWillMount-this.props.vin', this.vin)
            this.vin = ''
        }

    }

    componentDidMount() {
        if (this.props.vin) {
            console.log('componentDidMount-this.props.vin', this.vin)
            this.searchVinList()
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        //  let { searchCarListReducer } = nextProps
        /*getCarList 执行状态*/
        // if (searchCarListReducer.searchCarList.isExecStatus == 1) {
        //     console.log('searchCarListReducer.searchCarList开始执行')
        // } else if (searchCarListReducer.searchCarList.isExecStatus == 2) {
        //     console.log('searchCarListReducer.searchCarList执行完毕')
        //     if (searchCarListReducer.searchCarList.isResultStatus == 0) {
        //         console.log('searchCarListReducer.searchCarList执行成功')
        //         this.props.resetSearchCarList()
        //     } else if (searchCarListReducer.searchCarList.isResultStatus == 1) {
        //         console.log('searchCarListReducer.searchCarList执行错误', searchCarListReducer.searchCarList.errorMsg)
        //         this.props.resetSearchCarList()
        //     } else if (searchCarListReducer.searchCarList.isResultStatus == 2) {
        //         console.log('searchCarListReducer.searchCarList执行失败')
        //         this.props.resetSearchCarList()
        //     }
        // }


        /************************************************************************************************/

        /*getCarListMore 执行状态*/
        // if (searchCarListReducer.searchCarListMore.isExecStatus == 1) {
        //     console.log('searchCarListReducer.searchCarListMore开始执行')
        // } else if (searchCarListReducer.searchCarListMore.isExecStatus == 2) {
        //     console.log('searchCarListReducer.searchCarListMore执行完毕')
        //     if (searchCarListReducer.searchCarListMore.isResultStatus == 0) {
        //         console.log('searchCarListReducer.searchCarListMore执行成功没有到底')
        //     } else if (searchCarListReducer.searchCarListMore.isResultStatus == 1) {
        //         console.log('searchCarListReducer.searchCarListMore执行错误')
        //     } else if (searchCarListReducer.searchCarListMore.isResultStatus == 2) {
        //         console.log('searchCarListReducer.searchCarListMore执行失败')
        //     } else if (searchCarListReducer.searchCarListMore.isResultStatus == 3) {
        //         console.log('searchCarListReducer.searchCarListMore已经到底')
        //     }
        // }

        /************************************************************************************************/

        return true

    }

    searchVinList() {
        let { user } = this.props
        const timeStamp = new Date().getTime()
        if (this.vin.length >= 6) {
            let param = {
                requiredParam: {
                    userid: user.userId
                },
                optionalParam: {
                    start: 0,
                    size: 15,
                    vinCode: this.vin
                }
            }
            this.props.searchVinList(param, timeStamp)
        } else {
            this.props.resetSearchVinList(timeStamp)
        }


    }

    onChangeSearchText(param) {
        this.vin = param
        console.log('this.vin', this.vin)
        console.log(this.props.SearchVinReducer)
        this.searchVinList()
    }

    onPressIcon() {
        console.log(this.props.SearchVinReducer)
    }

    onEndReached() {

    }

    render() {
        let { vinList } = this.props.SearchVinReducer.searchVin.data
        console.log(vinList)
        return (
            <SearchCarListLayout
                vinList={vinList}
                vin={this.vin}
                onPressIcon={this.onPressIcon}
                onChangeSearchText={this.onChangeSearchText}
                onEndReached={this.onEndReached}
                carInfoRouter={this.props.carInfoRouter}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        SearchVinReducer: state.SearchVinReducer,
        user: state.LoginReducer.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    searchVinList: (param, timeStamp) => {
        dispatch(searchVinAction.searchVinList(param, timeStamp))
    },
    resetSearchVinList: (timeStamp) => {
        dispatch(searchVinAction.resetSearchVinList(timeStamp))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchVin)