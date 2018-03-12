import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, InteractionManager, View, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import * as StorageListAction from './StorageListAction'
import { Actions } from 'react-native-router-flux'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import { Container, ListItem, Icon, Left, Body, Right } from 'native-base'
import globalStyles, { styleColor } from '../../../GlobalStyles'

class StorageList extends Component {
    constructor(props) {
        super(props)
        this._getStorageList = this._getStorageList.bind(this)
    }

    componentDidMount() {
        this._getStorageList()
    }

    _getStorageList() {
        const { getStorageListWaiting, getStorageList } = this.props
        const now = moment().format('YYYYMMDD')
        getStorageListWaiting()
        InteractionManager.runAfterInteractions(() => getStorageList({
            optionalParam: {
                dateStart: now,
                dateEnd: now
            }
        }))
    }

    render() {
        const { storageListReducer: { data: { storageList } }, storageListReducer } = this.props
        return (
            <FlatList
                refreshControl={<RefreshControl
                    refreshing={storageListReducer.getStorageList.isResultStatus == 1}
                    onRefresh={this._getStorageList}
                    colors={[styleColor]}
                />}
                data={storageList}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                ListEmptyComponent={() => renderEmpty(storageListReducer.getStorageList.isResultStatus)}
            />
        )
    }

}

const renderEmpty = isResultStatus => {
    if (isResultStatus == 2) {
        return (
            <View style={styles.listEmptyContainer}>
                <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无车库记录</Text>
            </View>
        )
    } else {
        return (<View />)
    }

}

const renderItem = props => {
    const { item: { storage_name, balance, total_seats, storage_id } } = props
    return (
        <ListItem icon>
            <Left>
                <FontAwesomeIcon name='home' size={20} color={styleColor} />
            </Left>
            <Body>
                <Text style={[globalStyles.midText, styles.storageName]}>{storage_name}</Text>
            </Body>
            <Right>
                <Text style={[globalStyles.smallText, styles.pCount]}><Text style={styles.pCountTag}>剩余车位：</Text>{total_seats ? `${total_seats - balance}` : `0`}</Text>
            </Right>
        </ListItem>
    )
}


const styles = StyleSheet.create({
    storageName: {
        color: '#8b8b8b'
    },
    pCountTag: {
        color: '#bfbfbf'
    },
    pCount: {
        color: '#f7656a'
    },
    listEmptyContainer: {
        alignItems: 'center',
        marginTop: 60
    },
    listEmptyText: {
        color: '#aaa',
        marginTop: 30
    }
})

const mapStateToProps = (state) => {
    return {
        storageListReducer: state.StorageListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getStorageList: (param) => {
        dispatch(StorageListAction.getStorageList(param))
    },
    getStorageListWaiting: () => {
        dispatch(StorageListAction.getStorageListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(StorageList)