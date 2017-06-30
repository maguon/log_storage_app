import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'native-base'
import { Scene, TabBar, Router, ActionConst, Actions } from 'react-native-router-flux'

import NavBar from './components/Bar/NavBar'
import TabIcon from './components/TabIcon'
import SearchBar from './components/Bar/SearchBar'


import Welcome from './views/Welcome'
import Login from './views/Login'
import Home from './views/Home'
import CarInfo from './views/CarInfo'
import CarList from './views/CarList'
import StorageList from './views/StorageList'
import Setting from './views/Setting'


import Password from './views/Password'

import ImportCar from './views/ImportCar'
import VinScanner from './components/VinScanner'
import ErrorView from './views/ErrorView'
import SearchCarList from './views/SearchCarList'
import SelectCarMake from './views/SelectCarMake'
import SelectStorage from './views/SelectStorage'
import SelectRow from './views/SelectRow'
import SelectColumn from './views/SelectColumn'
import ImportCarCamera from './views/ImportCarCamera'
import RecordList from './views/RecordList'
import ParkingView from './views/ParkingView'
import ImagePageForCarInfo from './views/ImagePageForCarInfo'
import ImagePageForImportCar from './views/ImagePageForImportCar'
import selectStorageForCarList from './views/SelectStorageForCarList'
import AddCar from './views/AddCar'
import SelectEntrust from './views/SelectEntrust'
import SelectReceive from './views/SelectReceive'
import SelectBaseAddr from './views/SelectBaseAddr'
import SelectCity from './views/SelectCity'
import RichText from './views/RichText'

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
        // console.log(computedProps)
        style.marginTop = computedProps.hideNavBar ? 0 : 56
        style.marginBottom = computedProps.hideTabBar ? 0 : 50
    }
    return style
}

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.disableYellowBox = true
        return (
            <Router getSceneStyle={getSceneStyle}>
                <Scene key="root">
                    <Scene key="welcome" component={Welcome} hideNavBar hideTabBar />
                    <Scene
                        initial={true}
                        key="mainRoot"
                        //component={connect(mapStateToProps)(Switch)}
                        tabs={true}
                        type={ActionConst.RESET}
                        selector={(props) => {
                            console.log(props)
                            return 'main'//props.appReducer.sceneName
                        }}
                    >
                        <Scene key="login" component={Login} hideNavBar hideTabBar />
                        <Scene key="main" initial={true} tabs={true} tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
                            <Scene key="homeBlock" initial={true} icon={TabIcon} online='ios-home' outline='ios-home-outline' >
                                <Scene key="home" initial={true} component={Home} hideNavBar />
                                <Scene key="carInfoForHome" title="车辆详细信息" component={CarInfo} navBar={NavBar} hideTabBar hideNavBar={false} />
                                <Scene key="searchCarListForHome" component={SearchCarList} hideTabBar hideNavBar={true} />
                            </Scene>
                            <Scene key="carBlock" icon={TabIcon} online='ios-car' outline='ios-car-outline' >
                                <Scene key="carList" initial={true} component={CarList} hideNavBar />
                                <Scene key="carInfo" title="车辆详细信息" component={CarInfo} navBar={NavBar} hideTabBar hideNavBar={false} />
                                <Scene key="searchCarListForCar" component={SearchCarList} hideTabBar hideNavBar={true} />
                            </Scene>
                            <Scene key="storageBlock" icon={TabIcon} online='ios-pin' outline='ios-pin-outline'>
                                <Scene key="storageList" component={StorageList} initial={true} hideNavBar />
                                <Scene key="parkingView" navBar={NavBar} title="车位分布图" component={ParkingView} hideTabBar hideNavBar={false} />
                                <Scene key="searchCarListForStorage" component={SearchCarList} hideTabBar hideNavBar={true} />
                            </Scene>
                            <Scene key="settingBlock" icon={TabIcon} online='ios-settings' outline='ios-settings-outline' >
                                <Scene key="setting" component={Setting} hideNavBar={true} navBar={NavBar} />
                                <Scene key="recordList" component={RecordList} navBar={NavBar} title='工作记录' hideTabBar hideNavBar={false} />
                                <Scene key="carInfoForRecordList" component={CarInfo} title="车辆详细信息" navBar={NavBar} hideTabBar hideNavBar={false} />
                                <Scene key="password" component={Password} title='修改密码' navBar={NavBar} hideTabBar hideNavBar={false} />
                                <Scene key="searchCarListForSetting" component={SearchCarList} hideTabBar hideNavBar={true} />
                            </Scene>
                        </Scene>
                    </Scene>
                </Scene>
            </Router>

        )
    }
}



                   /*<Scene key="welcome" initial={true} component={Welcome} hideNavBar />
                <Scene key="login" component={Login} hideNavBar />
                <Scene key="main" component={MainRoot} hideNavBar />
                <Scene key="password" component={Password} hideNavBar />
                <Scene key="carInfo" component={CarInfo} hideNavBar />
                <Scene key="ImportCar" component={ImportCar} hideNavBar />
                <Scene key="VinScanner" component={VinScanner} hideNavBar />
                <Scene key="ErrorView" component={ErrorView} hideNavBar />
                <Scene key="SearchCarList" component={SearchCarList} hideNavBar />
                <Scene key="SelectCarMake" component={SelectCarMake} hideNavBar />
                <Scene key="SelectStorage" component={SelectStorage} hideNavBar />
                <Scene key="SelectRow" component={SelectRow} hideNavBar />
                <Scene key="SelectColumn" component={SelectColumn} hideNavBar />
                <Scene key="ImportCarCamera" component={ImportCarCamera} hideNavBar />
                <Scene key="recordList" component={recordList} hideNavBar />
                <Scene key="parkingView" component={parkingView} hideNavBar />
                <Scene key="ImagePageForCarInfo" component={ImagePageForCarInfo} hideNavBar />
                <Scene key="ImagePageForImportCar" component={ImagePageForImportCar} hideNavBar />
                <Scene key="selectStorageForCarList" component={selectStorageForCarList} hideNavBar />
                <Scene key="SelectEntrust" component={SelectEntrust} hideNavBar />
                <Scene key="SelectReceive" component={SelectReceive} hideNavBar />
                <Scene key="SelectCity" component={SelectCity} hideNavBar />
                <Scene key="RichText" component={RichText} hideNavBar />
                <Scene key="SelectBaseAddr" component={SelectBaseAddr} hideNavBar />
                <Scene key="addCar" component={AddCar} hideNavBar />*/




