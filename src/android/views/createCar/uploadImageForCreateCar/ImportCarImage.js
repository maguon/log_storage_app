import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Modal,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import ImageItem from '../../../components/share/ImageItem'
import globalStyles from '../../../GlobalStyles'
import { connect } from 'react-redux'
import CameraButton from '../../../components/share/CameraButton'
import { file_host } from '../../../../config/Host'
import { Container, Content, Input, Label, Icon } from 'native-base'
import * as  importCarImageAction from './ImportCarImageAction'
import * as routerDirection from '../../../../util/RouterDirection'

const window = Dimensions.get('window')
const containerWidth = window.width / 2
const containerHeight = containerWidth / 16 * 9

const renderItem = props => {
    const { item, index, pushCarImageWaiting, pushCarImage, file_host, imageList, parent, carId, vin } = props
    if (item == 'isCameraButton') {
        return renderItemCameraButton({ index, pushCarImageWaiting, pushCarImage, carId, vin })
    } else {
        return (
            <TouchableOpacity
                key={index}
                style={styles.itemContainer}
                onPress={() => routerDirection.imageViewConnect(parent)({
                    mapStateToProps: imageMapStateToProps,
                    mapDispatchToProps: imageMapDispatchToProps,
                    imageIndex: index
                })} >
                <ImageItem imageUrl={`${file_host}/image/${item.url}`} />
            </TouchableOpacity>
        )
    }
}

const renderItemCameraButton = props => {
    const { index, pushCarImageWaiting, pushCarImage, carId, vin } = props
    return (
        <View key={index} style={styles.itemCameraButton}>
            <CameraButton
                getImage={(cameraReses) => pushCarImage({ cameraReses, carId, vin })}
                _cameraStart={pushCarImageWaiting}
            />
        </View>
    )
}

const renderListEmpty = props => {
    const { pushCarImageWaiting, pushCarImage, carId, vin } = props
    return (
        <View>
            <View style={styles.cameraButtonContainer}>
                <CameraButton
                    getImage={(cameraReses) => pushCarImage({ cameraReses, carId, vin })}
                    _cameraStart={pushCarImageWaiting} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={[globalStyles.largeText, globalStyles.styleColor]}>点击按钮上传车辆照片</Text>
            </View>
            <View style={styles.subtitleContainer}>
                <Text style={[globalStyles.smallText, globalStyles.styleColor]}>若不进行此选项操作可直接点击“<Text style={styles.tagText}>完成</Text>”</Text>
            </View>
        </View>
    )
}

const ImportCarImage = props => {
    const { parent,
        pushCarImageWaiting,
        pushCarImage,
        importCarImageReducer: { data: { imageList }, pushCarImage: { isResultStatus } },
        addCarReducer: { data: { carId, vin } },
    } = props
    const { communicationSettingReducer: { data: { base_host, record_host, file_host } } } = props
    return (
        <Container >
            <FlatList
                style={styles.flatList}
                showsVerticalScrollIndicator={false}
                data={imageList.length > 0 ? [...imageList, 'isCameraButton'] : imageList}
                numColumns={2}
                ListEmptyComponent={() => renderListEmpty({ pushCarImageWaiting, pushCarImage, carId, vin })}
                renderItem={({ item, index }) => renderItem({ parent, item, index, imageList, file_host, pushCarImageWaiting, pushCarImage, carId, vin })} />
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={isResultStatus == 1}
                onRequestClose={() => { }}>
                <View style={styles.modalContainer} >
                    <View style={styles.modalItem}>
                        <ActivityIndicator
                            animating={isResultStatus == 1}
                            style={styles.modalActivityIndicator}
                            size="large"
                        />
                        <Text style={styles.modalText}>正在上传图片...</Text>
                    </View>
                </View>
            </Modal>
        </Container>
    )
}

const styles = StyleSheet.create({
    cameraButtonContainer: {
        marginTop: 50
    },
    subtitleContainer: {
        marginTop: 10,
        alignItems: 'center'
    },
    titleContainer: {
        marginTop: 40,
        alignItems: 'center'
    },
    tagText: {
        color: 'red'
    },
    itemContainer: {
        margin: 5
    },
    listEmptyContainer: {
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    flatList: {
        padding: 5
    },
    itemCameraButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: containerWidth,
        height: containerHeight
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalItem: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalActivityIndicator: {
        height: 40
    },
    modalText: {
        color: '#fff',
        paddingLeft: 10
    }
})

const imageMapStateToProps = (state) => {
    return {
        imageViewReducer: {
            imageList: state.importCarImageReducer.data.imageList.map(item => `${file_host}image/${item.url}`)
        }
    }
}

const imageMapDispatchToProps = (dispatch) => ({
    delImage: (param) => {
        dispatch(importCarImageAction.delImage(param))

    }
})


const mapStateToProps = (state) => {
    return {
        importCarImageReducer: state.importCarImageReducer,
        addCarReducer: state.addCarReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    pushCarImageWaiting: () => {
        dispatch(importCarImageAction.pushCarImageWaiting())
    },
    pushCarImage: (param) => {
        dispatch(importCarImageAction.pushCarImage(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportCarImage)