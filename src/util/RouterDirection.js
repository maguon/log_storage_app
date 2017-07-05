import { Actions } from 'react-native-router-flux'


export const carInfo = (parent) => {
    if (parent === 'homeBlock') return Actions.carInfoAtHomeBlock
    if (parent === 'carBlock') return Actions.carInfoAtCarBlock
    if (parent === 'storageBlock') return Actions.carInfoAtStorageBlock
    if (parent === 'settingBlock') return Actions.carInfoAtSettingBlock
}



export const addCar = (parent) => {
    if (parent === 'homeBlock') return Actions.addCarAtHomeBlock
    if (parent === 'carBlock') return Actions.addCarAtCarBlock
    if (parent === 'storageBlock') return Actions.addCarAtStorageBlock
    if (parent === 'settingBlock') return Actions.addCarAtSettingBlock
}