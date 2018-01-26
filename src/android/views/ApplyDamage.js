import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Container, Content, Input, Label, Icon, ListItem } from 'native-base'
import globalStyles, { textColor } from '../GlobalStyles'
import { Field, reduxForm, getFormValues } from 'redux-form'
import TextBox from '../components/share/form/TextBox'
import Select from '../components/share/form/Select'
import RichTextBox from '../components/share/form/RichTextBox'
import DisposableList from '../views/form/select/DisposableList'
import PagingList from '../views/form/select/PagingList'
import * as routerDirection from '../../util/RouterDirection'
import * as selectTruckAction from '../../actions/components/select/selectTruckAction'
import * as selectCarAction from '../../actions/components/select/selectCarAction'
import * as applyDamageSubmitAction from '../components/applyDamage/submit/ApplyDamageSubmitAction'


const ApplyDamage = props => {
    const { getSelectDriverList,
        getSelectDriverListWaiting,
        parent,
        SelectCityReducer,
        getTruckList,
        getTruckListWaiting,
        getCarList,
        getCarListWaiting,
        applyDamageFormValues = {} } = props
    const { car, truck } = applyDamageFormValues
    return (
        <Container>
            <Content showsVerticalScrollIndicator={false}>
                <Field
                    textStyle={[globalStyles.largeText, globalStyles.styleColor]}
                    label='vin：'
                    isRequired={true}
                    name='car'
                    component={Select}
                    getList={getCarList}
                    getListWaiting={getCarListWaiting}
                    showList={param => {
                        return Actions.listCennectDynamic({
                            mapStateToProps: vinMapStateToProps,
                            mapDispatchToProps: vinMapDispatchToProps,
                            List: PagingList,
                            ...param
                        })
                    }} />
                {car && car.make_name && <ListItem >
                    <Text>品牌：{car.make_name}</Text>
                </ListItem>}
                {car && car.re_short_name && <ListItem >
                    <Text>经销商：{car.re_short_name}</Text>
                </ListItem>}
                {car && car.en_short_name && <ListItem >
                    <Text>委托方：{car.en_short_name}</Text>
                </ListItem>}
                <Field
                    label='货车牌号：'
                    isRequired={true}
                    name='truck'
                    component={Select}
                    getList={getTruckList}
                    getListWaiting={getTruckListWaiting}
                    showList={param => {
                        return Actions.listCennect({
                            mapStateToProps: truckMapStateToProps,
                            mapDispatchToProps: truckMapDispatchToProps,
                            List: DisposableList,
                            ...param
                        })
                    }} />
                {truck && truck.drive_name && <ListItem >
                    <Text>司机：{truck.drive_name}</Text>
                </ListItem>}
                <Field name='remark' label='质损描述：' component={RichTextBox}/>
            </Content>
        </Container >
    )
}


const styles = StyleSheet.create({
    item: {
        margin: 15
    },
    label: {
        marginVertical: 15
    },
    itemSelectContainer: {
        borderBottomWidth: 0.3,
        borderColor: '#777',
        paddingBottom: 15
    },
    itemSelect: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputArea: {
        height: 200,
        textAlignVertical: 'top',
        borderWidth: 0.3,
        borderColor: '#777'
    }
})

const validate = values => {
    const errors = { damageRemark: '', selectDriver: '' }
    if (!values.damageRemark) {
        errors.damageRemark = '必填'
    }

    if (!values.selectDriver) {
        errors.selectDriver = '必选'
    } else {
        if (!values.selectDriver.truck_id) {
            errors.selectDriver = '该司机未绑定车头'
        }
    }
    return errors
}

const truckMapStateToProps = (state) => {
    return {
        listReducer: {
            Action: state.selectTruckReducer.getTruckList,
            data: {
                list: state.selectTruckReducer.data.truckList.map(item => {
                    return { id: item.id, value: item.truck_num, drive_name: item.drive_name }
                })
            }
        },
        filter: getFormValues('SearchForm')(state) ? getFormValues('SearchForm')(state).searchField : undefined
    }
}

const truckMapDispatchToProps = (dispatch) => ({

})



const vinMapStateToProps = (state) => {
    return {
        listReducer: {
            Action: state.selectCarReducer.getCarList,
            MoreAction: state.selectCarReducer.getCarListMore,
            data: {
                list: state.selectCarReducer.data.carList.map(item => {
                    return {
                        id: item.id,
                        value: item.vin,
                        make_name: item.make_name,
                        en_short_name: item.en_short_name,
                        re_short_name: item.re_short_name
                    }
                })
            }
        }
    }
}

const vinMapDispatchToProps = (dispatch) => ({
    getListMore: () => {
        dispatch(selectCarAction.getCarListMore())
    }
})

const mapStateToProps = (state) => {
    return {
        applyDamageFormValues: getFormValues('applyDamage')(state)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getTruckList: () => {
        dispatch(selectTruckAction.getTruckList())
    },
    getTruckListWaiting: () => {
        dispatch(selectTruckAction.getTruckListWaiting())
    },
    getCarList: () => {
        dispatch(selectCarAction.getCarList())
    },
    getCarListWaiting: () => {
        dispatch(selectCarAction.getCarListWaiting())
    },
    onSubmit: () => {

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'applyDamage',
        // validate
    })(ApplyDamage)
)
