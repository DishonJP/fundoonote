import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, InputBase,Drawer, IconButton,Divider,Menu,MenuItem ,MuiThemeProvider,createMuiTheme} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import notes from '../assets/notes.png'
import Drawers from '../component/drawer'
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import SettingsIcon from '@material-ui/icons/Settings';
import ViewListIcon from '@material-ui/icons/ViewList';
class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openMenu: false,
            click:false
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
    handleMenuOpen = () => {
        this.setState({
            openMenu:true
        })
        handleClick = () => {
            this.setState({
                close:true
            })
        }
    }
    render() {
        let click = this.handleClick?<IconButton>
            <ViewCompactIcon
                fontSize="large"
            />
        </IconButton> : <IconButton>
                <ViewListIcon
                    fontSize="large"
                />
        </IconButton>
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
                            <MenuIcon fontSize ="large"/>
                            </IconButton>
                        
                    </Toolbar>
                    <Typography
                        noWrap
                        class ="appname_decor"
                    >
                        FundooNote
                    </Typography>
                        <img
                            className="img_decor"
                            src={notes}
                        />
                    </div>
                    <div className="search_icon"> 
                        <SearchIcon/>
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
                                <click/>
                                <IconButton>
                                    <SettingsIcon
                                        fontSize="large"
                                    />
                                </IconButton>
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
                                open={this.state.openMenu}    
                            >
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>My Account</MenuItem>
                            <MenuItem>Logout</MenuItem>
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