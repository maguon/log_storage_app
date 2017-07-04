import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as searchVinAction from '../../actions/SearchVinAction'
import { Actions } from 'react-native-router-flux'
import SearchCarListLayout from '../layout/SearchVin'
import { View } from 'react-native'

class SearchVin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vin: ''
        }

        this.searchVinList = this.searchVinList.bind(this)
        this.onChangeSearchText = this.onChangeSearchText.bind(this)
        this.onPressIcon = this.onPressIcon.bind(this)
        this.onPressItem = this.onPressItem.bind(this)
        this.onEndReached = this.onEndReached.bind(this)
    }
    componentWillMount() {
        if (this.props.vin) {
            this.setState({ vin: this.props.vin })
        }
    }

    componentDidMount() {
        if (this.props.vin) {
            this.searchVinList(this.props.vin)
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

    searchVinList(vin) {
        let { user } = this.props
        const timeStamp = new Date().getTime()
        if (vin.length >= 6 && vin.length <= 17) {
            let param = {
                requiredParam: {
                    userid: user.userId
                },
                optionalParam: {
                    start: 0,
                    size: 15,
                    vinCode: vin
                }
            }
            this.props.searchVinList(param, timeStamp)
        } else if (vin.length < 6 || vin.length > 17) {
            this.props.resetSearchVinList(timeStamp)
        }
    }

    onChangeSearchText(param) {
        this.setState({ vin: param })
        this.searchVinList(param)
    }

    onPressIcon() {
        console.log(this.props.SearchVinReducer)
    }

    onEndReached() {

    }

    onPressItem(param) {
        this.setState({ vin: param })
        const timeStamp = new Date().getTime()
        this.props.resetSearchVinList(timeStamp)
    }

    render() {
        let { vinList } = this.props.SearchVinReducer.searchVin.data

        return (
            <SearchCarListLayout
                vinList={vinList}
                vin={this.state.vin}
                onPressIcon={this.onPressIcon}
                onChangeSearchText={this.onChangeSearchText}
                onEndReached={this.onEndReached}
                onPressItem={this.onPressItem}
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