import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
// import InitializationReducer from './InitializationReducer'
import LoginReducer from './LoginReducer'
//import CarListReducer from './CarListReducer'
import StorageListReducer from './StorageListReducer'
import SelectRowReducer from './SelectRowReducer'
import ImporCarReducer from './ImporCarReducer'
import ImportCarCameraReducer from './ImportCarCameraReducer'
import PasswordReducer from './PasswordReducer'
//import HomeReducer from './HomeReducer'
import CarInfoReducer from './CarInfoReducer'
import RecordListReducer from './RecordListReducer'
import SearchVinReducer from './SearchVinReducer'
import ParkingViewReducer from './ParkingViewReducer'
import AddCarReducer from './AddCarReducer'
//import SelectReceiveReducer from './SelectReceiveReducer'
//import SelectBaseAddrReducer from './SelectBaseAddrReducer'
import SelectStorageForCarListReducer from './SelectStorageForCarListReducer'

import RetrievePasswordReducer from './RetrievePasswordReducer'
import SceneReducer from './SceneReducer'

//新
import recordListAtHomeReducer from './components/home/RecordListAtHomeReducer'
import storageListAtHomeReducer from './components/home/StorageListAtHomeReducer'
import selectTruckReducer from './components/select/selectTruckReducer' 
import selectCarReducer from './components/select/selectCarReducer' 
import selectDriverReducer from './components/select/selectDriverReducer' 
import selectMakeReducer from './components/select/selectMakeReducer' 
import selectCityReducer from './components/select/selectCityReducer' 
import selectStorageReducer from './components/select/selectStorageReducer' 
import selectEntrustReducer from './components/select/selectEntrustReducer' 
import applyDamageReducer from './views/applyDamageReducer' 
import initializationReducer from './views/InitializationReducer' 
import applyDamageUploadImageReducer from './views/applyDamageUploadImageReducer' 
import demageListReducer from './views/demageListReducer' 
import responsibilityListReducer from './views/responsibilityListReducer' 
import carInfoForDemageReducer from './components/demageInfo/carInfoForDemageReducer' 
import demageEditorReducer from './components/demageInfo/demageEditorReducer' 
import demageOpResultReducer from './components/demageInfo/demageOpResultReducer' 
import imageListForDemageReducer from './components/demageInfo/imageListForDemageReducer' 
import recordForDemageReducer from './components/demageInfo/recordForDemageReducer' 
import carListReducer from './views/CarListReducer'
import selectAreaReducer from './components/select/selectAreaReducer'
import selectParkingReducer from './components/select/selectParkingReducer'
import selectBaseAddrReducer from './components/select/selectBaseAddrReducer'
import selectReceiveReducer from './components/select/selectReceiveReducer'
import carInfoEditorReducer from './components/carInfo/carInfoEditorReducer'
import imageListForCarInfoReducer from './components/carInfo/imageListForCarInfoReducer'
import recordForCarInfoReducer from './components/carInfo/recordForCarInfoReducer'

export default combineReducers({
    form: formReducer,
    // InitializationReducer,
    LoginReducer,
    //HomeReducer,
    PasswordReducer,
   // CarListReducer,
    CarInfoReducer,
    ImporCarReducer,
    ImportCarCameraReducer,
    StorageListReducer,
    SelectRowReducer,
    RecordListReducer,
    SearchVinReducer,
    SelectStorageForCarListReducer,
    ParkingViewReducer,
    AddCarReducer,
    // SelectReceiveReducer,
    // SelectBaseAddrReducer,
    //SelectAreaReducer,
    SceneReducer,
    RetrievePasswordReducer,

    //新
    recordListAtHomeReducer,
    storageListAtHomeReducer,
    selectTruckReducer,
    selectCarReducer,
    selectDriverReducer,
    applyDamageReducer,
    applyDamageUploadImageReducer,
    demageListReducer,
    responsibilityListReducer,
    carInfoForDemageReducer,
    demageEditorReducer,
    demageOpResultReducer,
    imageListForDemageReducer,
    recordForDemageReducer,
    selectMakeReducer,
    selectCityReducer,
    selectStorageReducer,
    selectEntrustReducer,
    carListReducer,
    selectAreaReducer,
    selectParkingReducer,
    selectReceiveReducer,
    selectBaseAddrReducer,
    carInfoEditorReducer,
    imageListForCarInfoReducer,
    recordForCarInfoReducer,
    initializationReducer
})