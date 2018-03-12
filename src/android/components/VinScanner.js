import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  Vibration,
  View
} from 'react-native'
import BarcodeScanner from 'react-native-barcodescanner'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'

export default class VinScanner extends Component {
  constructor(props) {
    super(props)
    this.barcodeReceived = this.barcodeReceived.bind(this)
  }

  componentDidMount() {
    Orientation.lockToLandscape()
  }

  componentWillUnmount() {
    Orientation.lockToPortrait()
  }

  barcodeReceived(e) {
    Vibration.vibrate()
    this.props.barcodeReceived(e)

  }

  render() {
    return (
      <View style={styles.container}>
        <BarcodeScanner
          viewFinderHeight={80}
          viewFinderWidth={450}
          onBarCodeRead={this.barcodeReceived}
          style={{ flex: 1 }}
          torchMode='back'
          cameraType= 'off'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBar: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBarText: {
    fontSize: 20,
  },
});