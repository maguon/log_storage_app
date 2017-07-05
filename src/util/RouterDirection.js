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


                                //     <Scene key="SelectEntrustAtHomeBlock" component={SelectEntrust} title='新增车辆' hideNavBar={false} hideTabBar/>
                                // <Scene key="SelectReceiveAtHomeBlock" component={SelectReceive} title='新增车辆' hideNavBar={false} hideTabBar />
                                // <Scene key="SelectCityAtHomeBlock" component={SelectCity} title='新增车辆' hideNavBar={false} hideTabBar />
                                // <Scene key="RichTextAtHomeBlock" component={RichText} title='新增车辆' hideNavBar={false} hideTabBar />
                                // <Scene key="SelectBaseAddrAtHomeBlock" component={SelectBaseAddr} title='新增车辆' hideNavBar={false} hideTabBar />