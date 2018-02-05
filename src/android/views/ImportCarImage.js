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
import ImageItem from '../components/share/ImageItem'
import globalStyles from '../GlobalStyles'
import { connect } from 'react-redux'
import CameraButton from '../components/share/CameraButton'
import { file_host } from '../../config/Host'
import { Container, Content, Input, Label, Icon } from 'native-base'
import * as  importCarImageAction from '../../actions/views/ImportCarImageAction'
import * as routerDirection from '../../util/RouterDirection'

const window = Dimensions.get('window')
const containerWidth = window.width / 2
const containerHeight = containerWidth / 16 * 9

const renderItem = props => {
    const { item, index, pushCarImageWaiting, pushCarImage, imageList, parent, carId, vin } = props
    if (item == 'isCameraButton') {
        return renderItemCameraButton({ index, pushCarImageWaiting, pushCarImage, carId, vin })
    } else {
        return (
            <TouchableOpacity
                key={index}
                style={styles.itemContainer}
                onPress={() => routerDirection.singlePhotoView(parent)({ initParam: { imageUrlList: imageList.map(url => `${file_host}/image/${url.url}`), index } })} >
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
            {/* <View style={styles.subtitleContainer}>
                <Text style={[globalStyles.smallText, globalStyles.styleColor]}>若不进行此选项操作可直接点击“<Text style={styles.tagText}>完成</Text>”</Text>
            </View> */}
        </View>
    )
}

const ImportCarImage = props => {
    const { parent,
        pushCarImageWaiting,
        pushCarImage,
        importCarImageReducer: { data: { imageList }, importCarImage: { isResultStatus } },
        addCarReducer: { data: { carId, vin } },
     } = props
    return (
        <Container >
            <FlatList
                style={styles.flatList}
                showsVerticalScrollIndicator={false}
                data={imageList.length > 0 ? [...imageList, 'isCameraButton'] : imageList}
                numColumns={2}
                ListEmptyComponent={() => renderListEmpty({ pushCarImageWaiting, pushCarImage, carId, vin })}
                renderItem={({ item, index }) => renderItem({ parent, item, index, imageList, pushCarImageWaiting, pushCarImage, carId, vin })} />
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

const mapStateToProps = (state) => {
    return {
        importCarImageReducer:state.importCarImageReducer,
        addCarReducer: state.addCarReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    pushCarImageWaiting: () => {
        dispatch(importCarImageAction.pushCarImageWaiting())
    },
    pushCarImage: () => {
        dispatch(importCarImageAction.pushCarImage())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportCarImage)


// import React, { Component } from 'react'
// import { Text, View, ScrollView, StatusBar, Dimensions } from 'react-native'
// import { connect } from 'react-redux'
// // import TopBar from '../components/Bar/TopBar'
// import CarCamera from '../components/CarCamera/CarCamera'
// import { Actions } from 'react-native-router-flux'
// import * as ImportCarCameraAction from '../../actions/ImportCarCameraAction'
// import { Button } from 'native-base'
// import * as RouterDirection from '../../util/RouterDirection'

// const window = Dimensions.get('window')

// class ImportCarCamera extends Component {
//     constructor(props) {
//         super(props)
//         this.postImage = this.postImage.bind(this)
//     }

//     postImage(param) {
//         let { userId, mobile, userType } = this.props.user
//         let { carId, vin } = this.props
//         param.requiredParam = {
//             userId: userId,
//             carId: carId,
//             vin: vin
//         }
//         param.optionalParam = {
//             imageType: 1
//         }
//         param.postFileParam.key = "image"

//         param.postParam = {
//             username: mobile,
//             userId: userId,
//             userType: userType,
//         }
//         this.props.pushCarImage(param)
//     }

//     static defaultProps = {
//         carId: 0,
//         vin: ''
//     }


//     shouldComponentUpdate(nextProps, nextState) {
//         let { ImportCarCameraReducer } = nextProps

//         /*importCarImage执行状态*/
//         if (ImportCarCameraReducer.importCarImage.isExecStatus == 1) {
//           //  console.log('ImportCarCameraReducer.importCarImage', '开始执行')
//         } else if (ImportCarCameraReducer.importCarImage.isExecStatus == 2) {
//             if (ImportCarCameraReducer.importCarImage.isResultStatus == 0) {
//               //  console.log('ImportCarCameraReducer.importCarImage执行成功')
//             } else if (ImportCarCameraReducer.importCarImage.isResultStatus == 1) {
//                // console.log('ImportCarCameraReducer.importCarImage执行错误')
//             }
//             else if (ImportCarCameraReducer.importCarImage.isResultStatus == 2) {
//                // console.log('ImportCarCameraReducer.importCarImage执行失败')
//             }
//         }
//         /************************************************************************************************/

//         /*delImage执行状态*/
//         if (ImportCarCameraReducer.delImage.isExecStatus == 1) {
//           //  console.log('ImportCarCameraReducer.delImage', '开始执行')
//         } else if (ImportCarCameraReducer.delImage.isExecStatus == 2) {
//           //  console.log('ImportCarCameraReducer.delImage', '执行完毕')
//             if (ImportCarCameraReducer.delImage.isResultStatus == 0) {
//               //  console.log('CarInfoReducer.delImage执行成功')
//                 this.props.resetDelImage()
//             } else if (ImportCarCameraReducer.delImage.isResultStatus == 1) {
//               //  console.log('ImportCarCameraReducer.delImage执行错误')
//                 this.props.resetDelImage()

//             } else if (ImportCarCameraReducer.delImage.isResultStatus == 2) {
//               //  console.log('ImportCarCameraReducer.delImage执行失败')
//                 this.props.resetDelImage()
//             }
//         }
//         /************************************************************************************************/

//         return true
//     }

//     render() {
//         let { imageList } = this.props.ImportCarCameraReducer.importCarImage.data
//         return (
//             <View style={{ flex: 1 }}>
//                 <View style={{ flex: 1 }}>
//                     <ScrollView>
//                         <View style={{
//                             minHeight: window.height - StatusBar.currentHeight - 56 - 60,
//                         }}>
//                             <CarCamera images={imageList} postImage={(param) => this.postImage(param)} showImagePage={RouterDirection.ImagePageForImportCar(this.props.parent)} />
//                         </View>
//                         <Button block onPress={() => RouterDirection.importCar(this.props.parent)({ vin: this.props.vin, carId: this.props.carId })} style={{ marginHorizontal: 10, marginVertical: 10, backgroundColor: '#00cade', height: 40 }} >
//                             <Text style={{ color: '#ffffff' }}>下一步</Text>
//                         </Button>
//                     </ScrollView>
//                 </View>
//             </View>
//         )
//     }
// }




// const mapStateToProps = (state) => {
//     return {
//         ImportCarCameraReducer: state.ImportCarCameraReducer,
//        // user: state.LoginReducer.user
//     }
// }

// const mapDispatchToProps = (dispatch) => ({
//     pushCarImage: (param) => {
//         dispatch(ImportCarCameraAction.pushCarImage(param))
//     },
//     resetDelImage: () => {
//         dispatch(ImportCarCameraAction.resetDelImage())
//     }
// })

// export default connect(mapStateToProps, mapDispatchToProps)(ImportCarCamera)

