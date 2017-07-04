import { Actions } from 'react-native-router-flux'

export const searchVin = (parent, param) => {
    if (parent === 'homeBlock') return Actions.searchVinAtHomeBlock
    if (parent === 'carBlock') return Actions.searchVinAtCarBlock
    if (parent === 'storageBlock') return Actions.searchVinAtStorageBlock
    if (parent === 'settingBlock') return Actions.searchVinAtSettingBlock
}

export const carInfo = (parent, param) => {
    if (parent === 'homeBlock') return Actions.carInfoAtHomeBlock
    if (parent === 'carBlock') return Actions.carInfoAtCarBlock
    if (parent === 'storageBlock') return Actions.carInfoAtStorageBlock
    if (parent === 'settingBlock') return Actions.carInfoAtSettingBlock
}