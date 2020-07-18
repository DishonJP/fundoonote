import React, { Component } from 'react'
import { Snackbar, IconButton, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'

const Message = (props) => {
    return (
        <Snackbar
            open={props.open}
            autoHideDuration={6000}
            message={props.msg}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            action={
                <React.Fragment>
                    <Button color="secondary" size="small" >
                        UNDO
                </Button>
                    <IconButton size="small" aria-label="close" color="inherit" >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }>
        </Snackbar>
    )
}

export default Message