import React, { Component } from 'react'
import { ScrollView, View, Text, Image ,InteractionManager} from 'react-native'
import Record from './RecordListHeader'
import { getRecordList, getRecordListWaiting } from './RecordListAtHomeAction'
import { connect } from 'react-redux'


class RecordList extends Component {
    constructor(props) {
        super(props)
    }


    componentDidMount() {
        // this.props.getRecordListWaiting()
        // InteractionManager.runAfterInteractions(() => this.props.getRecordList())
    }

    render() {
        const { recordListAtHomeReducer: { data: { recordList } } } = this.props
        const isHome=true
        let records = recordList
            .reduce((acc, val) => {
                let obj = acc.find((item) => {
                    return new Date(item.created_on).toLocaleDateString() == new Date(val.created_on).toLocaleDateString()
                })
                if (obj) {
                    obj.data.push(val)
                } else {
                    acc.push({ created_on: val.created_on, key: acc.length, data: [val] })
                }
                return acc
            }, [])
            .sort((a, b) => {
                return new Date(a.created_on) < new Date(b.created_on)
            })
            .map((item) => {
                return <Record record={item} key={item.key} onPressItem={() => { }} />
            })

        let header = isHome ? (<View style={{ marginLeft: 10, marginRight: 10, marginTop: 10, paddingBottom: 10, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#00bfd8' }}>
            <Image source={{ uri: 'icon_notes' }} style={{ width: 20, height: 20 }} />
            <Text style={{ marginLeft: 10 }}>工作记录</Text>
        </View>)
            : (<View ></View >)

        return (
            <View >
                {header}
                <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
                    {records}
                </View>
            </View >
        )
    }
}



const mapStateToProps = (state) => {
    return {
        recordListAtHomeReducer: state.recordListAtHomeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRecordList: () => {
        dispatch(getRecordList())
    },
    getRecordListWaiting: () => {
        dispatch(getRecordListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RecordList)