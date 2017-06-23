import React, { Component } from 'react'
import { Text, View, Button, ScrollView, } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import NavBar from '../components/Bar/NavBar'
import * as SelectReceiveAction from '../../actions/SelectReceiveAction'
import { List, ListItem } from 'native-base'


class SelectReceive extends Component {
    constructor(props) {
        super(props)


        this.onSelectReceive = this.onSelectReceive.bind(this)
    }

    componentDidMount() {
        this.props.getReceiveAll()
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { SelectReceiveReducer } = nextProps
        /** homeReducer.getStoragesHome */
        if (SelectReceiveReducer.receives.isExecStatus == 1) {
            console.log('SelectReceiveReducer.receives', '开始执行')
        }
        else if (SelectReceiveReducer.receives.isExecStatus == 2) {
            if (SelectReceiveReducer.receives.isResultStatus == 0) {
                console.log('SelectReceiveReducer.receives执行成功')
            } else if (SelectReceiveReducer.receives.isResultStatus == 1) {
                console.log('SelectReceiveReducer.receives执行错误')
            }
            else if (SelectReceiveReducer.receives.isResultStatus == 2) {
                console.log('SelectReceiveReducer.receives执行失败')
            }
        }
        /**************************************************************************** */
        return true
    }

    onSelectReceive(param) {
        this.props.onSelectReceive(param)
        Actions.pop()
    }

    render() {
        let { receiveList } = this.props.SelectReceiveReducer.receives.data
        let receives = receiveList.map(item => {
            return (<ListItem button key={item.id} onPress={() => this.onSelectReceive({ receiveId: item.id, receive: item.receive_name })}>
                <Text>{item.receive_name}</Text>
            </ListItem>)
        })
        return (
            <View style={{ flex: 1 }}>
                <NavBar title={'选择经销商'} />
                <ScrollView>
                    <List>
                        {receives}
                    </List>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        SelectReceiveReducer: state.SelectReceiveReducer,
        user: state.UserReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getReceiveAll: () => {
        dispatch(SelectReceiveAction.getReceiveAll())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectReceive)
