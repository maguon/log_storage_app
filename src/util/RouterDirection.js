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

export const selectEntrust = (parent) => {
    if (parent === 'homeBlock') return Actions.selectEntrustAtHomeBlock
    if (parent === 'carBlock') return Actions.selectEntrustAtCarBlock
    if (parent === 'storageBlock') return Actions.selectEntrustAtStorageBlock
    if (parent === 'settingBlock') return Actions.selectEntrustAtSettingBlock
}

export const selectCarMake = (parent) => {
    if (parent === 'homeBlock') return Actions.selectCarMakeAtHomeBlock
    if (parent === 'carBlock') return Actions.selectCarMakeAtCarBlock
    if (parent === 'storageBlock') return Actions.selectCarMakeAtStorageBlock
    if (parent === 'settingBlock') return Actions.selectCarMakeAtSettingBlock
}

export const selectReceive = (parent) => {
    if (parent === 'homeBlock') return Actions.selectReceiveAtHomeBlock
    if (parent === 'carBlock') return Actions.selectReceiveAtCarBlock
    if (parent === 'storageBlock') return Actions.selectReceiveAtStorageBlock
    if (parent === 'settingBlock') return Actions.selectReceiveAtSettingBlock
}

export const selectCity = (parent) => {
    if (parent === 'homeBlock') return Actions.selectCityAtHomeBlock
    if (parent === 'carBlock') return Actions.selectCityAtCarBlock
    if (parent === 'storageBlock') return Actions.selectCityAtStorageBlock
    if (parent === 'settingBlock') return Actions.selectCityAtSettingBlock
}

export const richText = (parent) => {
    if (parent === 'homeBlock') return Actions.richTextAtHomeBlock
    if (parent === 'carBlock') return Actions.richTextAtCarBlock
    if (parent === 'storageBlock') return Actions.richTextAtStorageBlock
    if (parent === 'settingBlock') return Actions.richTextAtSettingBlock
}

export const selectBaseAddr = (parent) => {
    if (parent === 'homeBlock') return Actions.selectBaseAddrAtHomeBlock
    if (parent === 'carBlock') return Actions.selectBaseAddrAtCarBlock
    if (parent === 'storageBlock') return Actions.selectBaseAddrAtStorageBlock
    if (parent === 'settingBlock') return Actions.selectBaseAddrAtSettingBlock
}

export const importCarCamera = (parent) => {
    if (parent === 'homeBlock') return Actions.importCarCameraAtHomeBlock
    if (parent === 'carBlock') return Actions.importCarCameraAtCarBlock
    if (parent === 'storageBlock') return Actions.importCarCameraAtStorageBlock
    if (parent === 'settingBlock') return Actions.importCarCameraAtSettingBlock
}


export const importCar = (parent) => {
    if (parent === 'homeBlock') return Actions.importCarAtHomeBlock
    if (parent === 'carBlock') return Actions.importCarAtCarBlock
    if (parent === 'storageBlock') return Actions.importCarAtStorageBlock
    if (parent === 'settingBlock') return Actions.importCarAtSettingBlock
}

