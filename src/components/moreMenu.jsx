import React from 'react'
import { Menu, MenuItem, Divider } from '@material-ui/core'
const MoreMenu = (props) => {
    return (
        <Menu
            open={props.menuOpen}
            autoFocusItem={props.menuOpen}
            anchorEl={props.menuanchorEl}
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
            onClose={props.moreMenuClose}
        >
            <MenuItem onClick={props.handleClickLabel}>Add Label</MenuItem>
            <Divider />
            <MenuItem onClick={props.handleMenuClick}
            >Delete Note</MenuItem>
            <Divider />
            <MenuItem>Add Drawing</MenuItem>
            <Divider />
            <MenuItem>Show tick boxes</MenuItem>
        </Menu>
    )
}
export default MoreMenu