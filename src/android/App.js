import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'native-base'
import { Scene, TabBar, Router, ActionConst, Action, Switch, Reducer } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'


import TabIcon from './components/TabIcon'


import Initialization from './views/initialization/Initialization'
import Login from './views/login/Login'
import Home from './views/blockInitial/Home'
import Query from './views/blockInitial/Query'
import StorageList from './views/blockInitial/storageList/StorageList'

import CarList from './views/carList/CarList'
import CarInformation from './views/CarInformation'
import ImportCar from './views/createCar/importCar/ImportCar'
import VinScanner from './components/VinScanner'

import RecordList from './views/recordList/RecordList'
import ImagePageForCarInfo from './views/ImagePageForCarInfo'
import ImagePageForImportCar from './views/ImagePageForImportCar'
import AddCar from './views/createCar/createCar/AddCar'
import RichText from './views/RichText'


//新
import ListCennect from './views/form/select/ListCennect'
import NavSearchStaticBar from './components/share/bar/NavSearchStaticBar'
import NavSearchDynamicBar from './components/share/bar/NavSearchDynamicBar'
import SearchBar from './components/share/bar/SearchBar'
import SearchCarBar from './components/share/bar/SearchCarBar'
import ApplyDamage from './views/applyDamage/applyDamage/ApplyDamage'
import AddCarSubmit from './components/createCar/AddCarSubmit'
import ApplyDamageUploadImage from './views/applyDamage/updateImageForApplyDamage/ApplyDamageUploadImage'
import ApplyDamageSubmit from './components/applyDamage/ApplyDamageSubmit'
import ApplyDamageUploadImageSubmit from './components/applyDamage/ApplyDamageUploadImageSubmit'
import NavBar from './components/share/bar/NavBar'
import LeftButton from './components/share/bar/LeftButton'
import QueryOp from './components/query/QueryOp'
import SinglePhotoView from './views/SinglePhotoView'
import ResponsibilityList from './views/responsibilityList/ResponsibilityList'
import DemageList from './views/damageList/DemageList'
import ResponsibilityInfo from './views/ResponsibilityInfo'
import DemageInfo from './views/DemageInfo'
import PersonalCenter from './views/personalCenter/PersonalCenter'
import UpdatePassword from './views/updatePassword/UpdatePassword'
import Setting from './views/blockInitial/Setting'
import RetrievePassword from './views/retrievePassword/RetrievePassword'
import ImportCarImage from './views/createCar/uploadImageForCreateCar/ImportCarImage'
import ImportCarImageSubmit from './components/importCarImage/ImportCarImageSubmit'
import ImageViewConnect from './views/viewConnect/ImageViewConnect'
import CarInfoConnect from './views/viewConnect/CarInfoConnect'

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#E0E4E7',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#E0E4E7',
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
        loginReducer: state.loginReducer
    }
}

class App extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        Orientation.lockToPortrait()
    }

    render() {
        console.disableYellowBox = true
        return (
            <Router
                getSceneStyle={getSceneStyle} >
                <Scene key="root">
                    <Scene initial={true} key="initialization" component={Initialization} hideNavBar hideTabBar />
                    <Scene
                        key="mainRoot"
                        component={connect(mapStateToProps)(Switch)}
                        tabs={true}
                        type={ActionConst.RESET}
                        selector={(props) => {
                            const { user } = props.loginReducer.data
                            if (user.mobile
                                && user.token
                                && user.uid
                                && user.status
                                && user.type) {
                                return 'main'
                            } else {
                                return 'loginBlock'
                            }
                        }}
                    >
                        <Scene key="loginBlock" >
                            <Scene key="login" initial={true} component={Login} hideNavBar hideTabBar />
                            <Scene key="retrievePassword" LeftButton={LeftButton} title='找回密码' component={RetrievePassword} hideTabBar hideNavBar={false} navBar={NavBar} />
                        </Scene>
                        <Scene key="main" tabs={true} tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
                            <Scene key="homeBlock" initial={true} icon={TabIcon} online='ios-home' outline='ios-home-outline' >
                                <Scene key="home"
                                    component={Home}
                                    initial={true}
                                    hideNavBar={false}
                                    navBar={SearchBar} />
                                <Scene key="carInformationAtHomeBlock"
                                    title="车辆详细信息"
                                    LeftButton={LeftButton}
                                    component={CarInformation}
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar />
                                <Scene key="carInfoConnectAtHomeBlock"
                                    title="车辆详细信息"
                                    LeftButton={LeftButton}
                                    component={CarInfoConnect}
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar />
                                <Scene key="searchVinAtHomeBlock"
                                    component={ListCennect}
                                    hideTabBar
                                    navBar={SearchCarBar}
                                    hideNavBar={false} />
                                <Scene key="addCarAtHomeBlock"
                                    component={AddCar}
                                    RightButton={AddCarSubmit}
                                    hideTabBar
                                    LeftButton={LeftButton}
                                    navBar={NavBar}
                                    title='新增车辆'
                                    hideNavBar={false} />
                                <Scene key="ImagePageForImportCarAtHomeBlock" component={ImagePageForImportCar} hideNavBar hideTabBar />
                                <Scene key="ImagePageForCarInfoAtHomeBlock" component={ImagePageForCarInfo} hideNavBar hideTabBar />
                                <Scene key="importCarCameraAtHomeBlock"
                                    component={ImportCarImage}
                                    LeftButton={LeftButton}
                                    title='上传图片'
                                    hideNavBar={false}
                                    hideTabBar
                                    RightButton={ImportCarImageSubmit}
                                    navBar={NavBar} />
                                <Scene key="importCarAtHomeBlock"
                                    component={ImportCar}
                                    title='车辆入库'
                                    hideNavBar={false}
                                    hideTabBar
                                    navBar={NavBar}
                                    LeftButton={LeftButton} />
                                <Scene key="listCennectAtHomeBlock"
                                    component={ListCennect}
                                    hideTabBar
                                    navBar={NavSearchStaticBar}
                                    hideNavBar={false} />
                                <Scene key="listCennectNavAtHomeBlock"
                                    component={ListCennect}
                                    hideTabBar
                                    navBar={NavBar}
                                    LeftButton={LeftButton}
                                    hideNavBar={false} />
                                <Scene key="listCennectDynamic"
                                    component={ListCennect}
                                    hideTabBar
                                    navBar={NavSearchDynamicBar}
                                    hideNavBar={false} />
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
                                <Scene key="singlePhotoViewAtHomeBlock"
                                    component={SinglePhotoView}
                                    hideNavBar
                                    hideTabBar />
                                <Scene key="imageViewConnectAtHomeBlock"
                                    clone={true}
                                    component={ImageViewConnect}
                                    hideTabBar
                                    hideNavBar />   
                            </Scene>
                            <Scene key="carBlock" icon={TabIcon} online='ios-car' outline='ios-car-outline' >
                                <Scene
                                    key="query"
                                    title='查询车辆'
                                    initial={true}
                                    component={Query}
                                    hideNavBar={false}
                                    navBar={NavBar} 
                                    RightButton={QueryOp}/>
                                <Scene key="imageViewConnectAtCarBlock"
                                    clone={true}
                                    component={ImageViewConnect}
                                    hideTabBar
                                    hideNavBar />
                                <Scene key="carInfoConnectAtCarBlock"
                                    title="车辆详细信息"
                                    LeftButton={LeftButton}
                                    component={CarInfoConnect}
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar />
                                <Scene
                                    key="carList"
                                    title="车辆列表"
                                    component={CarList}
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    LeftButton={LeftButton}
                                    hideTabBar />
                                <Scene key="listCennectAtCarBlock"
                                    clone={true}
                                    component={ListCennect}
                                    hideTabBar
                                    navBar={NavSearchStaticBar}
                                    hideNavBar={false} />
                                <Scene key="listCennectNavAtCarBlock"
                                    component={ListCennect}
                                    hideTabBar
                                    navBar={NavBar}
                                    LeftButton={LeftButton}
                                    hideNavBar={false} />
                                <Scene key="carInformationAtCarBlock"
                                    title="车辆详细信息"
                                    component={CarInformation}
                                    hideNavBar={false}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key="singlePhotoViewAtCarBlock"
                                    component={SinglePhotoView}
                                    hideNavBar
                                    hideTabBar />
                                <Scene key="addCarAtCarBlock" component={AddCar} hideTabBar navBar={NavBar} title='新增车辆' hideNavBar={false} />
                                <Scene key="ImagePageForImportCarAtCarBlock" component={ImagePageForImportCar} hideNavBar hideTabBar />
                                <Scene key="ImagePageForCarInfoAtCarBlock" component={ImagePageForCarInfo} hideNavBar hideTabBar />
                                <Scene key="richTextAtCarBlock" component={RichText} title='添加备注' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="importCarCameraAtCarBlock" component={ImportCarImage} title='上传图片' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="importCarAtCarBlock" component={ImportCar} title='车辆入库' hideNavBar={false} hideTabBar navBar={NavBar} />
                            </Scene>
                            <Scene key="storageBlock" icon={TabIcon} online='ios-pin' outline='ios-pin-outline'>
                                <Scene key="storageList" component={StorageList} title='仓库列表' initial={true} hideNavBar={false} navBar={NavBar} />
                                <Scene key="addCarAtStorageBlock" component={AddCar} hideTabBar navBar={NavBar} title='新增车辆' hideNavBar={false} />
                                <Scene key="carInformationAtStorageBlock" title="车辆详细信息" component={CarInformation} hideNavBar={false} navBar={NavBar} hideTabBar />
                                <Scene key="ImagePageForImportCarAtStorageBlock" component={ImagePageForImportCar} hideNavBar hideTabBar />
                                <Scene key="ImagePageForCarInfoAtStorageBlock" component={ImagePageForCarInfo} hideNavBar hideTabBar />
                                <Scene key="richTextAtStorageBlock" component={RichText} title='添加备注' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="importCarCameraAtStorageBlock" component={ImportCarImage} title='上传图片' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="importCarAtStorageBlock" component={ImportCar} title='车辆入库' hideNavBar={false} hideTabBar navBar={NavBar} />
                            </Scene>
                            <Scene key="settingBlock" icon={TabIcon} online='ios-settings' outline='ios-settings-outline' >
                                <Scene key="setting" component={Setting} title='设置' initial={true} hideNavBar={false} navBar={NavBar} />
                                <Scene key="recordList" LeftButton={LeftButton} component={RecordList} navBar={NavBar} title='工作记录' hideTabBar hideNavBar={false} />
                                <Scene key="carInformationAtSettingBlock" title="车辆详细信息" component={CarInformation} hideNavBar={false} navBar={NavBar} hideTabBar />
                                <Scene key="addCarAtSettingBlock" component={AddCar} hideTabBar navBar={NavBar} title='新增车辆' hideNavBar={false} />
                                <Scene key="ImagePageForImportCarAtSettingBlock" component={ImagePageForImportCar} hideNavBar hideTabBar />
                                <Scene key="ImagePageForCarInfoAtSettingBlock" component={ImagePageForCarInfo} hideNavBar hideTabBar />
                                <Scene key="richTextAtSettingBlock" component={RichText} title='添加备注' hideNavBar={false} hideTabBar navBar={NavBar} />
                                <Scene key="importCarCameraAtSettingBlock" component={ImportCarImage} title='上传图片' hideNavBar={false} hideTabBar navBar={NavBar} />
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
                                <Scene key="personalCenter"
                                    LeftButton={LeftButton}
                                    component={PersonalCenter}
                                    title='个人中心'
                                    hideTabBar
                                    hideNavBar={false}
                                    navBar={NavBar} />
                                <Scene key="updatePassword"
                                    LeftButton={LeftButton}
                                    component={UpdatePassword}
                                    title='修改密码'
                                    hideTabBar
                                    hideNavBar={false}
                                    navBar={NavBar} />
                                <Scene key="singlePhotoViewAtSettingBlock"
                                    component={SinglePhotoView}
                                    hideNavBar
                                    hideTabBar />
                            </Scene>
                        </Scene>
                    </Scene>
                </Scene>
            </Router>
        )
    }
}

export default App 