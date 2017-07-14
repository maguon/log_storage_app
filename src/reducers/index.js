import { combineReducers } from 'redux'
import InitializationReducer from './InitializationReducer'
import LoginReducer from './LoginReducer'
import CarListReducer from './CarListReducer'
import CarMakeReducer from './CarMakeReducer'
import StorageListReducer from './StorageListReducer'
import SelectRowReducer from './SelectRowReducer'
import ImporCarReducer from './ImporCarReducer'
import ImportCarCameraReducer from './ImportCarCameraReducer'
import PasswordReducer from './PasswordReducer'
import HomeReducer from './HomeReducer'
import CarInfoReducer from './CarInfoReducer'
import SelectStorageReducer from './SelectStorageReducer'
import RecordListReducer from './RecordListReducer'
import SearchVinReducer from './SearchVinReducer'
import ParkingViewReducer from './ParkingViewReducer'
import AddCarReducer from './AddCarReducer'
import SelectReceiveReducer from './SelectReceiveReducer'
import SelectEntrustReducer from './SelectEntrustReducer'
import SelectCityReducer from './SelectCityReducer'
import SelectBaseAddrReducer from './SelectBaseAddrReducer'
import SelectStorageForCarListReducer from './SelectStorageForCarListReducer'

export default combineReducers({
    InitializationReducer,
    LoginReducer,
    HomeReducer,
    PasswordReducer,
    CarListReducer,
    CarInfoReducer,
    CarMakeReducer,
    ImporCarReducer,
    ImportCarCameraReducer,
    StorageListReducer,
    SelectRowReducer,
    SelectStorageReducer,
    RecordListReducer,
    SearchVinReducer,
    SelectStorageForCarListReducer,
    ParkingViewReducer,
    AddCarReducer,
    SelectReceiveReducer,
    SelectEntrustReducer,
    SelectCityReducer,
    SelectBaseAddrReducer
})