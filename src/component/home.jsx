import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, InputBase, IconButton, Menu, MenuItem, Card, Button, MuiThemeProvider, createMuiTheme, Avatar, Divider } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import notes from '../assets/notes.png'
import Drawers from '../component/drawer'
import SettingsIcon from '@material-ui/icons/Settings';
import IconChange from './iconChange';
import userServices from '../services/userServices'
import bunny from '../assets/bunny.jpg'
import Notes from './notes';
import UserNotes from './userNotes';
const theme = createMuiTheme({
    overrides: {
        MuiMenu: {
            paper: {
                width: "220px"
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
let count = 0;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openMenu: false,
            close: false,
            anchorEl: null,
            title: '',
            content: '',
            allNotes:[]
        };
    }
    getUserData = () => {
        let data = userServices.getUserData().then((res) => {
            console.log(res,"dishon");
            
        })
    }
    handleOpen = () => {
        if (this.state.open === false) {
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
            open: false
        })
    }
    handleMenuOpen = (event) => {
        this.setState({
            openMenu: true,
            anchorEl: event.currentTarget
        })
    }
    handleMenuClose = () => {
        this.setState({
            openMenu: false,
            anchorEl: null
        })
    }
    handleChange = () => {
        this.setState({
            close: !(this.state.close)
        })
    }
    componentDidMount() {
        let result = userServices.getNote();
        result.then((res) => {
                console.log(res,"res in get");
            this.setState({
                    allNotes:res
                })
            })
    }
    render() {
       let notesObj= this.state.allNotes.map(arrNotes => {
            console.log(arrNotes.title,"title");
            return (
                <UserNotes allNotes={arrNotes}/>
            )
        })
        return (
                <MuiThemeProvider theme={theme}>
                    <div>
                <div className="header_decor">

                    <AppBar
                        class="appbar_decor"
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
                                style={{
                                    padding: "4px",

                                }}
                                color="inherit"
                            >
                                <div className="menu_name">
                                    <IconButton>
                                        <CloudQueueIcon
                                            fontSize="medium"
                                        />
                                    </IconButton>
                                    <IconChange
                                        data={this.state.close}
                                        change={this.handleChange}
                                    />
                                    <IconButton>
                                        <SettingsIcon
                                            fontSize="medium"
                                        />
                                    </IconButton>
                                </div>
                                <img
                                    onClick={this.handleMenuOpen}
                                    style={{
                                        width: "1cm",
                                        height: "1cm",
                                        borderRadius: "50%"
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
                                            horizontal: "right"
                                        }}
                                        open={this.state.openMenu}
                                    >
                                        <div className="avatar_decor">
                                            <img
                                                style={{
                                                    width: "2cm",
                                                    height: "2cm",
                                                    borderRadius: "50%"
                                                }}
                                                src={bunny}
                                                alt="u"
                                                />
                                                <span>{this.getUserData()}</span>
                                        </div>
                                        <Divider />
                                        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                                        <MenuItem onClick={this.handleMenuClose}>My Account</MenuItem>
                                        <Divider />
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
                                                        backgroundColor: "lightgray"
                                                    }}
                                                >Logout</Button>
                                            </footer>
                                        </div>
                                    </Menu>
                                </div>
                            </Toolbar>
                        </div>
                    </AppBar>
                    </div>
                    <Drawers change={this.state.open}
                        value={this.handleClose}
                    />
                    <div className="notesComponent">
                        <Notes />
                    </div>
                    <div className="usernotes_decor">
                        {notesObj}
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}
export default Home