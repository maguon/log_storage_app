import React, { Component } from 'react'
import { Text, View, Button, ScrollView, } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import NavBar from '../components/Bar/NavBar'
import * as SelectEntrustAction from '../../actions/SelectEntrustAction'
import { List, ListItem } from 'native-base'


class SelectEntrust extends Component {
    constructor(props) {
        super(props)


        this.onSelectEntrust = this.onSelectEntrust.bind(this)
    }

    componentDidMount() {
        this.props.getEntrustAll()
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { SelectEntrustReducer } = nextProps
        /** SelectEntrustReducer.getEntrustAll */
        if (SelectEntrustReducer.entrusts.isExecStatus == 1) {
            console.log('SelectEntrustReducer.entrusts', '开始执行')
        }
        else if (SelectEntrustReducer.entrusts.isExecStatus == 2) {
            if (SelectEntrustReducer.entrusts.isResultStatus == 0) {
                console.log('SelectEntrustReducer.entrusts执行成功')
            } else if (SelectEntrustReducer.entrusts.isResultStatus == 1) {
                console.log('SelectEntrustReducer.entrusts执行错误')
            }
            else if (SelectEntrustReducer.entrusts.isResultStatus == 2) {
                console.log('SelectEntrustReducer.entrusts执行失败')
            }
        }

        /**************************************************************************** */
        return true
    }

    onSelectEntrust(param) {
        this.props.onSelectEntrust(param)
        Actions.pop()

    }

    render() {
        let { entrustList } = this.props.SelectEntrustReducer.entrusts.data
        let entrusts = entrustList.map(item => {
            return (<ListItem button key={item.id} onPress={() => this.onSelectEntrust({ entrustId: item.id, entrust: item.short_name })}>
                <Text>{item.short_name}</Text>
            </ListItem>)
        })
        return (
            <View style={{ flex: 1 }}>
                <NavBar title={'选择委托方'} />
                <ScrollView>
                    <List>
                        {entrusts}
                    </List>
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        SelectEntrustReducer: state.SelectEntrustReducer,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getEntrustAll: () => {
        dispatch(SelectEntrustAction.getEntrustAll())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectEntrust)
