import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'

class SearchCar extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <View></View>
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SearchCar)