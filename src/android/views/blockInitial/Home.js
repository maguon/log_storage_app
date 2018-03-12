import React, { Component } from 'react'
import { StyleSheet, InteractionManager } from 'react-native'
import RecordList from '../../components/home/record/RecordList'
import StorageList from '../../components/home/storage/StorageList'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { Container, Content, Spinner } from 'native-base'
import { styleColor } from '../../GlobalStyles'
import { getRecordList, getRecordListWaiting } from '../../components/home/record/RecordListAtHomeAction'
import { getStorageList, getStorageListWaiting } from '../../components/home/storage/StorageListAtHomeAction'

class Home extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { getRecordListWaiting, getStorageListWaiting, getRecordList, getStorageList } = this.props
        getRecordListWaiting()
        getStorageListWaiting()
        InteractionManager.runAfterInteractions(() => {
            getRecordList()
            getStorageList()
        })
    }

    render() {
        const { recordListAtHomeReducer: { getRecordList }, storageListAtHomeReducer: { getStorageList } } = this.props
        if (getRecordList.isResultStatus != 1 || getStorageList.isResultStatus != 1) {
            return (
                <Container >
                    <Content showsVerticalScrollIndicator={false}>
                        <StorageList />
                        <RecordList />
                    </Content>
                </Container>
            )
        } else {
            return (
                <Container >
                    <Spinner color={styleColor} />
                </Container>
            )
        }
    }
}


const mapStateToProps = (state) => {
    return {
        recordListAtHomeReducer: state.recordListAtHomeReducer,
        storageListAtHomeReducer: state.storageListAtHomeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRecordList: () => {
        dispatch(getRecordList())
    },
    getRecordListWaiting: () => {
        dispatch(getRecordListWaiting())
    },
    getStorageList: () => {
        dispatch(getStorageList())
    },
    getStorageListWaiting: () => {
        dispatch(getStorageListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)