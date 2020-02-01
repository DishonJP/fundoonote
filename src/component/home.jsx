import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, InputBase, IconButton,Menu,MenuItem,Card, Button,MuiThemeProvider,createMuiTheme,Avatar, Divider } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import notes from '../assets/notes.png'
import Drawers from '../component/drawer'
import SettingsIcon from '@material-ui/icons/Settings';
import IconChange from './iconChange';
import userServices from '../services/userServices'
import bunny from '../assets/bunny.jpg'
import Notes from './notes';
const theme = createMuiTheme({
    overrides: {
        MuiMenu: {
            paper: {
                width:"220px"
            }
        },
        MuiPopover: {
            paper: {
                maxWidth: "600px",
            }
        }
    }
}
)
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
        if (this.state.open===false) {
            this.setState({
                open: true
            })
        } else {
            this.setState({
                open: false
            })
        }
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
            <MuiThemeProvider theme={theme}>
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
                                
                                <IconChange
                                    data={this.state.close}
                                    change={this.handleChange}
                                    />
                                    <IconButton>
                                    <SettingsIcon
                                        fontSize="large"
                                    />
                                </IconButton>
                            </div>
                                    <img
                                        onClick={this.handleMenuOpen}
                                        style={{
                                            width: "1cm",
                                            height: "1cm",
                                            border: "6px solid lightgray",
                                            borderRadius:"50%"
                                        }}
                                        src={bunny}
                                        alt="u"
                                    />
                            <div>
                                <Menu
                                    keepMounted
                                    style={{
                                        marginTop: "52px",
                                        padding: "10px"
                                    }}
                                        anchorOrigin={{
                                            horizontal:"right"
                                        }}
                                    open={this.state.openMenu}
                                    >
                                        <div className="avatar_decor">
                                        <img
                                        style={{
                                            width: "2cm",
                                            height: "2cm",
                                            borderRadius:"50%"
                                        }}
                                                src={bunny}
                                                alt="u"
                                    />
                                            </div>
                                        <Divider/>
                                    <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                                        <MenuItem onClick={this.handleMenuClose}>My Account</MenuItem>
                                        <Divider/>
                                        <div className="button_decor">
                                            <footer>
                                        <Button
                                            onClick={() => {
                                        userServices.userLogout().then(() => {
                                            this.props.history.push('/login');
                                        }).catch((err) => {
                                            console.log(err);
                                        })
                                    }}
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            textAlign: "center",
                                            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                                            border: "2px solid grey",
                                            padding: "2px",
                                            fontSize: "12px",
                                            backgroundColor:"lightgray"
                                    }}
                                                >Logout</Button>
                                                </footer>
                                    </div>
                                </Menu>
                            </div>
                        </Toolbar>
                    </div>
                            
                </AppBar>
                <Drawers change={this.state.open}
                    value={this.handleClose}
                    />
                    <div>
                        <Notes>

                        </Notes>
                    </div>

            </div>
            </MuiThemeProvider>
        )
    }   
}
export default Home