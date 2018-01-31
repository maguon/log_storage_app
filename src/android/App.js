import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'native-base'
import { Scene, TabBar, Router, ActionConst, Action, Switch, Reducer } from 'react-native-router-flux'
import { connect } from 'react-redux'


import TabIcon from './components/TabIcon'
import SearchBar from './components/Bar/SearchBar'
import SearchCarBar from './components/Bar/SearchCarBar'
import TopBar from './components/Bar/TopBar'

//import ApplyDamageUploadImage from './views/applyDamageUploadImage/ApplyDamageUploadImage'

import Initialization from './views/Initialization'
import Login from './views/Login'

import Home from './views/blockInitial/Home'
import Query from './views/blockInitial/Query'
import StorageList from './views/blockInitial/StorageList'
import Setting from './views/blockInitial/Setting'

import CarList from './views/CarList'
import CarInformation from './views/CarInformation'

import Password from './views/Password'
import SearchVin from './views/SearchVin'
import ImportCar from './views/ImportCar'
import VinScanner from './components/VinScanner'
import ErrorView from './views/ErrorView'
import SelectCarMake from './views/form/select/SelectCarMake'
import SelectStorage from './views/form/select/SelectStorage'
import SelectRow from './views/form/select/SelectRow'
import SelectColumn from './views/form/select/SelectColumn'

import SelectArea from './views/form/select/SelectArea'
import ImportCarCamera from './views/ImportCarCamera'
import RecordList from './views/RecordList'
import ParkingView from './views/ParkingView'
import ImagePageForCarInfo from './views/ImagePageForCarInfo'
import ImagePageForImportCar from './views/ImagePageForImportCar'
import AddCar from './views/AddCar'
import SelectEntrust from './views/form/select/SelectEntrust'
import SelectReceive from './views/form/select/SelectReceive'
import SelectBaseAddr from './views/form/select/SelectBaseAddr'
import SelectCity from './views/form/select/SelectCity'
import RichText from './views/RichText'
import RetrievePassword from './views/RetrievePassword'
import Orientation from 'react-native-orientation'
import * as sceneAction from '../actions/SceneAction'


//新
import ListCennect from './views/form/select/ListCennect'
import NavSearchStaticBar from './components/share/bar/NavSearchStaticBar'
import NavSearchDynamicBar from './components/share/bar/NavSearchDynamicBar'
import ApplyDamage from './views/ApplyDamage'
import ApplyDamageUploadImage from './views/ApplyDamageUploadImage'
import ApplyDamageSubmit from './components/applyDamage/ApplyDamageSubmit'
import ApplyDamageUploadImageSubmit from './components/applyDamage/ApplyDamageUploadImageSubmit'
import NavBar from './components/share/bar/NavBar'
import LeftButton from './components/share/bar/LeftButton'
import SinglePhotoView from './views/SinglePhotoView'
import ResponsibilityList from './views/ResponsibilityList'
import DemageList from './views/DemageList'
import ResponsibilityInfo from './views/ResponsibilityInfo'
import DemageInfo from './views/DemageInfo'


const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#ccc',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ccc',
    },
    navigationBarStyle: {

    }
})

const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    }
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : 56
        style.marginBottom = computedProps.hideTabBar ? 0 : 50
    }
    return style
}

const mapStateToProps = (state) => {
    return {
        LoginReducer: state.LoginReducer
    }
}

class App extends Component {
    constructor(props) {
        super(props)
        //this.reducerCreate = this.reducerCreate.bind(this)
    }

    componentWillMount() {
        Orientation.lockToPortrait()
    }

    // reducerCreate(params) {
    //     const defaultReducer = Reducer(params)
    //     return (state, action) => {
    //         if (action.type == 'REACT_NATIVE_ROUTER_FLUX_FOCUS') {
    //             if (action.scene.name != 'mainRoot') {
    //                 this.props.changeScene(action.scene.name)
    //             }
    //         }
    //         return defaultReducer(state, action)
    //     }
    // }

    render() {
        // console.disableYellowBox = true
        return (
            <Router
                //createReducer={this.reducerCreate} 
                getSceneStyle={getSceneStyle} >
                <Scene key="root">
                    <Scene initial={true} key="initialization" component={Initialization} hideNavBar hideTabBar />
                    <Scene
                        key="mainRoot"
                        component={connect(mapStateToProps)(Switch)}
                        tabs={true}
                        type={ActionConst.RESET}
                        selector={(props) => {
                            if (props.LoginReducer.user.mobile
                                && props.LoginReducer.user.token
                                && props.LoginReducer.user.userId
                                && props.LoginReducer.user.userStatus
                                && props.LoginReducer.user.userType) {
                                return 'main'
                            } else {
                                return 'loginBlock'//'loginBlock'
                            }
                        }}
                    >

                        <Scene key="loginBlock" >
                            <Scene key="login" initial={true} component={Login} hideNavBar hideTabBar />
                            <Scene key="retrievePassword" title='找回密码' component={RetrievePassword} hideTabBar hideNavBar={false} navBar={NavBar} />
                        </Scene>

                        <Scene key="main" tabs={true} tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
                            <Scene key="homeBlock" icon={TabIcon} online='ios-home' outline='ios-home-outline' >
                                <Scene key="home" component={Home} initial={true} hideNavBar={false} navBar={SearchBar} />
                                <Scene key="carInformationAtHomeBlock" title="车辆详细信息" component={CarInformation} hideNavBar={false} navBar={NavBar} hideTabBar />
                                <Scene key="searchVinAtHomeBlock" component={SearchVin} hideTabBar hideNavBar={true} />
                                <Scene key="addCarAtHomeBlock" isRefresh={true} component={AddCar} hideTabBar navBar={NavBar} title='新增车辆' hideNavBar={false} />

                                <Scene key="selectStorageAtHomeBlock" component={SelectStorage} hideTabBar navBar={NavBar} title='选择仓库' hideNavBar={false} />
                                <Scene key="selectRowAtHomeBlock" component={SelectRow} hideTabBar navBar={NavBar} title='选择排' hideNavBar={false} />
                                <Scene key="selectColumnAtHomeBlock" component={SelectColumn} hideTabBar navBar={NavBar} title='选择道位' hideNavBar={false} />
                                <Scene key="selectAreaAtHomeBlock" component={SelectArea} hideTabBar navBar={NavBar} title='选择区' hideNavBar={false} />
                                <Scene key="listCennectAtHomeBlock"
                                    component={ListCennect}
                                    hideTabBar
                                    navBar={NavSearchStaticBar}
                                    hideNavBar={false} />
                                <Scene key="listCennectDynamic"
                                    component={ListCennect}
                                    hideTabBar
                                    navBar={NavSearchDynamicBar}
                                    hideNavBar={false} />
                                <Scene key="ImagePageForImportCarAtHomeBlock" component={ImagePageForImportCar} hideNavBar hideTabBar />
                                <Scene key="ImagePageForCarInfoAtHomeBlock" component={ImagePageForCarInfo} hideNavBar hideTabBar />
                                <Scene key="selectCarMakeAtHomeBlock" component={SelectCarMake} title='选择品牌' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="selectEntrustAtHomeBlock" component={SelectEntrust} title='选择委托方' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="selectReceiveAtHomeBlock" component={SelectReceive} title='选择经销商' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="selectCityAtHomeBlock" component={SelectCity} title='选择城市' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="richTextAtHomeBlock" component={RichText} title='添加备注' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="selectBaseAddrAtHomeBlock" component={SelectBaseAddr} title='选择发货地址' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="importCarCameraAtHomeBlock" component={ImportCarCamera} title='上传图片' hideNavBar={false} hideTabBar navBar={TopBar} />
                                <Scene key="importCarAtHomeBlock" component={ImportCar} title='车辆入库' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene
                                    key="applyDamage"
                                    LeftButton={LeftButton}
                                    RightButton={ApplyDamageSubmit}
                                    component={ApplyDamage}
                                    title='质损申请'
                                    hideTabBar
                                    hideNavBar={false}
                                    navBar={NavBar} />
                                <Scene
                                    key="applyDamageUploadImage"
                                    LeftButton={LeftButton}
                                    RightButton={ApplyDamageUploadImageSubmit}
                                    component={ApplyDamageUploadImage}
                                    title='质损照片'
                                    hideTabBar
                                    hideNavBar={false}
                                    navBar={NavBar} />
                                <Scene key="singlePhotoView" component={SinglePhotoView} hideNavBar hideTabBar />
                            </Scene>
                            <Scene key="carBlock" icon={TabIcon} online='ios-car' outline='ios-car-outline' >
                                <Scene key="query" initial={true} component={Query} hideNavBar={false} navBar={SearchBar} />
                                <Scene key="carList" title="车辆列表" component={CarList} hideNavBar={false} navBar={NavBar} hideTabBar />
                                <Scene key="carInformationAtCarBlock" title="车辆详细信息" component={CarInformation} hideNavBar={false} navBar={NavBar} hideTabBar />
                                <Scene key="searchVinAtCarBlock" component={SearchVin} hideTabBar hideNavBar={true} />
                                <Scene key="addCarAtCarBlock" component={AddCar} hideTabBar navBar={NavBar} title='新增车辆' hideNavBar={false} />

                                <Scene key="selectStorageAtCarBlock" component={SelectStorage} hideTabBar navBar={NavBar} title='选择仓库' hideNavBar={false} />
                                <Scene key="selectRowAtCarBlock" component={SelectRow} hideTabBar navBar={NavBar} title='选择排' hideNavBar={false} />
                                <Scene key="selectColumnAtCarBlock" component={SelectColumn} hideTabBar navBar={NavBar} title='选择道位' hideNavBar={false} />
                                <Scene key="selectAreaAtCarBlock" component={SelectArea} hideTabBar navBar={NavBar} title='选择区' hideNavBar={false} />

                                <Scene key="ImagePageForImportCarAtCarBlock" component={ImagePageForImportCar} hideNavBar hideTabBar />
                                <Scene key="ImagePageForCarInfoAtCarBlock" component={ImagePageForCarInfo} hideNavBar hideTabBar />
                                <Scene key="selectCarMakeAtCarBlock" component={SelectCarMake} title='选择品牌' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="selectEntrustAtCarBlock" component={SelectEntrust} title='选择委托方' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="selectReceiveAtCarBlock" component={SelectReceive} title='选择经销商' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="selectCityAtCarBlock" component={SelectCity} title='选择城市' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="richTextAtCarBlock" component={RichText} title='添加备注' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="selectBaseAddrAtCarBlock" component={SelectBaseAddr} title='选择发货地址' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="importCarCameraAtCarBlock" component={ImportCarCamera} title='上传图片' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="importCarAtCarBlock" component={ImportCar} title='车辆入库' hideNavBar={false} hideTabBar navBar={NavBar} />
                            </Scene>
                            <Scene key="storageBlock" icon={TabIcon} online='ios-pin' outline='ios-pin-outline'>
                                <Scene key="storageList" component={StorageList} initial={true} hideNavBar={false} navBar={SearchBar} />
                                <Scene key="parkingView" navBar={NavBar} title="车位分布图" component={ParkingView} hideTabBar hideNavBar={false} />
                                <Scene key="searchVinAtStorageBlock" component={SearchVin} hideTabBar hideNavBar={true} />
                                <Scene key="addCarAtStorageBlock" component={AddCar} hideTabBar navBar={NavBar} title='新增车辆' hideNavBar={false} />
                                <Scene key="carInformationAtStorageBlock" title="车辆详细信息" component={CarInformation} hideNavBar={false} navBar={NavBar} hideTabBar />

                                <Scene key="ImagePageForImportCarAtStorageBlock" component={ImagePageForImportCar} hideNavBar hideTabBar />
                                <Scene key="ImagePageForCarInfoAtStorageBlock" component={ImagePageForCarInfo} hideNavBar hideTabBar />

                                <Scene key="selectStorageAtStorageBlock" component={SelectStorage} hideTabBar navBar={NavBar} title='选择仓库' hideNavBar={false} />
                                <Scene key="selectRowAtStorageBlock" component={SelectRow} hideTabBar navBar={NavBar} title='选择排' hideNavBar={false} />
                                <Scene key="selectColumnAtStorageBlock" component={SelectColumn} hideTabBar navBar={NavBar} title='选择道位' hideNavBar={false} />
                                <Scene key="selectAreaAtStorageBlock" component={SelectArea} hideTabBar navBar={NavBar} title='选择区' hideNavBar={false} />

                                <Scene key="selectCarMakeAtStorageBlock" component={SelectCarMake} title='选择品牌' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="selectEntrustAtStorageBlock" component={SelectEntrust} title='选择委托方' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="selectReceiveAtStorageBlock" component={SelectReceive} title='选择经销商' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="selectCityAtStorageBlock" component={SelectCity} title='选择城市' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="richTextAtStorageBlock" component={RichText} title='添加备注' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="selectBaseAddrAtStorageBlock" component={SelectBaseAddr} title='选择发货地址' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="importCarCameraAtStorageBlock" component={ImportCarCamera} title='上传图片' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="importCarAtStorageBlock" component={ImportCar} title='车辆入库' hideNavBar={false} hideTabBar navBar={NavBar} />
                            </Scene>
                            <Scene key="settingBlock" icon={TabIcon} initial={true} online='ios-settings' outline='ios-settings-outline' >
                                <Scene key="setting" component={Setting} initial={true} hideNavBar={false} navBar={SearchBar} />
                                <Scene key="recordList" component={RecordList} navBar={NavBar} title='工作记录' hideTabBar hideNavBar={false} />
                                <Scene key="carInformationAtSettingBlock" title="车辆详细信息" component={CarInformation} hideNavBar={false} navBar={NavBar} hideTabBar />
                                <Scene key="password" component={Password} title='修改密码' navBar={NavBar} hideTabBar hideNavBar={false} />
                                <Scene key="searchVinAtSettingBlock" component={SearchVin} hideTabBar hideNavBar={true} />
                                <Scene key="addCarAtSettingBlock" component={AddCar} hideTabBar navBar={NavBar} title='新增车辆' hideNavBar={false} />

                                <Scene key="ImagePageForImportCarAtSettingBlock" component={ImagePageForImportCar} hideNavBar hideTabBar />
                                <Scene key="ImagePageForCarInfoAtSettingBlock" component={ImagePageForCarInfo} hideNavBar hideTabBar />

                                <Scene key="selectStorageAtSettingBlock" component={SelectStorage} hideTabBar navBar={NavBar} title='选择仓库' hideNavBar={false} />
                                <Scene key="selectRowAtSettingBlock" component={SelectRow} hideTabBar navBar={NavBar} title='选择排' hideNavBar={false} />
                                <Scene key="selectColumnAtSettingBlock" component={SelectColumn} hideTabBar navBar={NavBar} title='选择道位' hideNavBar={false} />
                                <Scene key="selectAreaAtSettingBlock" component={SelectArea} hideTabBar navBar={NavBar} title='选择区' hideNavBar={false} />

                                <Scene key="selectCarMakeAtSettingBlock" component={SelectCarMake} title='选择品牌' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="selectEntrustAtSettingBlock" component={SelectEntrust} title='选择委托方' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="selectReceiveAtSettingBlock" component={SelectReceive} title='选择经销商' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="selectCityAtSettingBlock" component={SelectCity} title='选择城市' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="richTextAtSettingBlock" component={RichText} title='添加备注' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="selectBaseAddrAtSettingBlock" component={SelectBaseAddr} title='选择发货地址' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="importCarCameraAtSettingBlock" component={ImportCarCamera} title='上传图片' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="importCarAtSettingBlock" component={ImportCar} title='车辆入库' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="listCennectAtSettingBlock"
                                    component={ListCennect}
                                    hideTabBar
                                    navBar={NavSearchStaticBar}
                                    hideNavBar={false} />
                                <Scene key="demageList"
                                    LeftButton={LeftButton}
                                    component={DemageList}
                                    title='我的质损'
                                    hideTabBar
                                    hideNavBar={false}
                                    navBar={NavBar} />
                                <Scene key="responsibilityList"
                                    LeftButton={LeftButton}
                                    component={ResponsibilityList}
                                    title='我的责任'
                                    hideTabBar
                                    hideNavBar={false}
                                    navBar={NavBar} />
                                <Scene key="demageInfo"
                                    LeftButton={LeftButton}
                                    component={DemageInfo}
                                    title='质损详情'
                                    hideTabBar
                                    hideNavBar={false}
                                    navBar={NavBar} />
                                <Scene key="responsibilityInfo"
                                    LeftButton={LeftButton}
                                    component={ResponsibilityInfo}
                                    title='责任详情'
                                    hideTabBar
                                    hideNavBar={false}
                                    navBar={NavBar} />
                            </Scene>
                        </Scene>
                    </Scene>
                </Scene>
            </Router>

        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    changeScene: (param) => {
        //dispatch(sceneAction.changeScene(param))
    }
})

export default App // connect((state) => { return {} }, mapDispatchToProps)(App)