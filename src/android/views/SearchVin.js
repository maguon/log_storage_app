import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as searchVinAction from '../../actions/SearchVinAction'
import { Actions } from 'react-native-router-flux'
import SearchCarListLayout from '../layout/SearchVin'
import { View, Dimensions } from 'react-native'
import * as RouterDirection from '../../util/RouterDirection'
import SearchVinList from '../components/SearchVinList'
import NavSearchBar from '../components/Bar/NavSearchBar'



const window = Dimensions.get('window')
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
        // this.onEndReached = this.onEndReached.bind(this)
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

    componentWillUnmount() {
        this.props.resetGetVinList(new Date().getTime())
    }


    componentWillReceiveProps(nextProps) {
        let { SearchVinReducer } = nextProps
        if (nextProps.SceneReducer.selectedScene == nextProps.name) {
            this.refs.navSearchBar._focus()
        }
        else {
            this.refs.navSearchBar._blur()
        }

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
                let searchResult = SearchVinReducer.search
                this.props.resetSearch()
                if (typeof (searchResult.car) == "undefined") {
                    //this.isRefresh = true
                    RouterDirection.addCar(nextProps.parent)({ vin: this.state.vin })
                }
                else {
                    //this.isRefresh = true
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
        let pageSize = 10
        if (vin.length >= 6 && vin.length <= 17) {
            if (this.props.SearchVinReducer.getVinList.isExecStatus == 0) {
                if (!this.props.SearchVinReducer.getVinList.isComplete || vin != this.props.SearchVinReducer.getVinList.vin) {
                    //  let start = (vin != this.props.SearchVinReducer.getVinList.vin) ? 0 : this.props.SearchVinReducer.getVinList.data.vinList.length
                    let param = {
                        optionalParam: {
                            start: 0,
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
        if (this.state.vin) {
            let param = {
                carOptionalParam: {
                    vin: this.state.vin,
                    active: 1
                },
                carListOptionalParam: {
                    vin: this.state.vin
                }
            }
            this.props.search(param)
        } else {
            RouterDirection.addCar(this.props.parent)({ vin: '' })
        }
    }

    // onEndReached() {
    //     this.getVinList(this.state.vin)
    // }

    onPressItem(param) {
        this.setState({ vin: param })
        const timeStamp = new Date().getTime()
        this.props.resetGetVinList(timeStamp)
    }

    render() {
        let { vinList } = this.props.SearchVinReducer.getVinList.data
        return (
            <View style={{ flex: 1, width: window.width }}>
                <NavSearchBar
                    ref='navSearchBar'
                    vin={this.state.vin}
                    onChangeSearchText={this.onChangeSearchText}
                    onPressIcon={this.onPressIcon}
                />
                <SearchVinList
                    vinList={vinList}
                    onEndReached={this.onEndReached}
                    onPressItem={this.onPressItem}
                />
            </View>
            /*<SearchCarListLayout
                vinList={vinList}
                vin={this.state.vin}
                onPressIcon={this.onPressIcon}
                onChangeSearchText={this.onChangeSearchText}
                onEndReached={this.onEndReached}
                onPressItem={this.onPressItem}
            />*/
        )
    }
}

const mapStateToProps = (state) => {
    return {
        SearchVinReducer: state.SearchVinReducer,
        user: state.LoginReducer.user,
        SceneReducer: state.SceneReducer
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