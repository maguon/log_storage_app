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
import ImageItem from '../share/ImageItem'
import globalStyles from '../../GlobalStyles'
import { connect } from 'react-redux'
import CameraButton from '../../components/share/CameraButton'
import { Container, Content, Input, Label, Icon } from 'native-base'
import * as  imageListForCarInfoAction from '../../../actions/components/carInfo/ImageListForCarInfoAction'
import * as routerDirection from '../../../util/RouterDirection'

const window = Dimensions.get('window')
const containerWidth = window.width / 2
const containerHeight = containerWidth / 16 * 9

const renderItem = props => {
    const { item, index, uploadCarImageWaiting, uploadCarImage, carImageList, file_host, parent, carId, vin } = props
    if (item == 'isCameraButton') {
        return renderItemCameraButton({ index, uploadCarImageWaiting, uploadCarImage, carId, vin })
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
    const { index, uploadCarImageWaiting, uploadCarImage, carId, vin } = props
    return (
        <View key={index} style={styles.itemCameraButton}>
            <CameraButton
                getImage={(cameraReses) => uploadCarImage({ cameraReses, carId, vin })}
                _cameraStart={uploadCarImageWaiting}
            />
        </View>
    )
}

const renderListEmpty = props => {
    const { uploadCarImageWaiting, uploadCarImage, carId, vin } = props
    return (
        <View>
            <View style={styles.cameraButtonContainer}>
                <CameraButton
                    getImage={(cameraReses) => uploadCarImage({ cameraReses, carId, vin })}
                    _cameraStart={uploadCarImageWaiting} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={[globalStyles.largeText, globalStyles.styleColor]}>点击按钮上传车辆图片</Text>
            </View>
        </View>
    )
}

const ImageListForCarInfo = props => {
    const { parent,
        uploadCarImageWaiting,
        uploadCarImage,
        imageListForCarInfoReducer: { data: { carImageList }, uploadCarImage: { isResultStatus } },
        car: { id, vin } } = props
    const { communicationSettingReducer: { data: { base_host, record_host, file_host } } } = props
    return (
        <Container >
            <FlatList
                style={styles.flatList}
                showsVerticalScrollIndicator={false}
                data={carImageList.length > 0 ? [...carImageList, 'isCameraButton'] : carImageList}
                numColumns={2}
                ListEmptyComponent={() => renderListEmpty({ uploadCarImageWaiting, uploadCarImage, carId: id, vin })}
                renderItem={({ item, index }) => renderItem({ parent, item, index, carImageList, file_host, uploadCarImageWaiting, uploadCarImage, carId: id, vin })} />
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
    const { communicationSettingReducer: { data: { base_host, record_host, file_host } } } = state

    return {
        imageViewReducer: {
            imageList: state.imageListForCarInfoReducer.data.carImageList.map(item => `${file_host}image/${item.url}`)
        }
    }
}

const imageMapDispatchToProps = (dispatch) => ({
    delImage: (param) => {
        dispatch(imageListForCarInfoAction.delImage(param))
    }
})


const mapStateToProps = (state) => {
    return {
        imageListForCarInfoReducer: state.imageListForCarInfoReducer,
        communicationSettingReducer: state.communicationSettingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    uploadCarImageWaiting: () => {
        dispatch(imageListForCarInfoAction.uploadCarImageWaiting())
    },
    uploadCarImage: (param) => {
        dispatch(imageListForCarInfoAction.uploadCarImage(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageListForCarInfo)