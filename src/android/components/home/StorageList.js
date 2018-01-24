import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Image,
    Text,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import { Container, List,  ListItem } from 'native-base'
import PercentageCircle from 'react-native-percentage-circle'
import globalStyles from '../../GlobalStyles'
import { getStorageList, getStorageListWaiting } from '../../../actions/components/home/StorageListAtHomeAction'

const StorageItem = props => {
    const { storage: { storage_name }, storage } = props
    const count = storage.total_seats ? storage.total_seats : 0
    const percent = storage.total_seats ? Math.round(storage.balance / count * 100) : 100
    return (
        <View style={[globalStyles.listItem, styles.itemContainer]}>
            <View style={styles.infoView}>
                <View style={styles.infoViewRow}>
                    <Image source={{ uri: 'icon_house_1' }} style={styles.infoViewRow_image} />
                    <Text style={[globalStyles.midText,styles.storageName]}>{storage.storage_name}</Text>
                    <Text style={[globalStyles.midText,globalStyles.styleBackgroundColor,styles.count]}>总:{count.toString()}</Text>
                </View>
                <View style={[styles.infoViewRow, { paddingHorizontal: 30 }]}>
                    <View style={styles.infoViewCol}>
                        <Text style={[globalStyles.largeText, globalStyles.styleColor,styles.exportCount]}>{storage.exports.toString()}</Text>
                        <Text style={[globalStyles.ssText,styles.smallLabel]}>今日出库</Text>
                    </View>
                    <View style={styles.infoViewCol}>
                        <Text style={[globalStyles.largeText, globalStyles.styleColor]}>{(count - storage.balance).toString()}</Text>
                        <Text style={[globalStyles.ssText,styles.smallLabel]}>剩余车位</Text>
                    </View>
                </View>
            </View>
            <View style={styles.percentView}>
                <PercentageCircle radius={35} borderWidth={6} percent={percent} color={"#00cade"} >
                    <View>
                        <Text style={globalStyles.ssText}>使用率</Text>
                    </View>
                    <View style={styles.percentCenterView}>
                        <Text includeFontPadding={false} style={[globalStyles.largeText, globalStyles.styleColor]}>{percent.toString()}</Text>
                        <Text includeFontPadding={false} style={[globalStyles.ssText,globalStyles.styleColor,styles.percentSign]}>%</Text>
                    </View>
                </PercentageCircle>
            </View>
        </View>
    )
}

class StorageList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getStorageListWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getStorageList())
    }

    render() {
        const { storageListAtHomeReducer: { data: { storageList } } } = this.props
        console.log('storageList', storageList)
        const storages = storageList.map((item) => {
            return <StorageItem storage={item} key={item.id} />
        })
        return (
            <View style={globalStyles.listContainer}>
                {storages}
            </View>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        storageListAtHomeReducer: state.storageListAtHomeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getStorageList: () => {
        dispatch(getStorageList())
    },
    getStorageListWaiting: () => {
        dispatch(getStorageListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(StorageList)


const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row"
    },
    percentView: {
        flexDirection: "column",
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    percentCenterView: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
    percentSign: {
        marginLeft: 2
    },
    infoView: {
        flexDirection: "column",
        flex: 5,
        marginTop: 10,
        marginBottom: 10
    },
    infoViewCol: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoViewRow: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    infoViewRow_image: {
        width: 40,
        height: 40
    },
    storageName: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        marginLeft: 10
    },
    count: {
        color: '#fff',
        borderRadius: 15,
        width: 80,
        textAlign: 'center'
    },
    smallLabel: {
        color: '#b2b2b2'
    },
    exportCount: {
        color: '#c95256'
    }
})
