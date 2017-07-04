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
        let { SearchVinReducer } = nextProps
        /*getCarList 执行状态*/
        if (SearchVinReducer.searchVin.isExecStatus == 1) {
            console.log('SearchVinReducer.searchVin开始执行')
        } else if (SearchVinReducer.searchVin.isExecStatus == 2) {
            console.log('SearchVinReducer.searchVin执行完毕')
            if (SearchVinReducer.searchVin.isResultStatus == 0) {
                console.log('SearchVinReducer.searchVin执行成功')
                this.props.resetSearchVinListStatus()
            } else if (SearchVinReducer.searchVin.isResultStatus == 1) {
                console.log('SearchVinReducer.searchVin执行错误', SearchVinReducer.searchVin.errorMsg)
                this.props.resetSearchVinListStatus()
            } else if (SearchVinReducer.searchVin.isResultStatus == 2) {
                console.log('SearchVinReducer.searchVin执行失败')
                this.props.resetSearchVinListStatus()
            }
        }


        /************************************************************************************************/


        return true

    }

    searchVinList(vin) {
        let { user } = this.props
        const timeStamp = new Date().getTime()
        let pageSize = 15
        if (vin.length >= 6 && vin.length <= 17) {
            console.log(this.props.SearchVinReducer.searchVin.isComplete)
            if (this.props.SearchVinReducer.searchVin.isExecStatus == 0) {
                if (!this.props.SearchVinReducer.searchVin.isComplete || vin != this.props.SearchVinReducer.searchVin.vin) {
                    let param = {
                        requiredParam: {
                            userid: user.userId
                        },
                        optionalParam: {
                            start: this.props.SearchVinReducer.searchVin.data.vinList.length,
                            size: pageSize,
                            vinCode: vin
                        }
                    }
                    this.props.searchVinList(param, timeStamp, vin, pageSize)
                }

            }
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
        console.log(this.props.SearchVinReducer.searchVin.data.vinList)
        this.searchVinList(this.state.vin)
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
    searchVinList: (param, timeStamp, vin, pageSize) => {
        dispatch(searchVinAction.searchVinList(param, timeStamp, vin, pageSize))
    },
    resetSearchVinList: (timeStamp) => {
        dispatch(searchVinAction.resetSearchVinList(timeStamp))
    },
    resetSearchVinListStatus: () => {
        dispatch(searchVinAction.resetSearchVinListStatus())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchVin)