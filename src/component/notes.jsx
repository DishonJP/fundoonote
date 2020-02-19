import React, { Component } from 'react'
import { Card, InputBase, IconButton, Button, Tooltip, TextField, Typography, Menu, MenuItem, MuiThemeProvider, createMuiTheme, Divider } from '@material-ui/core'
import ListAltIcon from '@material-ui/icons/ListAlt';
import BrushIcon from '@material-ui/icons/Brush';
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined';
import PinDropOutlinedIcon from '@material-ui/icons/PinDropOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import userServices from '../services/userServices';
const theme = createMuiTheme({
    overrides: {
        MuiMenu: {
            paper: {
                width: "auto"
            }
        },
        MuiList: {
            padding: {
                paddingTop: "0px",
                paddingBottom: "0px"
            }
        }
    }
})
var colorArray = [
    {
        colors: "#7FDBFF",
        bcolor: "lightblue"
    },
    {
        colors: "violet",
        bcolor: "#dab5d7"
    },
    {
        colors: "teal",
        bcolor: "lightgray"
    },
    {
        colors: "#ff3333",
        bcolor: "#ffcccc"
    },
    {
        colors: "#00b300",
        bcolor: "#b3ffb3"
    },
    {
        colors: "#0066ff",
        bcolor: "#b3d1ff"
    },
    {
        colors: "#ffff1a",
        bcolor: "#ffffb3"
    },
    {
        colors: "#ff6600",
        bcolor: "#ffd1b3"
    },
    {
        colors: "#b35900",
        bcolor: "#ffbf80"
    },
    {
        colors: "#00264d",
        bcolor: "#66b3ff"
    },
    {
        colors: "#737373",
        bcolor: "#e6e6e6"
    },
    {
        colors: "#ffffff",
        bcolor: "#e6e6e6"
    }
]

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            change: true,
            title: "",
            content: "",
            cardOpen: false,
            cardanchorEl: null,
            menuOpen: false,
            menuanchorEl: null,
            backcolor: "white",
            inputbcolor: "lightgray",
            archive: false,
            pin: false,
            remainder: "",
            notelabel: '',
            labelMenu: false,
            labelAnchorEl: null,
            remOpen: false,
            remAnchorEl: null,
            trash: false
        }
    }
    handlePin = () => {
        const data = {
            title: this.state.title,
            notes: this.state.content,
            id: this.state.docId,
            trash: this.state.trash,
            pin: this.state.pin,
            label: this.state.notelabel,
            archive: this.state.archive,
            remainder: this.state.remainder,
            backcolor: this.state.backcolor,
            inputbcolor: this.state.inputbcolor
        }
        userServices.addNote(data).then((res) => {
            console.log(res, "done update");

        })
            .catch((err) => {
                console.log(err);
            })
        this.props.get();
        this.props.bin();
        this.props.pin();
        this.props.label();
        this.props.archive();
        this.props.getRem();
        this.setState({
            change: true,
            title: "",
            content: "",
            cardOpen: false,
            cardanchorEl: null,
            menuOpen: false,
            menuanchorEl: null,
            backcolor: "white",
            inputbcolor: "lightgray",
            archive: false,
            pin: false,
            remainder: "",
            notelabel: '',
            labelMenu: false,
            labelAnchorEl: null,
            remOpen: false,
            remAnchorEl: null,
            trash: false
        })
    }
    handleRemainder = () => {
        let date = Date.now();
        let da = new Date(date);
        let data = {
            title: this.state.title,
            notes: this.state.content,
            id: this.state.docId,
            trash: this.state.trash,
            pin: this.state.pin,
            label: this.state.notelabel,
            archive: this.state.archive,
            remainder: this.state.remainder,
            backcolor: this.state.backcolor,
            inputbcolor: this.state.inputbcolor
        }
        let daata = "";
        for (let i = 0; i < this.state.remainder.length; i++) {
            if (i < 4) {
                daata = daata + this.state.remainder[i];
                if (i == 3) {
                    console.log(daata);
                    console.log(da.getFullYear());
                    if (da.getFullYear() < daata) {
                        userServices.addNote(data);
                        this.props.get();
                        this.props.bin();
                        this.props.pin();
                        this.props.label();
                        this.props.archive();
                        this.props.getRem();
                        this.setState({
                            change: true,
                            title: "",
                            content: "",
                            cardOpen: false,
                            cardanchorEl: null,
                            menuOpen: false,
                            menuanchorEl: null,
                            backcolor: "white",
                            inputbcolor: "lightgray",
                            archive: false,
                            pin: false,
                            remainder: "",
                            notelabel: '',
                            labelMenu: false,
                            labelAnchorEl: null,
                            remOpen: false,
                            remAnchorEl: null,
                            trash: false
                        })
                        break;
                    } else if (da.getFullYear() == daata) {
                        daata = '';
                        continue;
                    }
                    else {
                        console.log("bad year");
                    }
                }
            }
            if (i > 4 && i < 7) {
                daata += this.state.remainder[i];
                if (i == 6) {
                    if (da.getMonth() + 1 < daata) {
                        userServices.addNote(data);
                        this.props.get();
                        this.props.bin();
                        this.props.pin();
                        this.props.label();
                        this.props.archive();
                        this.props.getRem();
                        this.setState({
                            change: true,
                            title: "",
                            content: "",
                            cardOpen: false,
                            cardanchorEl: null,
                            menuOpen: false,
                            menuanchorEl: null,
                            backcolor: "white",
                            inputbcolor: "lightgray",
                            archive: false,
                            pin: false,
                            remainder: "",
                            notelabel: '',
                            labelMenu: false,
                            labelAnchorEl: null,
                            remOpen: false,
                            remAnchorEl: null,
                            trash: false
                        })
                        break;
                    }
                    else if (da.getMonth() + 1 == daata) {
                        daata = '';
                        continue;
                    }
                    else {
                        console.log("bad mon");
                    }
                }
            }
            if (i > 7 && i < 10) {
                daata += this.state.remainder[i];
                if (i == 9) {
                    if (da.getDay() < daata) {
                        userServices.addNote(data);
                        this.props.get();
                        this.props.bin();
                        this.props.pin();
                        this.props.label();
                        this.props.archive();
                        this.props.getRem();
                        this.setState({
                            change: true,
                            title: "",
                            content: "",
                            cardOpen: false,
                            cardanchorEl: null,
                            menuOpen: false,
                            menuanchorEl: null,
                            backcolor: "white",
                            inputbcolor: "lightgray",
                            archive: false,
                            pin: false,
                            remainder: "",
                            notelabel: '',
                            labelMenu: false,
                            labelAnchorEl: null,
                            remOpen: false,
                            remAnchorEl: null,
                            trash: false
                        })
                        break;
                    }
                    else if (da.getDay() == daata) {
                        daata = '';
                        continue;
                    }
                    else {
                        console.log("bad Day");
                    }
                }
            }
            if (i > 10 && i < 13) {
                daata += this.state.remainder[i];
                if (i == 12) {
                    if (da.getHours() < daata) {
                        userServices.addNote(data);
                        this.props.get();
                        this.props.bin();
                        this.props.pin();
                        this.props.label();
                        this.props.archive();
                        this.props.getRem();
                        this.setState({
                            change: true,
                            title: "",
                            content: "",
                            cardOpen: false,
                            cardanchorEl: null,
                            menuOpen: false,
                            menuanchorEl: null,
                            backcolor: "white",
                            inputbcolor: "lightgray",
                            archive: false,
                            pin: false,
                            remainder: "",
                            notelabel: '',
                            labelMenu: false,
                            labelAnchorEl: null,
                            remOpen: false,
                            remAnchorEl: null,
                            trash: false
                        })
                        break;
                    }
                    else if (da.getHours() == daata) {
                        daata = '';
                        continue;
                    }
                    else {
                        console.log("bad hour");
                    }
                }
            }
            if (i > 13 && i < this.state.remainder.length) {
                daata += this.state.remainder[i];
                if (i == (this.state.remainder.length - 1)) {
                    if (da.getMinutes() < daata) {
                        userServices.addNote(data);
                        this.props.get();
                        this.props.bin();
                        this.props.pin();
                        this.props.label();
                        this.props.archive();
                        this.props.getRem();
                        this.setState({
                            change: true,
                            title: "",
                            content: "",
                            cardOpen: false,
                            cardanchorEl: null,
                            menuOpen: false,
                            menuanchorEl: null,
                            backcolor: "white",
                            inputbcolor: "lightgray",
                            archive: false,
                            pin: false,
                            remainder: "",
                            notelabel: '',
                            labelMenu: false,
                            labelAnchorEl: null,
                            remOpen: false,
                            remAnchorEl: null,
                            trash: false
                        })
                        break;
                    } else {
                        console.log("bad min");
                    }
                }
            }
        }

        alert(this.state.remainder);
    }
    handleAddLabel = async () => {
        const data = {
            title: this.state.title,
            notes: this.state.content,
            id: this.state.docId,
            trash: this.state.trash,
            pin: this.state.pin,
            label: this.state.notelabel,
            archive: this.state.archive,
            remainder: this.state.remainder,
            backcolor: this.state.backcolor,
            inputbcolor: this.state.inputbcolor
        }
        if (data.title !== '' || data.notes !== '' || data.remainder) {
            userServices.addNote(data).then((res) => {
                console.log(res, "done update");
            })
        }
        let label = await userServices.getLabel();
        let count = 0;
        for (let i = 0; i < label.length; i++) {
            if (data.label !== label[i]) {
                count++;
            }
        }
        if (count === label.length) {
            userServices.addLabel(data);
        }
        this.props.get();
        this.props.bin();
        this.props.pin();
        this.props.label();
        this.props.archive();
        this.props.getRem();
        this.setState({
            change: true,
            title: "",
            content: "",
            cardOpen: false,
            cardanchorEl: null,
            menuOpen: false,
            menuanchorEl: null,
            backcolor: "white",
            inputbcolor: "lightgray",
            archive: false,
            pin: false,
            remainder: "",
            notelabel: '',
            labelMenu: false,
            labelAnchorEl: null,
            remOpen: false,
            remAnchorEl: null,
            trash: false
        })
    }
    handleClickLabel = (event) => {
        this.setState({
            menuOpen: false,
            menuanchorEl: null,
            labelMenu: true,
            labelAnchorEl: event.currentTarget
        })
    }
    handleOnClick = (event) => {
        event.preventDefault();
        this.setState({
            cardOpen: true,
            cardanchorEl: event.currentTarget
        })
    }
    handleLeave(event) {
        event.preventDefault();
        this.setState({
            cardOpen: false,
            cardanchorEl: event.currentTarget
        })
    }
    validation = async () => {
        if (this.state.title !== '') {
            const data = {
                title: this.state.title,
                notes: this.state.content,
                id: this.state.docId,
                trash: this.state.trash,
                pin: this.state.pin,
                label: this.state.notelabel,
                archive: this.state.archive,
                remainder: this.state.remainder,
                backcolor: this.state.backcolor,
                inputbcolor: this.state.inputbcolor
            }
            userServices.addNote(data).then((res) => {
                console.log(res, "ajhskdjhaksdh211342455");

            })
                .catch((err) => {
                    console.log(err);
                })
            
        }
        this.props.get();
            this.props.bin();
            this.props.pin();
            this.props.label();
            this.props.archive();
            this.props.getRem();
        await this.setState({
            change: true,
            title: "",
            content: "",
            cardOpen: false,
            cardanchorEl: null,
            menuOpen: false,
            menuanchorEl: null,
            backcolor: "white",
            inputbcolor: "lightgray",
            archive: false,
            pin: false,
            remainder: "",
            notelabel: '',
            labelMenu: false,
            labelAnchorEl: null,
            remOpen: false,
            remAnchorEl: null,
            trash: false
        })
    }
    handleArchive = async () => {
        await this.setState({
            archive: true
        })
        let data = {
            title: this.state.title,
            notes: this.state.content,
            trash: this.state.trash,
            backcolor: this.state.backcolor,
            inputbcolor: this.state.inputbcolor,
            archive: this.state.archive,
            pin: this.state.pin,
            remainder: this.state.remainder,
            label: this.state.notelabel
        }
        userServices.addNote(data).then((res) => {
            console.log("done");
            this.props.get();
            this.props.bin();
            this.props.pin();
            this.props.label();
            this.props.archive();
            this.props.getRem();
        })
        this.setState({
            change: true,
            title: "",
            content: "",
            cardOpen: false,
            cardanchorEl: null,
            menuOpen: false,
            menuanchorEl: null,
            backcolor: "white",
            inputbcolor: "lightgray",
            archive: false,
            pin: false,
            remainder: "",
            notelabel: '',
            labelMenu: false,
            labelAnchorEl: null,
            remOpen: false,
            remAnchorEl: null,
            trash: false
        })
    }
    render() {
        let colorArr = colorArray.map(color => {
            return (
                <IconButton
                    onClick={() => {
                        this.setState({
                            backcolor: color.colors,
                            inputbcolor: color.bcolor
                        })
                    }}
                    style={{
                        backgroundColor: color.colors
                    }}
                >
                </IconButton>
            )
        })
        if (this.state.change) {
            return (
                    <MuiThemeProvider theme={theme}>
                        <Card
                            style={{
                                width: "60%",
                                marginTop: "5%",
                                height: "auto",
                                border: "1px solid lightgray",
                                boxShadow: "0px 0px 5px 1px",
                                borderRadius: "10px",
                                borderColor: "lightgray"
                            }}
                        >
                            <div className="note_decor">
                                <InputBase
                                    multiline
                                    onClick={() => {
                                        this.setState({
                                            change: false
                                        })
                                    }}
                                    fullWidth
                                    placeholder="I know about you just take a note"
                                />
                                <Tooltip title="Note list">
                                    <IconButton>
                                        <ListAltIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="New note with drawing">
                                    <IconButton>
                                        <BrushIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="New note with image">
                                    <IconButton>
                                        <InsertPhotoOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Card>
                    </MuiThemeProvider>
            )
        }
        else {
            return (
                    <MuiThemeProvider theme={theme}>
                        <Card
                            style={{
                                width: "60%",
                                marginTop: "5%",
                                height: "auto",
                                boxShadow: "0px 0px 5px 1px",
                                borderRadius: "10px",
                                borderColor: "lightgray",
                                backgroundColor: this.state.backcolor
                            }}>
                            <div>
                                <div className="title_pin">
                                    <InputBase
                                        style={{
                                            backgroundColor: this.state.inputbcolor,
                                            borderRadius: "5px",
                                            height: "auto",
                                            padding: "10px"
                                        }}
                                        multiline
                                        value={this.state.title}
                                        onChange={(event) => {
                                            this.setState({
                                                title: event.target.value
                                            })
                                        }}
                                        fullWidth
                                        placeholder="Title"
                                    />
                                    <Tooltip title="Pin it">
                                        <IconButton onClick={async () => {
                                            await this.setState({
                                                pin: true
                                            });
                                            this.handlePin()
                                        }}>
                                            <PinDropOutlinedIcon
                                                fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div className="title_pin">
                                    <InputBase
                                        style={{
                                            backgroundColor: this.state.inputbcolor,
                                            borderRadius: "5px",
                                            height: "auto",
                                            marginRight: "4px",
                                            padding: "10px"
                                        }}
                                        multiline
                                        fullWidth
                                        placeholder="I know about U naaa..."
                                        value={this.state.content}
                                        onChange={(event) => {
                                            this.setState({
                                                content: event.target.value
                                            })
                                        }}
                                    />
                                </div>
                                <div className="arrang">
                                    <div className="icon_arrange">
                                        <Tooltip title="Add remainder">
                                            <IconButton onClick={(event) => {
                                                this.setState({
                                                    remOpen: true,
                                                    remAnchorEl: event.currentTarget
                                                })
                                            }}>
                                                <AddAlertOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Collaborator">
                                            <IconButton >
                                                <PersonAddOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Change color" >
                                            <IconButton onClick={this.handleOnClick}>
                                                <ColorLensOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Insert Photo">
                                            <IconButton>
                                                <InsertPhotoOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Archive">
                                            <IconButton onClick={this.handleArchive}>
                                                <ArchiveOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="More">
                                            <IconButton
                                                onClick={(event) => {
                                                    this.setState({
                                                        menuanchorEl: event.currentTarget,
                                                        menuOpen: true
                                                    })
                                                }}
                                            >
                                                <MoreVertOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <div className="button_place">
                                        <Button
                                            variant="contained"
                                            style={{
                                                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                                                border: "1px solid",
                                                borderColor: this.state.inputbcolor,
                                                fontSize: "10px",
                                                padding: "0px 0px 0px 0px",
                                                marginTop: "10px",
                                                marginBottom: "10px",
                                                marginRight: "10px",
                                                backgroundColor: this.state.backcolor
                                            }}
                                            onClick={this.validation}
                                        >
                                            close
                            </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <Menu
                            open={this.state.cardOpen}
                            anchorEl={this.state.cardanchorEl}
                            style={{
                                padding: "0px 0px 0px 0px"
                            }}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            onClick={() => {
                                this.setState({
                                    cardOpen: false,
                                    cardanchorEl: null
                                })
                            }}
                        >
                            <div className="clrow_one">
                                {colorArr}
                            </div>
                        </Menu>
                        <div className="more_menu">
                            <Menu
                                open={this.state.menuOpen}
                                onClick={() => {
                                    this.setState({
                                        menuOpen: false
                                    })
                                }}
                                autoFocusItem={this.state.menuOpen}
                                anchorEl={this.state.menuanchorEl}
                                style={{
                                    padding: "15px"
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
                            >
                                <MenuItem onClick={this.handleClickLabel}>Add Label</MenuItem>
                                <Divider />
                                <MenuItem>Add Drawing</MenuItem>
                                <Divider />
                                <MenuItem>Show tick boxes</MenuItem>
                            </Menu>
                        </div>
                        <div className="more_menu">
                            <Menu
                                open={this.state.remOpen}
                                anchorEl={this.state.remAnchorEl}
                                style={{
                                    marginTop: "93px"
                                }}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                            >
                                <MenuItem
                                    style={{
                                        backgroundColor: 'white'
                                    }}
                                >
                                    <TextField
                                        type="datetime-local"
                                        value={this.state.remainder}
                                        onChange={(event) => {
                                            this.setState({
                                                remainder: event.target.value
                                            })
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <Button onClick={this.handleRemainder}>submit</Button>
                                </MenuItem>
                            </Menu>
                        </div>
                        <Menu
                            open={this.state.labelMenu}
                            autoFocusItem={this.state.labelMenu}
                            anchorEl={this.state.labelAnchorEl}
                            anchorOrigin={{
                                position: "bottom",
                                vertical: 'bottom',
                                horizontal: 'top',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'bottom',
                            }}
                        >
                            <Typography>Label name</Typography>
                            <TextField
                                style={{
                                    height: "8vh"
                                }}
                                variant="filled"
                                value={this.state.notelabel}
                                onChange={(event) => {
                                    this.setState({
                                        notelabel: event.target.value
                                    })
                                }}
                            />
                            <MenuItem onClick={this.handleAddLabel}>
                                create : {this.state.notelabel}
                            </MenuItem>
                        </Menu>
                    </MuiThemeProvider>
            )
        }
    }
}
export default Notes