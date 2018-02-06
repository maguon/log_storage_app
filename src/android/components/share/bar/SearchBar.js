import React, { Component } from 'react'
import { Header, Title, Button, Icon, Right, Left, Body, Label, Item, Input, Text } from 'native-base'
import { View, StatusBar, StyleSheet, TextInput, TouchableOpacity, TouchableHighlight, Modal, InteractionManager, Dimensions, ART } from 'react-native'
import * as routerDirection from '../../../../util/RouterDirection'
import { Actions } from 'react-native-router-flux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import VinScanner from '../../VinScanner'
// import * as RouterDirection from '../../../../util/RouterDirection'
import { connect } from 'react-redux'
import * as selectCarAction from '../../../../actions/components/select/selectCarAction'
import DisposableList from '../../../views/form/select/DisposableList'
import * as imageListForCarInfoAction from '../../../../actions/components/carInfo/ImageListForCarInfoAction'
import * as carInfoAction from '../../../../actions/views/CarInfoAction'
import * as selectStorageAction from '../../../../actions/components/select/selectStorageAction'
import * as selectAreaAction from '../../../../actions/components/select/selectAreaAction'
import * as selectParkingAction from '../../../../actions/components/select/selectParkingAction'

const { width, height } = Dimensions.get('window')
let mwidth = 70
let mheight = 100
const top = 46


const onSelectCar = ({ param, getCarList, parent, getCarListWaiting, onSelect }) => {
    // getCarListWaiting()
    Actions.searchVinAtHomeBlock({
        mapStateToProps: vinMapStateToProps,
        mapDispatchToProps: vinMapDispatchToProps,
        List: DisposableList,
        onSelect
    })
    //  InteractionManager.runAfterInteractions(() => getCarList(param))

}

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            menuModalIsVisible: false
        }
        this.barcodeReceived = this.barcodeReceived.bind(this)
    }

    componentDidMount() {

    }


    barcodeReceived(e) {
        this.setState({ modalVisible: false })
        // InteractionManager.runAfterInteractions(() => {
        //     RouterDirection.searchCar(this.props.parent)({ initParam: { vinCode: e.data } })
        //     InteractionManager.runAfterInteractions(() => {
        //         e.data.length > 5 && this.props.getCarList(e.data)
        //     })
        // })
    }

    renderMenu() {
        const path = ART.Path();
        path.moveTo(width - 10 - mwidth * 1 / 3 + 3, top);
        path.lineTo(width - 10 - mwidth * 1 / 3 + 9, top - 7);
        path.lineTo(width - 10 - mwidth * 1 / 3 + 15, top);
        path.close();
        return (
            <Modal
                transparent={true}
                animationType={"fade"}
                visible={this.state.menuModalIsVisible}
                onRequestClose={() => { }}>
                <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }} onPress={() => this.setState({ menuModalIsVisible: false })}>
                    <View style={{ position: 'absolute', top: 0, right: 10 }}>
                        <ART.Surface width={width} height={top} >
                            <ART.Shape d={path} fill={'#fff'} />
                        </ART.Surface>
                        <View style={{
                            backgroundColor: '#fff',
                            alignSelf: 'flex-end',
                            padding: 5,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            borderRadius: 3
                        }}>
                            <TouchableOpacity style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => {
                                    this.setState({ menuModalIsVisible: false })
                                    Actions.applyDamage()
                                    //RouterDirection.addRequirement(this.props.parent)()
                                }}>
                                <Icon name='ios-construct-outline' style={{ fontSize: 12 }} />
                                <Text style={{ fontSize: 12, paddingLeft: 5 }}>增加质损</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => {
                                    this.setState({ menuModalIsVisible: false })
                                    routerDirection.addCar(this.props.parent)()
                                }}>
                                <Icon name='ios-car-outline' style={{ fontSize: 12 }} />
                                <Text style={{ fontSize: 12, paddingLeft: 5 }}>增加商品车</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    render() {
        const { title, parent, getCarList, getCarListWaiting, getCarImageListWaiting, getCarImageList, getCarInfo, getCarInfoWaiting } = this.props
        return (
            <View style={[styles.container, { width: width }]}>
                <StatusBar hidden={false} />
                <Header style={globalStyles.styleBackgroundColor}>
                    <Left style={styles.left}>
                        <Button small transparent onPress={() => this.setState({ modalVisible: true })}>
                            <Icon name="ios-qr-scanner" style={styles.leftIcon} />
                        </Button>
                    </Left>
                    <Body style={styles.body}>
                        <TouchableHighlight
                            underlayColor={'rgba(255, 255, 255, 0)'}
                            onPress={() => onSelectCar({
                                parent,
                                getCarList,
                                getCarListWaiting,
                                onSelect: (item) => {
                                    getCarImageListWaiting()
                                    getCarInfoWaiting()
                                    routerDirection.carInfoConnect(parent)({
                                        mapStateToProps: carInfoMapStateToProps,
                                        mapDispatchToProps: carInfoMapDispatchToProps,
                                        parent
                                    })
                                    InteractionManager.runAfterInteractions(() => {
                                        getCarImageList({ carId: item.id })
                                        getCarInfo({ car: item.car })
                                    })
                                }
                            })}
                            style={styles.bodyTouch}>
                            <View style={styles.bodyTouchChild}>
                                <View style={styles.input} >
                                    <Text></Text>
                                </View>
                                <Icon name="ios-search" style={[globalStyles.textColor, styles.inputIcon]} />
                            </View>
                        </TouchableHighlight>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.setState({ menuModalIsVisible: !this.state.menuModalIsVisible })}>
                            <Icon name="ios-menu" style={styles.leftIcon} />
                        </Button>
                    </Right>
                </Header>
                <Modal
                    animationType={"fade"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setState({ modalVisible: false })}
                >
                    <VinScanner barcodeReceived={this.barcodeReceived} />
                </Modal>
                {this.renderMenu()}
            </View>
        )
    }
}


const vinMapStateToProps = (state) => {
    return {
        listReducer: {
            Action: state.selectCarReducer.getCarList,
            data: {
                list: state.selectCarReducer.data.carList.map(item => {
                    return {
                        id: item.id,
                        value: item.vin,
                        car: item
                    }
                })
            }
        }
    }
}

const vinMapDispatchToProps = (dispatch) => ({

})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    left: {
        flex: 1
    },
    body: {
        flex: 5
    },
    bodyTouch: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    bodyTouchChild: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 3
    },
    inputIcon: {
        paddingHorizontal: 5,
        color: '#fff'
    },
    input: {
        flex: 1
    },
    leftIcon: {
        color: '#fff'
    }

})


const carInfoMapStateToProps = (state, ownProps) => {
    return {
        carInfoReducer: {
            car: state.carInfoReducer.data.carInfo
        }
    }
}

const carInfoMapDispatchToProps = (dispatch) => ({
    exportCar: param => {
        dispatch(carInfoAction.exportCar(param))
    },
    moveCar: param => {
        dispatch(carInfoAction.moveCar(param))
    },
    importCar: param => {
        dispatch(carInfoAction.importCar(param))
    },
    getStorageList: () => {
        dispatch(selectStorageAction.getStorageList())
    },
    getStorageListWaiting: () => {
        dispatch(selectStorageAction.getStorageListWaiting())
    },
    getAreaList: (param) => {
        dispatch(selectAreaAction.getAreaList(param))
    },
    getAreaListWaiting: () => {
        dispatch(selectAreaAction.getAreaListWaiting())
    },
    getParkingList: (param) => {
        dispatch(selectParkingAction.getParkingList(param))
    },
    getParkingListWaiting: (param) => {
        dispatch(selectParkingAction.getParkingListWaiting())
    },
    updateCarInfo: () => {
        dispatch(submit('carInfoEditorForm'))
    }

})


const mapStateToProps = (state, ownProps) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarList: () => {
        dispatch(selectCarAction.getCarList())
    },
    getCarListWaiting: () => {
        dispatch(selectCarAction.getCarListWaiting())
    },
    getCarImageListWaiting: () => {
        dispatch(imageListForCarInfoAction.getCarImageListWaiting())
    },
    getCarImageList: (param) => {
        dispatch(imageListForCarInfoAction.getCarImageList(param))
    },
    getCarInfo: (param) => {
        dispatch(carInfoAction.getCarInfo(param))
    },
    getCarInfoWaiting: () => {
        dispatch(carInfoAction.getCarInfoWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)