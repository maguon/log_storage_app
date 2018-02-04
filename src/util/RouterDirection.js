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


export const richText = (parent) => {
    if (parent === 'homeBlock') return Actions.richTextAtHomeBlock
    if (parent === 'carBlock') return Actions.richTextAtCarBlock
    if (parent === 'storageBlock') return Actions.richTextAtStorageBlock
    if (parent === 'settingBlock') return Actions.richTextAtSettingBlock
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

export const carInformation = (parent) => {
    if (parent === 'homeBlock') return Actions.carInformationAtHomeBlock
    if (parent === 'carBlock') return Actions.carInformationAtCarBlock
    if (parent === 'storageBlock') return Actions.carInformationAtStorageBlock
    if (parent === 'settingBlock') return Actions.carInformationAtSettingBlock
}

export const ImagePageForCarInfo = (parent) => {
    if (parent === 'homeBlock') return Actions.ImagePageForCarInfoAtHomeBlock
    if (parent === 'carBlock') return Actions.ImagePageForCarInfoAtCarBlock
    if (parent === 'storageBlock') return Actions.ImagePageForCarInfoAtStorageBlock
    if (parent === 'settingBlock') return Actions.ImagePageForCarInfoAtSettingBlock
}

export const ImagePageForImportCar = (parent) => {
    if (parent === 'homeBlock') return Actions.ImagePageForImportCarAtHomeBlock
    if (parent === 'carBlock') return Actions.ImagePageForImportCarAtCarBlock
    if (parent === 'storageBlock') return Actions.ImagePageForImportCarAtStorageBlock
    if (parent === 'settingBlock') return Actions.ImagePageForImportCarAtSettingBlock
}


export const listCennect = (parent) => {
    if (parent === 'homeBlock') return Actions.listCennectAtHomeBlock
    if (parent === 'carBlock') return Actions.listCennectAtCarBlock
    if (parent === 'storageBlock') return Actions.listCennectAtStorageBlock
    if (parent === 'settingBlock') return Actions.listCennectAtSettingBlock
}

export const listCennectNav = (parent) => {
    if (parent === 'homeBlock') return Actions.listCennectNavAtHomeBlock
    if (parent === 'carBlock') return Actions.listCennectNavAtCarBlock
    // if (parent === 'storageBlock') return Actions.listCennectNavAtStorageBlock
    // if (parent === 'settingBlock') return Actions.listCennectNavAtSettingBlock
}


export const popToCarInfo = parent => {
    // if (parent === 'homeBlock') return Actions.popTo('carInformationAtCarBlock')
    if (parent === 'carBlock') Actions.popTo('carInformationAtCarBlock')
    // if (parent === 'storageBlock') return Actions.listCennectAtStorageBlock
    // if (parent === 'settingBlock') return Actions.listCennectAtSettingBlock
}





// export const selectStorage = (parent) => {
//     if (parent === 'homeBlock') return Actions.selectStorageAtHomeBlock
//     if (parent === 'carBlock') return Actions.selectStorageAtCarBlock
//     if (parent === 'storageBlock') return Actions.selectStorageAtStorageBlock
//     if (parent === 'settingBlock') return Actions.selectStorageAtSettingBlock
// }

// export const selectRow = (parent) => {
//     if (parent === 'homeBlock') return Actions.selectRowAtHomeBlock
//     if (parent === 'carBlock') return Actions.selectRowAtCarBlock
//     if (parent === 'storageBlock') return Actions.selectRowAtStorageBlock
//     if (parent === 'settingBlock') return Actions.selectRowAtSettingBlock
// }

// export const selectColumn = (parent) => {
//     if (parent === 'homeBlock') return Actions.selectColumnAtHomeBlock
//     if (parent === 'carBlock') return Actions.selectColumnAtCarBlock
//     if (parent === 'storageBlock') return Actions.selectColumnAtStorageBlock
//     if (parent === 'settingBlock') return Actions.selectColumnAtSettingBlock
// }



// export const selectEntrust = (parent) => {
//     if (parent === 'homeBlock') return Actions.selectEntrustAtHomeBlock
//     if (parent === 'carBlock') return Actions.selectEntrustAtCarBlock
//     if (parent === 'storageBlock') return Actions.selectEntrustAtStorageBlock
//     if (parent === 'settingBlock') return Actions.selectEntrustAtSettingBlock
// }

// export const selectCarMake = (parent) => {
//     if (parent === 'homeBlock') return Actions.selectCarMakeAtHomeBlock
//     if (parent === 'carBlock') return Actions.selectCarMakeAtCarBlock
//     if (parent === 'storageBlock') return Actions.selectCarMakeAtStorageBlock
//     if (parent === 'settingBlock') return Actions.selectCarMakeAtSettingBlock
// }

// export const selectReceive = (parent) => {
//     if (parent === 'homeBlock') return Actions.selectReceiveAtHomeBlock
//     if (parent === 'carBlock') return Actions.selectReceiveAtCarBlock
//     if (parent === 'storageBlock') return Actions.selectReceiveAtStorageBlock
//     if (parent === 'settingBlock') return Actions.selectReceiveAtSettingBlock
// }

// export const selectCity = (parent) => {
//     if (parent === 'homeBlock') return Actions.selectCityAtHomeBlock
//     if (parent === 'carBlock') return Actions.selectCityAtCarBlock
//     if (parent === 'storageBlock') return Actions.selectCityAtStorageBlock
//     if (parent === 'settingBlock') return Actions.selectCityAtSettingBlock
// }



// export const selectBaseAddr = (parent) => {
//     if (parent === 'homeBlock') return Actions.selectBaseAddrAtHomeBlock
//     if (parent === 'carBlock') return Actions.selectBaseAddrAtCarBlock
//     if (parent === 'storageBlock') return Actions.selectBaseAddrAtStorageBlock
//     if (parent === 'settingBlock') return Actions.selectBaseAddrAtSettingBlock
// }



// export const selectArea = (parent) => {
//     if (parent === 'homeBlock') return Actions.selectAreaAtHomeBlock
//     if (parent === 'carBlock') return Actions.selectAreaAtCarBlock
//     if (parent === 'storageBlock') return Actions.selectAreaAtStorageBlock
//     if (parent === 'settingBlock') return Actions.selectAreaAtSettingBlock
// }