import React, { Component } from 'react'
import { Text, View, Button, ScrollView, } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import NavBar from '../components/Bar/NavBar'
import * as SelectCityAction from '../../actions/SelectCityAction'
import { List, ListItem } from 'native-base'


class SelectCity extends Component {
    constructor(props) {
        super(props)


        this.onSelectCity = this.onSelectCity.bind(this)
    }

    componentDidMount() {
        this.props.getCityAll()
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { SelectCityReducer } = nextProps
        /** homeReducer.getStoragesHome */
        if (SelectCityReducer.citys.isExecStatus == 1) {
            console.log('SelectCityReducer.citys', '开始执行')
        }
        else if (SelectCityReducer.citys.isExecStatus == 2) {
            if (SelectCityReducer.citys.isResultStatus == 0) {
                console.log('SelectCityReducer.citys执行成功')
            } else if (SelectCityReducer.citys.isResultStatus == 1) {
                console.log('SelectCityReducer.citys执行错误')
            }
            else if (SelectCityReducer.citys.isResultStatus == 2) {
                console.log('SelectCityReducer.citys执行失败')
            }
        }

        /**************************************************************************** */
        return true
    }

    onSelectCity(param) {
        this.props.onSelectCity(param)
        Actions.pop()
    }


    render() {
        let { cityList } = this.props.SelectCityReducer.citys.data
        let citys = cityList.map(item => {
            return (<ListItem button key={item.id} onPress={() => this.onSelectCity({ cityId: item.id, city: item.city_name })}>
                <Text>{item.city_name}</Text>
            </ListItem>)
        })
        return (
            <View style={{ flex: 1 }}>
                <NavBar title={'选择城市'} />
                <ScrollView>
                    <List>
                        {citys}
                    </List>
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        SelectCityReducer: state.SelectCityReducer,
        user: state.UserReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCityAll: () => {
        dispatch(SelectCityAction.getCityAll())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectCity)
