import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, Image, Alert, Modal, TouchableHighlight } from 'react-native'
import { Button, Icon, Spinner } from 'native-base'
import ImageResizer from 'react-native-image-resizer'
import ImagePicker from 'react-native-image-picker'
import ImageCropPicker from 'react-native-image-crop-picker'
import CarCameraItem from './CarCameraItem'

const window = Dimensions.get('window')
let ImageWidth = (window.width - 30) / 2
let ImageHeight = ImageWidth / 16 * 9

var photoOptions = {
    //底部弹出框选项
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: null,
    customButtons: [{ title: '选择照片（一次最多5张）', name: 'choosePhoto' }],
    quality: 0.75,
    allowsEditing: true,
    noData: false,
    maxWidth: 960,
    maxHeight: 960,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
}


const baseStyle = {
    cameraButtonStyle: {
        borderRadius: 35,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00cade',
        alignSelf: 'center'
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        marginHorizontal: 10,
        justifyContent: 'center',
    },
    item: {
        width: ImageWidth,
        height: ImageHeight,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#000'

    },

})

export default class CarCamera extends Component {
    constructor(props) {
        super(props)
        this.openPicker = this.openPicker.bind(this)
        this.launchCamera = this.launchCamera.bind(this)
        this.state = { modalVisible: false }
    }

    launchCamera = () => {
        ImagePicker.showImagePicker(photoOptions, (response) => {
            if (response.didCancel) {
                console.log('User cancelled video picker')
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            }
            else if (response.customButton) {
                if (response.customButton == 'choosePhoto') {
                    this.openPicker()
                }
            } else {
                ImageResizer.createResizedImage(response.uri, 960, 960, 'JPEG', 100)
                    .then((resizedImageUri) => {
                        let param = {
                            postFileParam: {
                                imageUrl: resizedImageUri,
                                imageType: response.type,
                                imageName: response.fileName
                            }
                        }

                        this.props.postImage(param)
                    }).catch((err) => {
                        return console.log(err)
                    })
            }
        })
    }



    openPicker() {

        ImageCropPicker.openPicker({
            multiple: true
        }).then(images => {
            if (images.length > 5) {
                this.setState({ modalVisible: true })
            }
            else {
                images.forEach((item) => {
                    let pos = item.path.lastIndexOf('/')
                    ImageResizer.createResizedImage(item.path, 960, 960, 'JPEG', 100)
                        .then((resizedImageUri) => {
                            let param = {
                                postFileParam: {
                                    imageUrl: resizedImageUri,
                                    imageType: item.mime,
                                    imageName: item.path.substring(pos + 1)
                                }
                            }
                            console.log(param)
                            this.props.postImage(param)
                        }).catch((err) => {
                            return console.log(err)
                        })
                })
            }
        }).catch(err => {
            console.log('err')
        })
    }

    renderCameraButton() {
        let cameraButtonStyle = {
            width: ImageWidth,
            height: ImageHeight,
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'center'
        }
        if (this.props.images.length == 0) cameraButtonStyle.alignSelf = 'center'
        else if (this.props.images.length % 2 == 0) cameraButtonStyle.left = -(window.width - 10) / 4

        return <View style={cameraButtonStyle}>
            <Button
                style={baseStyle.cameraButtonStyle}
                onPress={this.launchCamera}
                title='上传照片' >
                <Icon name='camera' />
            </Button>
        </View>
    }

    renderImages() {
        return this.props.images.map((item, i) => {
            const leftImageStyle = {
                width: ImageWidth,
                height: ImageHeight,
                marginRight: 10,
                marginBottom: 10
            }
            const rightImageStyle = {
                width: ImageWidth,
                height: ImageHeight,
                marginBottom: 10
            }
            return <CarCameraItem
                key={i}
                imgIndex={i}
                imageStyle={(i % 2 == 1) ? rightImageStyle : leftImageStyle}
                uri={item}
                showImagePage={this.props.showImagePage} />
        })
    }


    render() {
        return (
            <View style={styles.container}>
                {this.renderImages()}

                {this.renderCameraButton()}
                <View>
                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => { }}>
                        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }} >
                            <View style={{ width: window.width - 60, height: 200, backgroundColor: '#fff', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <View style={{ flex: 1 }}><Text style={{ fontSize: 20, color: '#00cade' }}>提示</Text></View>
                                <View style={{ flex: 2 }}><Text style={{ fontSize: 20 }}>        您选择的图片数量已经超过5张，请重新选择!</Text></View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ textAlign: 'center', fontSize: 20, color: '#00cade' }} onPress={() => { this.setState({ modalVisible: false }) }}>确认</Text>
                                </View>
                            </View>
                        </View>
                    </Modal>

                </View>
            </View>
        )
    }
}






