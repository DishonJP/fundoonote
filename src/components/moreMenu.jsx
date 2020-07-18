import React from 'react'
import { Menu, MenuItem, Divider } from '@material-ui/core'
const MoreMenu = () => {
    return (
        <Menu
            open={this.props.menuOpen}
            autoFocusItem={this.props.menuOpen}
            anchorEl={this.props.menuanchorEl}
            style={{
                padding: "15px",
            }}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
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
export default MoreMenu