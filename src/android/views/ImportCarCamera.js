import React, { Component } from 'react'
import { Text, View, ScrollView, StatusBar, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../components/Bar/NavBar'
import CarCamera from '../components/CarCamera/CarCamera'
import { Actions } from 'react-native-router-flux'
import * as ImportCarCameraAction from '../../actions/ImportCarCameraAction'
import { Button } from 'native-base'

const window = Dimensions.get('window')

class ImportCarCamera extends Component {
    constructor(props) {
        super(props)
        this.postImage = this.postImage.bind(this)
    }

    postImage(param) {
        let { userId, mobile, userType } = this.props.user
        let { carId, vin } = this.props
        param.requiredParam = {
            userId: userId,
            carId: carId,
            vin: vin
        }
        param.optionalParam = {
            imageType: 1
        }
        param.postFileParam.key = "image"

        param.postParam = {
            username: mobile,
            userId: userId,
            userType: userType,
        }
        this.props.pushCarImage(param)
    }

    static defaultProps = {
        carId: 516,
        vin: '11111111231231231'
    }


    shouldComponentUpdate(nextProps, nextState) {
        let { ImportCarCameraReducer } = nextProps

        /*importCarImage执行状态*/
        if (ImportCarCameraReducer.importCarImage.isExecStatus == 1) {
            console.log('ImportCarCameraReducer.importCarImage', '开始执行')
        } else if (ImportCarCameraReducer.importCarImage.isExecStatus == 2) {
            if (ImportCarCameraReducer.importCarImage.isResultStatus == 0) {
                console.log('ImportCarCameraReducer.importCarImage执行成功')
            } else if (ImportCarCameraReducer.importCarImage.isResultStatus == 1) {
                console.log('ImportCarCameraReducer.importCarImage执行错误')
            }
            else if (ImportCarCameraReducer.importCarImage.isResultStatus == 2) {
                console.log('ImportCarCameraReducer.importCarImage执行失败')
            }
        }
        /************************************************************************************************/

        /*delImage执行状态*/
        if (ImportCarCameraReducer.delImage.isExecStatus == 1) {
            console.log('ImportCarCameraReducer.delImage', '开始执行')
        } else if (ImportCarCameraReducer.delImage.isExecStatus == 2) {
            console.log('ImportCarCameraReducer.delImage', '执行完毕')
            if (ImportCarCameraReducer.delImage.isResultStatus == 0) {
                console.log('CarInfoReducer.delImage执行成功')
                this.props.resetDelImage()
            } else if (ImportCarCameraReducer.delImage.isResultStatus == 1) {
                console.log('ImportCarCameraReducer.delImage执行错误')
                this.props.resetDelImage()

            } else if (ImportCarCameraReducer.delImage.isResultStatus == 2) {
                console.log('ImportCarCameraReducer.delImage执行失败')
                this.props.resetDelImage()
            }
        }
        /************************************************************************************************/

        return true
    }
    //images={imageList}

    render() {
        let { imageList } = this.props.ImportCarCameraReducer.importCarImage.data
        return (
            <View style={{ flex: 1 }}>
                <NavBar title='上传图片' />
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <View style={{
                            minHeight: window.height - StatusBar.currentHeight - 56 - 60,
                        }}>
                            <CarCamera images={imageList} postImage={(param) => this.postImage(param)} showImagePage={Actions.ImagePageForImportCar} />
                        </View>
                        <Button block onPress={() => { }} style={{ marginHorizontal: 10, marginVertical: 10, backgroundColor: '#00cade', height: 40 }} >
                            <Text style={{ color: '#ffffff' }}>下一步</Text>
                        </Button>
                    </ScrollView>
                </View>
            </View>
        )
    }
}




const mapStateToProps = (state) => {
    return {
        ImportCarCameraReducer: state.ImportCarCameraReducer,
        user: state.LoginReducer.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    pushCarImage: (param) => {
        dispatch(ImportCarCameraAction.pushCarImage(param))
    },
    resetDelImage: () => {
        dispatch(ImportCarCameraAction.resetDelImage())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportCarCamera)