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
import { Container, Content, Input, Label, Icon } from 'native-base'
import globalStyles, { textColor } from '../GlobalStyles'
import { Field, reduxForm, getFormValues } from 'redux-form'
import TextBox from '../components/share/form/TextBox'
import Select from '../components/share/form/Select'
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
        getCarListWaiting } = props
    return (
        <Container>
            <Content style={{ margin: 10 }}>
                <Field
                    textStyle={[globalStyles.largeText, globalStyles.styleColor]}
                    label='vin:'
                    isRequired={true}
                    name='vin'
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
                <Field
                    textStyle={[globalStyles.largeText, globalStyles.styleColor]}
                    label='diver:'
                    isRequired={true}
                    name='diver'
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
                    return { id: item.id, value: item.truck_num }
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
            MoreAction:state.selectCarReducer.getCarListMore,
            data: {
                list: state.selectCarReducer.data.carList.map(item => {
                    return { id: item.id, value: item.vin }
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
        applyDamageReducer: state.applyDamageReducer,
        SelectCityReducer: state.SelectCityReducer,
        selectDriverValues: getFormValues('applyDamage')(state),
        formReducer: state.form
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
