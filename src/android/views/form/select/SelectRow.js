import React, { Component } from 'react'
import { View, ScrollView, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../../../components/Bar/NavBar'
import { Actions } from 'react-native-router-flux'
import * as SelectRowAction from '../../../../actions/SelectRowAction'
import { List, ListItem, Text } from 'native-base'

class SelectRow extends Component {
    constructor(props) {
        super(props)

        this._onPressItem = this._onPressItem.bind(this)
    }

    componentWillMount() {
        this.props.getStorageParkingList({
            optionalParam: {
                storageId: this.props.storageId
            }
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { selectRowReducer } = nextProps
        /*getStorageParkingList 执行状态*/
        if (selectRowReducer.getStorageParkingList.isExecStatus == 1) {
            console.log('selectRowReducer.getStorageParkingList开始执行')
        } else if (selectRowReducer.getStorageParkingList.isExecStatus == 2) {
            console.log('selectRowReducer.getStorageParkingList执行完毕')
            if (selectRowReducer.getStorageParkingList.isResultStatus == 0) {
                console.log('selectRowReducer.getStorageParkingList执行成功')
            } else if (selectRowReducer.getStorageParkingList.isResultStatus == 1) {
                console.log('selectRowReducer.getStorageParkingList执行错误')
            } else if (selectRowReducer.getStorageParkingList.isResultStatus == 2) {
                console.log('selectRowReducer.getStorageParkingList执行失败')
            }
        }
        /************************************************************************************************/
        return true
    }

    _onPressItem(param) {
        let { popName, routerList, onSelect, storageId, storageName } = this.props
        let nextPage = routerList.shift()
        if (nextPage) {
            nextPage({
                ...param,
                storageId,
                storageName,
                popName,
                onSelect,
                routerList
            })
        }
        else {
            onSelect({...param,storageId,storageName})
            Actions.popTo(popName)
        }
    }

    render() {
        console.log('this.props',this.props)
        let { sorageParkingList } = this.props.selectRowReducer.getStorageParkingList.data
        let storageParkings = sorageParkingList.reduce((acc, val) => {
            if (val.car_id == 0) {
                let row = acc.find(item => { return item.row == val.row })
                if (!row) {
                    row = {}
                    row.row = val.row
                    row.columns = []
                    acc.push(row)
                }
                row.columns.push({ col: val.col, parkingId: val.id })
            }
            return acc
        }, []).sort((a, b) => {
            return a.row - b.row
        })

        storageParkings = storageParkings.map((item,i) => {
            return (
                <ListItem key={i} button onPress={() => this._onPressItem({ columns: item.columns, row: item.row })}>
                    <Text>{item.row.toString()}</Text>
                </ListItem>
            )
        })

        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <List>
                        {storageParkings}
                    </List>

                </ScrollView>
            </View>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        selectRowReducer: state.SelectRowReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getStorageParkingList: (param) => {
        dispatch(SelectRowAction.getStorageParkingList(param))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectRow)