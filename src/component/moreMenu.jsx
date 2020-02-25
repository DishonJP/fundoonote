import React, { Component } from 'react'
import {Menu,MenuItem,Divider} from '@material-ui/core'
class MoreMenu extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Menu
                                    open={this.props.menuOpen}
                                    autoFocusItem={this.props.menuOpen}
                                    anchorEl={this.props.menuanchorEl}
                                    style={{
                                        padding: "15px",
                                    }}
                                    anchorOrigin={{
                                        position: "bottom",
                                        vertical: 'bottom',
                                        horizontal: 'top',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'bottom',
                                    }}
                                    onClose={this.props.moreMenuClose}
                                >
                                    <MenuItem onClick={this.props.handleClickLabel}>Add Label</MenuItem>
                                    <Divider />
                                    <MenuItem onClick={this.props.handleMenuClick}
                                    >Delete Note</MenuItem>
                                    <Divider />
                                    <MenuItem>Add Drawing</MenuItem>
                                    <Divider />
                                    <MenuItem>Show tick boxes</MenuItem>
                                </Menu>
        )
    }
}
export default MoreMenu