import React, { Component } from 'react'
import { View, ScrollView, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../../../components/Bar/NavBar'
import { Actions } from 'react-native-router-flux'
import * as SelectStorageAction from '../../../../actions/SelectStorageAction'
import { List, ListItem, Text, Right } from 'native-base'

class SelectStorage extends Component {
    constructor(props) {
        super(props)

        this._onPressItem = this._onPressItem.bind(this)
    }

    componentWillMount() {
        this.props.getSelectStorageList({
            optionalParam: {
                storageStatus: 1
            }
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { selectStorageReducer } = nextProps
        /*getSelectStorageList 执行状态*/
        if (selectStorageReducer.getSelectStorageList.isExecStatus == 1) {
            console.log('selectStorageReducer.getSelectStorageList开始执行')
        } else if (selectStorageReducer.getSelectStorageList.isExecStatus == 2) {
            console.log('selectStorageReducer.getSelectStorageList执行完毕')
            if (selectStorageReducer.getSelectStorageList.isResultStatus == 0) {
                console.log('selectStorageReducer.getSelectStorageList执行成功')
            } else if (selectStorageReducer.getSelectStorageList.isResultStatus == 1) {
                console.log('selectStorageReducer.getSelectStorageList执行错误')
            } else if (selectStorageReducer.getSelectStorageList.isResultStatus == 2) {
                console.log('selectStorageReducer.getSelectStorageList执行失败')
            }
        }
        /************************************************************************************************/
        return true
    }

    _onPressItem(param) {
        let { popName, routerList, onSelect } = this.props
        let nextPage = routerList.shift()
        if (nextPage) {
            console.log('param', param)
            nextPage({
                ...param,
                popName,
                onSelect,
                routerList
            })
        }
        else {
            onSelect(param)
            Actions.popTo(popName)
        }
    }

    render() {
        console.log('this.props', this.props)
        let { selectStorageList } = this.props.selectStorageReducer.getSelectStorageList.data
        let storages = selectStorageList.map((item, i) => {
            return (
                <ListItem key={i} button onPress={() => this._onPressItem({ storageId: item.id, storageName: item.storage_name })}>
                    <Text>{item.storage_name}</Text>
                </ListItem>
            )
        })
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <List>
                        {storages}
                    </List>
                </ScrollView>
            </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        selectStorageReducer: state.SelectStorageReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getSelectStorageList: (param) => {
        dispatch(SelectStorageAction.getSelectStorageList(param))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectStorage)