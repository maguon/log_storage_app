import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'

class SearchResult extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View>
                <Text></Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult)