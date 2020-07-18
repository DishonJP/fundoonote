import React, { Component } from 'react'
import { Snackbar, IconButton, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
class Message extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Snackbar
                open={this.props.open}
                autoHideDuration={6000}
                message={this.props.msg}
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
}
export default Message