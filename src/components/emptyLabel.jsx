import React, { Component } from 'react'
import label from '../assets/label.jpg'
import { Typography } from '@material-ui/core'
class EmptyLabel extends Component{
    render() {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                opacity:"0.8"
            }}>
                <img style={{
                    height: "455px"
                }} src={label} alt="lol"/>
                <Typography variant="h4">No Notes are available in current label</Typography>
        </div>
    )
}
}
export default EmptyLabel