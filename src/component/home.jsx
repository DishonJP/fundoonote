import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, InputBase, IconButton,Menu,MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import notes from '../assets/notes.png'
import Drawers from '../component/drawer'
import SettingsIcon from '@material-ui/icons/Settings';
import IconChange from './iconChange';
class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openMenu: false,
            close: false,
            anchorEl:null
        };
    }
    handleOpen = () => {
        this.setState({
            open:true
        })
    }
    handleClose = () => {
        this.setState({
            open:false
        })
    }
    handleMenuOpen = (event) => {
        this.setState({
            openMenu: true,
            anchorEl:event.currentTarget
        })
    }
    handleMenuClose = () => {
        this.setState({
            openMenu: false,
            anchorEl:null
        })
    }
        handleChange = () => {
            this.setState({
                close:!(this.state.close)
            })
        }
    render() {
        return (
            <div className="header_decor">
                
                <AppBar class="appbar_decor"
                    position="fixed">
                    <div className="menu_name">
                        <Toolbar
                            color="inherit"
                            
                        >
                            <IconButton
                                onClick={this.handleOpen}
                            >
                                <MenuIcon fontSize="large" />
                            </IconButton>
                        
                        </Toolbar>
                        <Typography
                            noWrap
                            class="appname_decor"
                        >
                            FundooNote
                    </Typography>
                        <div className="img_place">
                        <img
                            className="img_decor"
                            src={notes}
                            />
                            </div>
                    </div>
                    <div className="search_icon">
                        <SearchIcon />
                        <InputBase
                            fullWidth
                            placeholder="Search"
                        />
                    </div>
                    <div className="acc_decor">
                        <Toolbar
                            color="inherit"
                        >
                            <div className="menu_name">
                                <IconButton>
                                    <CloudQueueIcon
                                        fontSize="large"
                                    />
                                </IconButton>
                                <IconButton>
                                    <SettingsIcon
                                        fontSize="large"
                                    />
                                </IconButton>
                                <IconChange
                                    data={this.state.close}
                                    change={this.handleChange}
                                />
                            </div>
                            <IconButton
                                onClick={this.handleMenuOpen}
                            >
                                <AccountCircleIcon
                                    fontSize="large"
                                    fontColor="inherit"
                                />
                            </IconButton>
                            
                            <div>
                                <Menu
                                    id="simple-menu"
                                    keepMounted
                                    anchorEl={this.state.anchorEl}
                                    open={this.state.openMenu}
                                >
                                    <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleMenuClose}>My Account</MenuItem>
                                    <MenuItem onClick={this.handleMenuClose}>Logout</MenuItem>
                                </Menu>
                            </div>
                        </Toolbar>
                    </div>
                            
                </AppBar>
                <Drawers change={this.state.open}
                    value={this.handleClose}
                />
            </div>
        )
    }   
}
export default Home