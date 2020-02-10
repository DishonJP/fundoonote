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
import Pin from './pin'
import Label from './label';
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
            binNotes: [],
            pinNotes: [],
            labelNotes: [],
            userData:""
        };
    }
    changeDrawerName = async (data) => {
        await console.log(data, "Drawer naot");

    }
    changePanalName = async (data) => {
        await console.log(data, "why this is happening");
        this.setState({
            panalChange: data
        })
    }
    handleRef = () => {
        this.getNote()
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
    getUserDetails = async () => {
        await this.setState({
            userData:userServices.getUserDetails()
        })
        console.log(this.state.userData,"uiyteruigaerlhaewrlhaoewhro;iahewor;iha;lewrh;ahew");
        
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
        let result = userServices.getNote();
        result.then((res) => {
            console.log(res, "res in get");
            this.setState({
                archiveNotes: res
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
            console.log(res, "res in get");
            this.setState({
                allNotes: res
            })
        })
    }
    binNote = () => {
        let result = userServices.getNote();
        result.then((res) => {
            this.setState({
                binNotes: res
            })
        })
    }
    pinNote = () => {
        let result = userServices.getNote();
        result.then((res) => {
            this.setState({
                pinNotes: res
            })
        })
    }
    getLabel = () => {
        let result = userServices.getLabel();
        result.then((res) => {
            this.setState({
                labelNotes: res
            })
        })
    }
    componentDidMount() {
        this.getUserDetails();
        this.getNote();
        this.getArchive();
        this.binNote();
        this.pinNote();
        this.getLabel();
    }
    render() {
        console.log(this.state.panalChange, "name panel");
        console.log(this.state.allNotes, "datas");
        let count = 0;
        let notesObj = this.state.allNotes.map(arrNotes => {
            console.log(arrNotes.data().trash, arrNotes.data().archive, "all notes");

            if (arrNotes.data().trash === false && arrNotes.data().archive === false && arrNotes.data().pin === false && arrNotes.data().notelabel === '') {
                return (
                    <UserNotes allNotes={arrNotes} bin={this.binNote} pin={this.pinNote} get={this.getNote} label={this.getLabel}/>
                )
            } else if (arrNotes.data().trash === false && arrNotes.data().archive === false && arrNotes.data().pin === false && arrNotes.data().notelabel!=='') {
                return (
                    <Label labelNotes={arrNotes} pin={this.pinNote} bin={this.binNote} get={this.getNote} label={this.getLabel}/>
                )
            }
        })
        let archiveObj = this.state.archiveNotes.map(arrNotes => {
            console.log(arrNotes, "title");
            if (arrNotes.data().trash === false && arrNotes.data().archive === true && arrNotes.data().pin === false) {
                return (
                    <Archive archiveNotes={arrNotes} change={this.getArchive} bin={this.binNote} />
                )
            }
        })
        let binObj = this.state.binNotes.map(arrNotes => {
            console.log(arrNotes.id, "bin notes");

            if (arrNotes.data().trash) {
                return (
                    <Bin binNotes={arrNotes} />
                )
            }
        })
        let pinObj = this.state.pinNotes.map(arrNotes => {
            console.log(arrNotes.data().trash, arrNotes.data().archive, "pin notes");

            if (arrNotes.data().trash === false && arrNotes.data().pin === true) {
                count++;
                return (
                    <Pin pinNotes={arrNotes} pin={this.pinNote} bin={this.binNote} get={this.getNote} />
                )
            }
        })
        let labelObj = this.state.labelNotes.map(arrNotes => {
            console.log(arrNotes.data().notelabel, "label notes");

            if (arrNotes.data().notelabel && this.state.panalChange === arrNotes.data().notelabel) {
                count++;
                console.log(this.state.panalChange, "name panel");

                return (
                    <Label labelNotes={arrNotes} pin={this.pinNote} bin={this.binNote} get={this.getNote} />
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
                                            open={this.state.openMenu}
                                            anchorEl={this.state.anchorEl}
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
                        label={this.state.allNotes}
                        panel={this.changePanalName}
                        change={this.state.open}
                        value={this.handleClose}
                        drawerName={this.changeDrawerName}

                    />
                    <div>
                        {this.state.panalChange === "Notes" ?
                            <div>
                                <div className="notesComponent">
                                    <Notes change={this.handleRef} archive={this.getArchive} />
                                </div>
                                {count > 0 ?
                                    <span className="pinText">pinned</span> : <div></div>
                                }
                                <div className="usernotes_decor">
                                    {pinObj}
                                </div>
                                {
                                    count > 0 ?
                                        <div>
                                            <Divider />
                                            <span className="pinText">others</span></div> : <div></div>
                                }
                                <div className="usernotes_decor">
                                    {notesObj}
                                </div>
                            </div>
                            : this.state.panalChange === "Archive" ?
                                <div className="notesComponent">
                                    {archiveObj}
                                </div> : this.state.panalChange === "Bin" ? <div className="notesComponent">
                                    {binObj}
                                </div> : <div className="notesComponent">
                                        {labelObj}
                                    </div>}
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}
export default Home