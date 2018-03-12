import React, { Component } from 'react'
import { connect } from 'react-redux'
import ImageView from '../../components/share/ImageView'


const ImageViewConnect = props => {
    const { mapStateToProps, mapDispatchToProps ,imageIndex} = props
    const ImageViewComponent = connect(mapStateToProps, mapDispatchToProps)(ImageView)
    return (
        <ImageViewComponent imageIndex={imageIndex}/>
    )
}
export default ImageViewConnect