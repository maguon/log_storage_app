import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import StorageListReducer from '../android/views/blockInitial/storageList/StorageListReducer'

// import ImportCarCameraReducer from './ImportCarCameraReducer'
//import HomeReducer from './HomeReducer'

import RecordListReducer from '../android/views/recordList/RecordListReducer'
// import SearchVinReducer from './SearchVinReducer'
// import ParkingViewReducer from './ParkingViewReducer'

//新
import recordListAtHomeReducer from '../android/components/home/record/RecordListAtHomeReducer'
import storageListAtHomeReducer from '../android/components/home/storage/StorageListAtHomeReducer'
import selectTruckReducer from './components/select/selectTruckReducer' 
import selectCarReducer from './components/select/selectCarReducer' 
import selectDriverReducer from './components/select/selectDriverReducer' 
import selectMakeReducer from './components/select/selectMakeReducer' 
import selectCityReducer from './components/select/selectCityReducer' 
import selectStorageReducer from './components/select/selectStorageReducer' 
import selectEntrustReducer from './components/select/selectEntrustReducer' 
import applyDamageReducer from '../android/views/applyDamage/applyDamage/applyDamageReducer'
import loginReducer from '../android/views/login/loginReducer'
import initializationReducer from '../android/views/initialization/InitializationReducer'
import applyDamageUploadImageReducer from '../android/views/applyDamage/updateImageForApplyDamage/applyDamageUploadImageReducer'
import retrievePasswordReducer from '../android/views/retrievePassword/RetrievePasswordReducer'
import demageListReducer from '../android/views/damageList/demageListReducer'
import responsibilityListReducer from '../android/views/responsibilityList/responsibilityListReducer'
import personalCenterReducer from '../android/views/personalCenter/personalCenterReducer'
import carInfoForDemageReducer from './components/demageInfo/carInfoForDemageReducer' 
import demageEditorReducer from './components/demageInfo/demageEditorReducer' 
import demageOpResultReducer from './components/demageInfo/demageOpResultReducer' 
import imageListForDemageReducer from './components/demageInfo/imageListForDemageReducer' 
import recordForDemageReducer from './components/demageInfo/recordForDemageReducer' 
import carListReducer from '../android/views/carList/CarListReducer'
import selectAreaReducer from './components/select/selectAreaReducer'
import selectParkingReducer from './components/select/selectParkingReducer'
import selectBaseAddrReducer from './components/select/selectBaseAddrReducer'
import selectReceiveReducer from './components/select/selectReceiveReducer'
import carInfoEditorReducer from './components/carInfo/carInfoEditorReducer'
import imageListForCarInfoReducer from './components/carInfo/imageListForCarInfoReducer'
import recordForCarInfoReducer from './components/carInfo/recordForCarInfoReducer'
import sendSMSReducer from '../android/components/retrievePassword/sendSMS/SendSMSReducer'
import addCarReducer from '../android/views/createCar/createCar/addCarReducer'
import importCarImageReducer from '../android/views/createCar/uploadImageForCreateCar/ImportCarImageReducer'
import imporCarReducer from '../android/views/createCar/importCar/ImporCarReducer'
import carInfoReducer from './views/CarInfoReducer'


export default combineReducers({
    form: formReducer,
    StorageListReducer,
    //新
    RecordListReducer,
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
    initializationReducer,
    loginReducer,
    personalCenterReducer,
    retrievePasswordReducer,
    sendSMSReducer,
    addCarReducer,
    importCarImageReducer,
    carInfoReducer,
    imporCarReducer
})