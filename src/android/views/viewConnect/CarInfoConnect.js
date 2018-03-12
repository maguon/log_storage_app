import React, { Component } from 'react'
import { connect } from 'react-redux'
import CarInformation from '../CarInformation'


const CarInfoConnect = props => {
    const { mapStateToProps, mapDispatchToProps,parent,carId } = props
    const CarInfoConnectComponent = connect(mapStateToProps, mapDispatchToProps)(CarInformation)
    return (
        <CarInfoConnectComponent parent={parent} carId={carId}/>
    )
}
export default CarInfoConnect