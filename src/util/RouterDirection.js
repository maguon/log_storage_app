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

export const singlePhotoView =parent =>{
    console.log('parent',parent)
    if (parent === 'homeBlock') return Actions.singlePhotoViewAtHomeBlock
    if (parent === 'carBlock') return Actions.singlePhotoViewAtCarBlock
    if (parent === 'settingBlock') return Actions.singlePhotoViewAtSettingBlock
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

export const imageViewConnect =parent =>{
      if (parent === 'homeBlock') return Actions.imageViewConnectAtHomeBlock
      if (parent === 'carBlock') return Actions.imageViewConnectAtCarBlock
}


export const carInfoConnect = (parent) => {
    if (parent === 'homeBlock') return Actions.carInfoConnectAtHomeBlock
    if (parent === 'carBlock') return Actions.carInfoConnectAtCarBlock
}


export const popToCarInfoConnect = parent => {
    // if (parent === 'homeBlock') return Actions.popTo('carInformationAtCarBlock')
    if (parent === 'carBlock') Actions.popTo('carInfoConnectAtCarBlock')
    // if (parent === 'storageBlock') return Actions.listCennectAtStorageBlock
    // if (parent === 'settingBlock') return Actions.listCennectAtSettingBlock
}

