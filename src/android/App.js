import React, { Component } from 'react'
import { Scene,TabBar, Router} from 'react-native-router-flux'
import Welcome from './views/Welcome'
import Login from './views/Login'
import MainRoot from './views/MainRoot'
import Password from './views/Password'
import CarInfo from './views/CarInfo'
import ImportCar from './views/ImportCar'
import VinScanner from './components/VinScanner'
import ErrorView from './views/ErrorView'
import SearchCarList from './views/SearchCarList'
import SelectCarMake from './views/SelectCarMake'
//import SelectCarModel from './views/SelectCarModel'
import SelectStorage from './views/SelectStorage'
import SelectRow from './views/SelectRow'
import SelectColumn from './views/SelectColumn'
import ImportCarCamera from './views/ImportCarCamera'
import recordList from './views/RecordList'
import parkingView from './views/ParkingView'
import ImagePageForCarInfo from './views/ImagePageForCarInfo'
import ImagePageForImportCar from './views/ImagePageForImportCar'
import selectStorageForCarList from './views/SelectStorageForCarList'
import AddCar from './views/AddCar'
import SelectEntrust from './views/SelectEntrust'
import SelectReceive from './views/SelectReceive'
import SelectBaseAddr from './views/SelectBaseAddr'
import SelectCity from './views/SelectCity'
import RichText from './views/RichText'



export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.disableYellowBox = true
        return (
            <Router >
                <Scene key="root">
                    <Scene key="welcome" component={Welcome} hideNavBar />
                    <Scene key="login" component={Login} hideNavBar />
                    <Scene key="main" component={MainRoot} hideNavBar />
                    <Scene key="password" component={Password} hideNavBar />
                    <Scene key="carInfo"  component={CarInfo} hideNavBar />
                    <Scene key="ImportCar" component={ImportCar}  initial={true} hideNavBar />
                    <Scene key="VinScanner" component={VinScanner} hideNavBar />
                    <Scene key="ErrorView" component={ErrorView} hideNavBar />
                    <Scene key="SearchCarList" component={SearchCarList} hideNavBar />
                    <Scene key="SelectCarMake" component={SelectCarMake} hideNavBar />
                    {/*<Scene key="SelectCarModel" component={SelectCarModel} hideNavBar />*/}
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
                    <Scene key="addCar" component={AddCar}    hideNavBar />
                </Scene>
            </Router>

        )
    }
}




