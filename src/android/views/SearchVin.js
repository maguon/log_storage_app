import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as searchVinAction from '../../actions/SearchVinAction'
import { Actions } from 'react-native-router-flux'
import SearchCarListLayout from '../layout/SearchVin'
import { View } from 'react-native'
import * as RouterDirection from '../../util/RouterDirection'

class SearchVin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vin: ''
        }
        this.getVinList = this.getVinList.bind(this)
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
            this.getVinList(this.props.vin)
        }
    }

    componentWillReceiveProps(nextProps) {
        let { SearchVinReducer } = nextProps
        /*getVinList 执行状态*/
        if (SearchVinReducer.getVinList.isExecStatus == 2) {
            if (SearchVinReducer.getVinList.isResultStatus == 0) {
                this.props.resetGetVinListStatus()
            } else if (SearchVinReducer.getVinList.isResultStatus == 1) {
                this.props.resetGetVinListStatus()
            } else if (SearchVinReducer.getVinList.isResultStatus == 2) {
                this.props.resetGetVinListStatus()
            }
        }
        /************************************************************************************************/

        /*getCarList 执行状态*/
        if (SearchVinReducer.search.isExecStatus == 2) {
            if (SearchVinReducer.search.isResultStatus == 0) {
                console.log('SearchVinReducer.search.isResultStatus == 0')
                let searchResult = SearchVinReducer.search
                this.props.resetSearch()
                if (typeof (searchResult.car) == "undefined") {
                    RouterDirection.addCar(nextProps.parent)({ vin: this.state.vin })
                }
                else {
                    RouterDirection.carInformation(nextProps.parent)({ car: SearchVinReducer.search.car })
                }
                this.props.resetSearch()
            } else if (SearchVinReducer.search.isResultStatus == 1) {
                console.log('SearchVinReducer.search.isResultStatus == 1')
                this.props.resetSearch()
            } else if (SearchVinReducer.search.isResultStatus == 2) {
                console.log('SearchVinReducer.search.isResultStatus == 2')
                this.props.resetSearch()
            }
        }
        /************************************************************************************************/
    }

    getVinList(vin) {
        let { user } = this.props
        const timeStamp = new Date().getTime()
        let pageSize = 15
        if (vin.length >= 6 && vin.length <= 17) {
            if (this.props.SearchVinReducer.getVinList.isExecStatus == 0) {
                if (!this.props.SearchVinReducer.getVinList.isComplete || vin != this.props.SearchVinReducer.getVinList.vin) {
                    let start = (vin != this.props.SearchVinReducer.getVinList.vin) ? 0 : this.props.SearchVinReducer.getVinList.data.vinList.length
                    let param = {
                        optionalParam: {
                            start,
                            size: pageSize,
                            vinCode: vin
                        }
                    }
                    this.props.getVinList(param, timeStamp, vin, pageSize)
                }
            }
        } else if (vin.length < 6 || vin.length > 17) {
            this.props.resetGetVinList(timeStamp)
        }
    }

    onChangeSearchText(param) {
        this.setState({ vin: param })
        this.getVinList(param)
    }

    onPressIcon() {
        let param = {
            optionalParam: {
                vin: this.state.vin,
                active: 1
            }
        }
        this.props.search(param)
    }

    onEndReached() {
        this.getVinList(this.state.vin)
    }

    onPressItem(param) {
        this.setState({ vin: param })
        const timeStamp = new Date().getTime()
        this.props.resetGetVinList(timeStamp)
    }

    render() {
        let { vinList } = this.props.SearchVinReducer.getVinList.data

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
    getVinList: (param, timeStamp, vin, pageSize) => {
        dispatch(searchVinAction.getVinList(param, timeStamp, vin, pageSize))
    },
    resetGetVinList: (timeStamp) => {
        dispatch(searchVinAction.resetGetVinList(timeStamp))
    },
    resetGetVinListStatus: () => {
        dispatch(searchVinAction.resetGetVinListStatus())
    },
    search: (param) => {
        dispatch(searchVinAction.search(param))
    },
    resetSearch: () => {
        dispatch(searchVinAction.resetSearch())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(SearchVin)