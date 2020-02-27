import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, InputBase, IconButton, Menu, MenuItem, Button, MuiThemeProvider, createMuiTheme, Divider, Snackbar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import notes from '../assets/keep.png'
import Drawers from '../component/drawer'
import SettingsIcon from '@material-ui/icons/Settings';
import IconChange from './iconChange';
import userServices from '../services/userServices'
import bunny from '../assets/bunny.jpg'
import Notes from './notes';
import UserNotes from './userNotes';
import Archive from './archive';
import Bin from './bin';
import CloseIcon from '@material-ui/icons/Close'
import Pin from './pin'
import Search from './search'
import Label from './label';
import Remainder from './remainder';
import EmptyLabel from './emptyLabel';
import RemMenu from './remMenu';
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
        },
        MuiToolbar: {
            regular: {
                minHeight: "0px"
            },
            gutters: {
                paddingLeft: "0px",
                paddingRight: "0px"
            }
        },

    }
}
)
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openMenu: false,
            close: true,
            anchorEl: null,
            title: '',
            content: '',
            allNotes: [],
            panalChange: "Notes",
            labelNotes: [],
            userData: [],
            labelNote: [],
            grid: "usernotes_decor",
            list: "usersNote_decor",
            userFName: localStorage.getItem("firstName"),
            userLName: localStorage.getItem("lastName"),
            userEmail: localStorage.getItem("email"),
            search: "",
            labelName: [],
            margin: "0%",
            msg: '',
            snackBarOpen: false
        };
    }
    changePanalName = (data) => {
        this.setState({
            panalChange: data,
            open: false,
            margin: "0%"
        })
    }
    handleMessage = (data1, data2) => {
        this.setState({
            msg: data1,
            snackBarOpen: data2
        })
    }
    handleOpen = () => {
        if (this.state.open === false) {
            this.setState({
                open: true,
                margin: "20%"
            })
        } else {
            this.setState({
                open: false,
                margin: "0%"
            })
        }
    }
    handleClose = () => {
        this.setState({
            open: false,
            margin: "0%"
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
    getNote = () => {
        let result = userServices.getNote();
        result.then((res) => {
            this.setState({
                allNotes: res
            })
        })
    }
    handleSearch = async (event) => {
        this.setState({
            search: event.target.value
        })
        this.getNote();
    }
    getLabels = () => {
        let result = userServices.getLabel();
        result.then((res) => {
            this.setState({
                labelNotes: res
            })
        })
    }
    componentDidMount() {
        this.getNote();
        this.getLabels();
    }
    render() {
        let count = 0;
        let pinCount = 0;
        let otherCount = 0;
        let searchCount = 0;
        let searchObj = this.state.allNotes.map(arrNotes => {
            if (((arrNotes.data().title).toLocaleLowerCase().includes((this.state.search.toLocaleLowerCase())) || (arrNotes.data().notes).toLocaleLowerCase().includes((this.state.search.toLocaleLowerCase())) || (arrNotes.data().notelabel).toLocaleLowerCase().includes((this.state.search.toLocaleLowerCase()))) && this.state.search !== "") {
                searchCount++;
                return (
                    <Search searchNotes={arrNotes} get={this.getNote} gridList={this.state.gridList} getRem={this.getRemainder} layout={this.state.close} la={this.getLabels} />
                )
            }
            return null;
        })
        let notesObj = this.state.allNotes.map(arrNotes => {
            if (arrNotes.data().trash === false && arrNotes.data().archive === false && arrNotes.data().pin === false) {
                otherCount++;
                return (
                    <UserNotes allNotes={arrNotes} handleMessage={this.handleMessage} get={this.getNote} gridList={this.state.gridList} la={this.getLabels} layout={this.state.close} />
                )
            }
            return null;
        })
        let archiveObj = this.state.allNotes.map(arrNotes => {
            if (arrNotes.data().trash === false && arrNotes.data().archive === true && arrNotes.data().pin === false) {
                return (
                    <Archive archiveNotes={arrNotes} la={this.getLabels} layout={this.state.close} get={this.getNote} />
                )
            }
            return null;
        })
        let binObj = this.state.allNotes.map(arrNotes => {
            if (arrNotes.data().trash) {
                return (
                    <Bin binNotes={arrNotes} layout={this.state.close} />
                )
            }
            return null;
        })
        let pinObj = this.state.allNotes.map(arrNotes => {
            if (arrNotes.data().trash === false && arrNotes.data().pin === true) {
                count++;
                pinCount++;
                return (
                    <Pin pinNotes={arrNotes} la={this.getLabels} get={this.getNote} layout={this.state.close} />
                )
            }
            return null;
        })
        let count1 = 0;
        let labelObj = this.state.allNotes.map(arrNotes => {
            count1++
            for (let i = 0; i < this.state.labelNotes.length; i++) {
                if (arrNotes.data().notelabel === this.state.labelNotes[i] && this.state.panalChange === this.state.labelNotes[i]) {
                    count1 = 0;
                    return (
                        <Label labelNotes={arrNotes} la={this.getLabels} get={this.getNote} layout={this.state.close} />
                    )
                }
                else if (arrNotes.data().notelabel !== this.state.labelNotes[i] && this.state.panalChange === this.state.labelNotes[i]) {
                    if (count1 === this.state.allNotes.length - 1 && arrNotes !== "") {
                        count1 = 0;
                        return (
                            <EmptyLabel />
                        )
                    }
                }
            }
            return null;
        });
        let remObj = this.state.allNotes.map(arrNotes => {
            if (arrNotes.data().remainder !== "" && arrNotes.data().trash === false) {
                return (
                    <Remainder remNotes={arrNotes} pin={this.pinNote} bin={this.binNote} get={this.getNote} getRem={this.getRemainder} label={this.getLabel} archive={this.getArchive} layout={this.state.close} la={this.getLabels} />
                )
            }
            return null;
        })
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <div
                        className="header_decor"
                        style={{
                            position: "fixed",
                            width: "100%",
                            zIndex: "968",
                        }}
                    >
                        <AppBar
                            class="appbar_decor">
                            <div className="menu_name">
                                <Toolbar
                                    style={{
                                        paddingLeft: "0px",
                                        paddingRight: "0px"
                                    }}
                                    color="inherit"
                                >
                                    <IconButton id="icon_butSize"
                                        onClick={this.handleOpen}
                                    >
                                        <MenuIcon id="font_sizeicon" fontSize="large" />
                                    </IconButton>
                                </Toolbar>
                                <Typography
                                    style={{
                                        margin: "0px"
                                    }}
                                    noWrap
                                    class="appname_decor"
                                >
                                    FundooNote
                    </Typography>
                                <div className="img_place">
                                    <img
                                        className="img_decor"
                                        src={notes}
                                        alt="N"
                                    />
                                </div>
                            </div>
                            <div className="search_icon">
                                <SearchIcon id="seac_icon" />
                                <InputBase
                                    fullWidth
                                    placeholder="Search"
                                    value={this.state.search}
                                    onChange={this.handleSearch}
                                />
                            </div>
                            <div className="acc_decor">
                                <Toolbar id="toolbar"
                                    color="inherit"
                                >
                                    <div className="menu_name">
                                        <IconButton id="icon_butSize">
                                            <CloudQueueIcon id="seac_icon"
                                                fontSize="medium"
                                            />
                                        </IconButton>
                                        <IconChange
                                            data={this.state.close}
                                            change={this.handleChange}
                                        />
                                        <IconButton id="icon_butSize">
                                            <SettingsIcon id="font_sizeicon"
                                                fontSize="medium"
                                            />
                                        </IconButton>
                                    </div>
                                    <img className="user_image"
                                        onClick={this.handleMenuOpen}
                                        style={{
                                            width: "1cm",
                                            height: "1cm",
                                            borderRadius: "50%"
                                        }}
                                        src={bunny}
                                        alt="u"
                                    />
                                </Toolbar>
                            </div>
                        </AppBar>
                    </div>
                    <div>
                        <Menu
                            keepMounted
                            style={{
                                marginTop: "52px",
                                padding: "10px"
                            }}
                            open={this.state.openMenu}
                            anchorEl={this.state.anchorEl}
                            onClose={() => {
                                this.setState({
                                    openMenu: false
                                })
                            }}
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
                            <div className="uName_style">
                                <Typography>{this.state.userFName}{this.state.userLName}</Typography>
                            </div>

                            <div className="uName_style">
                                <Typography>{this.state.userEmail}</Typography>
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

                    <Drawers
                        label={this.state.labelNotes}
                        panel={this.changePanalName}
                        change={this.state.open}
                        value={this.handleClose}
                    />
                    <div>
                        <Snackbar
                            open={this.state.snackBarOpen}
                            autoHideDuration={6000}
                            message={this.state.msg}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            action={
                                <React.Fragment>
                                    <Button color="secondary" size="small" >
                                        UNDO
                </Button>
                                    <IconButton onClick={() => {
                                        this.setState({
                                            snackBarOpen: false
                                        })
                                    }} size="small" aria-label="close" color="inherit" >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </React.Fragment>
                            }>
                        </Snackbar>

                        <div className="notesComponent">
                            <RemMenu />
                            <Notes get={this.getNote} layout={this.state.close} />
                        </div>
                        <div
                            className="allnotes_width"
                            style={{
                                marginLeft: this.state.margin
                            }}>
                            {searchCount > 0 ?
                                <div className="notesComponent">
                                    {searchObj}
                                </div> : <div></div>
                            }
                            {this.state.panalChange === "Notes" && searchCount <= 0 ?
                                <div>


                                    {count > 0 ?
                                        <div style={{
                                            marginTop: "10px",
                                            marginLeft: "10%"
                                        }} className="pinText">pinned:{pinCount}</div> : <div></div>
                                    }
                                    <div className={this.state.close ? this.state.grid : this.state.list}>
                                        {pinObj}
                                    </div>
                                    {
                                        count > 0 ?
                                            <div style={{
                                                marginBottom: "20px"
                                            }}>
                                                <Divider style={{
                                                    marginTop: "20px"
                                                }} />
                                                <span className="pinText">others:{otherCount}</span></div> : <div></div>
                                    }
                                    <div className={this.state.close ? this.state.grid : this.state.list}>
                                        {notesObj}
                                    </div>
                                </div>
                                : this.state.panalChange === "Archive" ?
                                    <div className={this.state.close ? this.state.grid : this.state.list}>
                                        {archiveObj}
                                    </div> : this.state.panalChange === "Bin" ? <div className={this.state.close ? this.state.grid : this.state.list}>
                                        {binObj}
                                    </div> : this.state.panalChange === "Remainder" ?
                                            <div className={this.state.close ? this.state.grid : this.state.list}>
                                                {remObj}
                                            </div> :
                                            <div className={this.state.close ? this.state.grid : this.state.list}>
                                                {labelObj}
                                            </div>}
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}
export default Home