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
        /*getCarList 执行状态*/
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
                        requiredParam: {
                            userid: user.userId
                        },
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

        console.log(this.props.SearchVinReducer)
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
        console.log(this.props)
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchVin)