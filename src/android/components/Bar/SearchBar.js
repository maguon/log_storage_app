import React, { Component } from 'react'
import { Header, Title, Button, Icon, Right, Left, Body, Label, Item, Input, Text } from 'native-base'
import { View, StatusBar, StyleSheet, TextInput, TouchableOpacity, TouchableHighlight, Modal, InteractionManager, Dimensions, ART} from 'react-native'
import * as routerDirection from '../../../util/RouterDirection'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import globalStyles, { styleColor } from '../../GlobalStyles'
import VinScanner from '../../components/VinScanner'
// import * as RouterDirection from '../../../../util/RouterDirection'
// import * as searchCarAction from '../../../views/searchCar/SearchCarAction'
import { connect } from 'react-redux'

const { width, height } = Dimensions.get('window')
let mwidth = 70
let mheight = 100
const top = 46


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
                                    Actions.qrCodeScreen({ onSelectQRCode: this.onSelectQRCode })
                                }}>
                                <Icon name='ios-qr-scanner' style={{ fontSize: 12 }} />
                                <Text style={{ fontSize: 12, paddingLeft: 5 }}>扫一扫</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => {
                                    this.setState({ menuModalIsVisible: false })
                                    RouterDirection.addRequirement(this.props.parent)()
                                }}>
                                <Icon name='ios-clipboard-outline' style={{ fontSize: 12 }} />
                                <Text style={{ fontSize: 12, paddingLeft: 5 }}>增加需求</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => {
                                    this.setState({ menuModalIsVisible: false })
                                    RouterDirection.addCar(this.props.parent)()
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
        const { title, parent } = this.props
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
                            onPress={() => { }}
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
                        <Button transparent onPress={() => this.setState({menuModalIsVisible:!this.state.menuModalIsVisible})}>
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


const mapStateToProps = (state, ownProps) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarList: (param) => {
        //dispatch(searchCarAction.getCarList(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)



// import React, { Component } from 'react'
// import { View, Vibration, Modal, Text, TextInput, StatusBar, Dimensions } from 'react-native'
// import { Item, Header, Input, Button, Left, Right, Icon } from 'native-base'
// import VinScanner from '../../components/VinScanner'
// import { Actions } from 'react-native-router-flux'

// const { width, height } = Dimensions.get('window')
// export default class SearchBar extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             barcodeModalVisible: false,
//         }
//         this._onPressIcon = this._onPressIcon.bind(this)
//         this._onPressTextInput = this._onPressTextInput.bind(this)
//         this._onBarcodeReceived = this._onBarcodeReceived.bind(this)
//     }

//     static defaultProps = {
//         onBarcodeReceived: (param) => { console.log('this.props.onBarcodeReceived', param) },
//         onPressIcon: () => { console.log('this.props.onPressIcon') },
//         onPressTextInput: () => { console.log('this.props.onPressTextInput') }
//     }

//     _onBarcodeReceived(e) {
//         if (e.data !== this.state.barcode || e.type !== this.state.type) Vibration.vibrate()
//         // if (e.data.length == 17)
//         this.setState({
//             barcodeModalVisible: false
//         })
//         this.props.onBarcodeReceived(e.data)
//     }

//     _onPressIcon() {
//         this.props.onPressIcon()
//     }

//     _onPressTextInput() {
//         this.props.onPressTextInput()
//     }

//     render() {
//         return (
//             <Header androidStatusBarColor='#00cade' searchBar style={{ backgroundColor: '#00cade' }}>
//                 <Left style={{ flex: 1 }}>
//                     <Button transparent onPress={() => { this.setState({ barcodeModalVisible: true }) }}>
//                         <Icon name="ios-barcode-outline" style={{ fontSize: 30 }} type="ionicons" />
//                     </Button>
//                 </Left>
//                 <View style={{ flex: 6, marginTop: 10, marginBottom: 10 }} onTouchStart={this._onPressTextInput}>
//                     <Item rounded style={{ backgroundColor: 'rgba(255,255,255,0.4)', borderWidth: 0 }}>
//                         <Input
//                             style={{ color: '#ffffff', fontSize: 14 }}
//                             editable={false}
//                         />
//                         <Icon name="md-search"
//                             type="ionicons"
//                             style={{ color: '#ffffff' }}
//                             onPress={this._onPressIcon} />
//                     </Item>
//                 </View>
//                 <Right style={{ flex: 1 }}>
//                 </Right>
//                 <Modal
//                     animationType={"none"}
//                     visible={this.state.barcodeModalVisible}
//                     onRequestClose={() => { this.setState({ barcodeModalVisible: false }) }}
//                 >
//                     <VinScanner barcodeReceived={this._onBarcodeReceived} />
//                     <View style={{ position: 'absolute', top: 0, backgroundColor: 'rgba(255,255,255,0.1)', height: 40, width: width, flexDirection: 'row' }}>
//                         <Icon style={{ color: '#888888', alignSelf: 'center', paddingLeft: 10, fontSize: 25 }} name='arrow-back' onPress={() => { this.setState({ barcodeModalVisible: false }) }} />
//                         <Text style={{ color: '#888888', alignSelf: 'center', paddingLeft: 5 }} onPress={() => { this.setState({ barcodeModalVisible: false }) }} >返回</Text>
//                     </View>
//                 </Modal>
//             </Header >
//         )
//     }
// }



