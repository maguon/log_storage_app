import React, { Component } from 'react'
import { Text, View, FlatList, TouchableNativeFeedback } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { getAreaList } from '../../../../actions/SelectAreaAction'


class SelectArea extends Component {
    constructor(props) {
        super(props)
        this._onPressItem = this._onPressItem.bind(this)

    }

    componentWillMount() {
        console.log(this.props)
        this.props.getAreaList(
            {
                optionalParam: {
                    areaStatus: 1,
                    storageId: this.props.storageId
                }
            }
        )
    }

    _onPressItem(param) {
        let { routerIndex, popName, routerList, onSelect, storageId, storageName } = this.props
        if (routerList.length > 0 && routerIndex < routerList.length) {
            routerList[routerIndex]({
                ...param,
                routerIndex: routerIndex + 1,
                storageId,
                storageName,
                popName,
                onSelect,
                routerList,
                areaId:param.id
            })
        }
        else {
            onSelect({ ...param, storageId, storageName })
            Actions.popTo(popName)
        }
    }

    render() {
        console.log(this.props.SelectAreaReducer)
        return <View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={this.props.SelectAreaReducer.data.areaList}
                renderItem={({ item }) => {
                    return (
                        <TouchableNativeFeedback key={item.id} onPress={() => this._onPressItem(item)} background={TouchableNativeFeedback.SelectableBackground()}>
                            <View key={item.id} style={{ paddingHorizontal: 10, paddingVertical: 10, borderBottomWidth: 0.5, borderColor: '#dddddd' }}>
                                <Text>{item.area_name}</Text>
                            </View>
                        </TouchableNativeFeedback>
                    )
                }}
            />
        </View>
    }
}


const mapStateToProps = (state) => {
    return {
        SelectAreaReducer: state.SelectAreaReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAreaList: (param) => {
        dispatch(getAreaList(param))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectArea)