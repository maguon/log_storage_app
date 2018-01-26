import React, { Component } from 'react'
import { Text, FlatList } from 'react-native'
import { ListItem, Container, Spinner } from 'native-base'
import { styleColor } from '../../../GlobalStyles'


const PagingList = props => {
    const { listReducer: { data: { list }, Action }, onSelect } = props
    if (Action.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => console.log('onEndReached')}
                    data={list}
                    renderItem={({ item, index }) => <ListItem key={index} onPress={() => onSelect(item)}>
                        <Text>{item.value}</Text>
                    </ListItem>} />
            </Container>
        )
    }

}


export default PagingList
