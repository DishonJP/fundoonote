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
import Archive from './archive';
import Bin from './bin';
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
            allNotes: [],
            panalChange: "Notes",
            archiveNotes: [],
            binNotes:[]
        };
    }
    changePanalName = (data) => {
        console.log(data,"why this is happening");
        this.setState({
            panalChange:data
        })
    }
    handleRef = ()=> {
        this.getNote()
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
    getArchive = () => {
        let result = userServices.getArchiveNotes();
        result.then((res) => {
            this.setState({
                archiveNotes:res
            })
        })
    }
    handleChange = () => {
        this.setState({
            close: !(this.state.close)
        })
    }
    getNote = () => {
        let result = userServices.getNote();
        result.then((res) => {
                console.log(res,"res in get");
            this.setState({
                    allNotes:res
                })
            })
    }
    binNote = () => {
        let result = userServices.getNote();
        result.then((res) => {
            this.setState({
                    binNotes:res
                })
        })
        let rest = userServices.getArchiveNotes();
        rest.then((res) => {
            res.map(datas => {
                this.state.binNotes.push(datas)
            })
        })
    }
    componentDidMount() {
        this.getNote();
        this.getArchive();
        this.binNote();
    }
    render() { 
        console.log(this.state.allNotes,"datas");
        
        let notesObj = this.state.allNotes.map(arrNotes => {
           console.log(arrNotes.data().trash, "all notes");
           
           if (arrNotes.data().trash === false) {
               return (
                   <UserNotes allNotes={arrNotes} />
               )
           }
       })
       let archiveObj= this.state.archiveNotes.map(arrNotes => {
           console.log(arrNotes, "title");
           if (arrNotes.data().trash === false) {
               return (
                   <Archive archiveNotes={arrNotes} />
               )
           }
       })
        let binObj = this.state.binNotes.map(arrNotes => {
           console.log(arrNotes,"bin notes");
           
           if (arrNotes.data().trash) {
               return (
                   <Bin binNotes={arrNotes} />
               )
           }
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
                    <Drawers
                        panel={this.changePanalName}
                        change={this.state.open}
                        value={this.handleClose}
                    />
                    {this.state.panalChange === "Notes" ?
                        <div>
                        <div className="notesComponent">
                            <Notes change={this.handleRef} />
                            </div>
                            <div className="usernotes_decor">
                        {notesObj}
                    </div>
                        </div>
                        :this.state.panalChange === "Archive"?
                        <div className="notesComponent">
                            {archiveObj}
                        </div>:this.state.panalChange === "Bin"?<div className="notesComponent">
                            {binObj}
                        </div>:<div></div>}
                </div>
            </MuiThemeProvider>
        )
    }
}
export default Home