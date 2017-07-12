import React, { Component } from 'react'
import { Text, View, Button, ScrollView, } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import NavBar from '../../../components/Bar/NavBar'
import * as SelectBaseAddrAction from '../../../../actions/SelectBaseAddrAction'
import { List, ListItem } from 'native-base'


class SelectBaseAddr extends Component {
    constructor(props) {
        super(props)
        this.onSelectBaseAddr = this.onSelectBaseAddr.bind(this)
    }

    componentDidMount() {
        if (this.props.cityId) {
            this.props.getBaseAddrAll({
                optionalParam: {
                    cityId: this.props.cityId
                }
            })
        }
        else {
            this.props.getBaseAddrAll({ optionalParam: {} })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { SelectBaseAddrReducer } = nextProps
        /** SelectBaseAddrReducer.baseAddrs */
        if (SelectBaseAddrReducer.baseAddrs.isExecStatus == 1) {
            console.log('SelectBaseAddrReducer.baseAddrs', '开始执行')
        }
        else if (SelectBaseAddrReducer.baseAddrs.isExecStatus == 2) {
            if (SelectBaseAddrReducer.baseAddrs.isResultStatus == 0) {
                console.log('SelectBaseAddrReducer.baseAddrs执行成功')
            } else if (SelectBaseAddrReducer.baseAddrs.isResultStatus == 1) {
                console.log('SelectBaseAddrReducer.baseAddrs执行错误')
            }
            else if (SelectBaseAddrReducer.baseAddrs.isResultStatus == 2) {
                console.log('SelectBaseAddrReducer.baseAddrs执行失败')
            }
        }

        /**************************************************************************** */
        return true
    }

    onSelectBaseAddr(param) {
        this.props.onSelect(param)
        Actions.pop()

    }

    render() {
        let { baseAddrList } = this.props.SelectBaseAddrReducer.baseAddrs.data
        let baseAddrs = baseAddrList.map(item => {
            return (<ListItem button key={item.id} onPress={() => this.onSelectBaseAddr({ id: item.id, value: item.addr_name })}>
                <Text>{item.addr_name}</Text>
            </ListItem>)
        })
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <List>
                        {baseAddrs}
                    </List>
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        SelectBaseAddrReducer: state.SelectBaseAddrReducer,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getBaseAddrAll: (param) => {
        dispatch(SelectBaseAddrAction.getBaseAddrAll(param))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectBaseAddr)
