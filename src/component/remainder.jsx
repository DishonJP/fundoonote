import React, { Component } from 'react'
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined';
import PinDropOutlinedIcon from '@material-ui/icons/PinDropOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import CloseIcon from '@material-ui/icons/Close';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import { Card, InputBase, IconButton, Button, TextField, Tooltip, Menu, MenuItem, DialogContent, MuiThemeProvider, createMuiTheme, Divider, Typography, Dialog } from '@material-ui/core'
import userServices from '../services/userServices'
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
];
class Remainder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            change: true,
            dialogopen: false,
            menuanchorEl: null,
            menuOpen: false,
            title: this.props.remNotes.data().title,
            content: this.props.remNotes.data().notes,
            cardOpen: false,
            cardanchorEl: null,
            trash: false,
            backcolor: this.props.remNotes.data().backcolor,
            inputbcolor: this.props.remNotes.data().inputbcolor,
            docId: this.props.remNotes.id,
            pin: this.props.remNotes.data().pin,
            label: this.props.remNotes.data().notelabel,
            remainder: this.props.remNotes.data().remainder,
            archive: this.props.remNotes.data().archive,
            remOpen: false,
            remAnchorEl: null,
            labelMenu: false,
            labelAnchorEl: null,
            width: this.props.layout,
            cardWidth:""
        }
    }
    componentDidMount() {
        if (this.state.width) {
            this.setState({
                cardWidth:"40%"
            })
        } else {
            this.setState({
                cardWidth:"60%"
            })
        }
    }
    validation = () => {
        const data = {
            title: this.state.title,
            notes: this.state.content,
            id: this.state.docId,
            trash: this.state.trash
        }
        userServices.binNotes(data).then((res) => {
            console.log(res, "done update");
            this.props.change();
        })
            .catch((err) => {
                console.log(err);
            })
            userServices.updateLabel(data)
        this.props.get();
        this.props.bin();
        this.props.pin();
        this.props.label();
    }
    handleMenuClick = async () => {
        await this.setState({
            trash: true,
            dialogOpen: false,
            menuOpen: false,
        })
        let data = {
            id: this.state.docId,
            title: this.state.title,
            notes: this.state.content,
            trash: this.state.trash,
            pin: this.state.pin,
            label: this.state.noteLabel,
            archive: this.state.archive,
            remainder: this.state.remainder,
            backcolor: this.state.backcolor,
            inputbcolor: this.state.inputbcolor
        }
        console.log(data.id, "doc id");
        userServices.updateLabel(data)
        userServices.binNotes(data)
        this.props.get();
        this.props.bin();
        this.props.pin();
        this.props.label();
        this.props.archive();
        this.props.getRem();
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
            label: this.state.label,
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
                        userServices.binNotes(data);
                        userServices.updateLabel(data);
                        this.props.get();
                        this.props.bin();
                        this.props.pin();
                        this.props.label();
                        this.props.archive();
                        this.props.getRem();
                        this.setState({
                            remAnchorEl: null,
                            dialogOpen: false,
                            remOpen: false,
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
                        userServices.binNotes(data);
                        userServices.updateLabel(data);
                        this.props.get();
                        this.props.bin();
                        this.props.pin();
                        this.props.label();
                        this.props.archive();
                        this.props.getRem();
                        this.setState({
                            remAnchorEl: null,
                            dialogOpen: false,
                            remOpen: false,
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
                        userServices.binNotes(data);
                        userServices.updateLabel(data);
                        this.props.get();
                        this.props.bin();
                        this.props.pin();
                        this.props.label();
                        this.props.archive();
                        this.props.getRem();
                        this.setState({
                            remAnchorEl: null,
                            dialogOpen: false,
                            remOpen: false,
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
                        userServices.binNotes(data);
                        userServices.updateLabel(data);
                        this.props.get();
                        this.props.bin();
                        this.props.pin();
                        this.props.label();
                        this.props.archive();
                        this.props.getRem();
                        this.setState({
                            remAnchorEl: null,
                            dialogOpen: false,
                            remOpen: false,
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
                        userServices.binNotes(data);
                        userServices.updateLabel(data);
                        this.props.get();
                        this.props.bin();
                        this.props.pin();
                        this.props.label();
                        this.props.archive();
                        this.props.getRem();
                        this.setState({
                            remAnchorEl: null,
                            dialogOpen: false,
                            remOpen: false,
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
    handleAddLabel = () => {
        const data = {
            title: this.state.title,
            notes: this.state.content,
            id: this.state.docId,
            trash: this.state.trash,
            pin: this.state.pin,
            label: this.state.noteLabel,
            archive: this.state.archive,
            remainder: this.state.remainder,
            backcolor: this.state.backcolor,
            inputbcolor: this.state.inputbcolor
        }
        userServices.binNotes(data);
        userServices.addLabel(data).then((res) => {
            console.log(res, "done update");
            this.props.get();
            this.props.bin();
            this.props.pin();
            this.props.label();
            this.props.archive();
            this.props.getRem();
        })
        this.setState({
            dialogOpen: false,
            labelMenu:false
        })
    }
    handleOnClick = (event) => {
        event.preventDefault();
        this.setState({
            cardOpen: true,
            cardanchorEl: event.currentTarget
        })
    }
    removeLabel = async () => {
        await this.setState({
            label: ""
        })
        let data = {
            title: this.state.title,
            notes: this.state.content,
            id: this.state.docId,
            trash: this.state.trash,
            pin: this.state.pin,
            label: this.state.label,
            archive: this.state.archive,
            remainder: this.state.remainder,
            backcolor: this.state.backcolor,
            inputbcolor: this.state.inputbcolor
        }
        console.log(this.state.docId);
        userServices.binNotes(data);
        userServices.deletelabel(data)
        this.props.get();
        this.props.bin();
        this.props.pin();
        this.props.label();
        this.props.archive();
        this.props.getRem();
    }
    removeRemainder = async () => {
        await this.setState({
            remainder: ""
        })
        let data = {
            title: this.state.title,
            notes: this.state.content,
            id: this.state.docId,
            trash: this.state.trash,
            pin: this.state.pin,
            label: this.state.label,
            archive: this.state.archive,
            remainder: this.state.remainder,
            backcolor: this.state.backcolor,
            inputbcolor: this.state.inputbcolor
        }
        console.log(this.state.docId);
        userServices.binNotes(data);
        userServices.updateLabel(data)
        this.props.get();
        this.props.bin();
        this.props.pin();
        this.props.label();
        this.props.archive();
        this.props.getRem();
    }
    addMenuLabel = (event) => {
        this.setState({
            menuOpen: false,
            menuanchorEl: false,
            labelMenu: true,
            labelAnchorEl: event.currentTarget
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
                <Card onClick={() => {
                    this.setState({
                        change: false,
                        dialogOpen: true
                    })
                }}
                    style={{
                        width: this.state.cardWidth,
                        height: "auto%",
                        borderRadius: "10px",
                        border: "1px solid lightgray",
                        margin: "2%",
                        flexWrap: "nowrap",
                        backgroundColor: this.state.inputbcolor,
                        padding: "10px",
                        boxShadow: "0px 0px 0px 0px"
                    }}>
                    <div>
                        <div
                            className="title_pin1">
                            <Typography variant="h5">{this.state.title}</Typography>
                        </div>
                        <div className="title_pin">
                            <Typography>{this.state.content}</Typography>
                        </div>
                    </div>
                    {this.state.label !== "" ? <div className="label_close" style={{
                        backgroundColor: this.state.inputbcolor
                    }}>
                        <Typography>{this.state.label}</Typography>
                        <Tooltip title="remove label">
                            <IconButton onClick={this.removeLabel}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </div> : <div></div>}
                    <div className="label_close" style={{
                        backgroundColor: this.state.inputbcolor
                    }}>
                        <AccessAlarmIcon />
                        <Typography>{this.state.remainder}</Typography>
                        <Tooltip title="remove remainder">
                            <IconButton onClick={this.removeRemainder}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Card>
            )
        }
        else {
            return (
                <div className="ncard_decor">
                    <MuiThemeProvider theme={theme}>
                        <Dialog
                            open={this.state.dialogOpen}
                        >
                            <div>
                                <DialogContent
                                    style={{
                                        width: "auto",
                                        height: "auto",
                                        borderColor: "lightgray",
                                        backgroundColor: this.state.backcolor,
                                        padding: "5px"
                                    }}
                                >
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
                                            <IconButton>
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
                                    {this.state.label !== "" ? <div className="label_close" style={{
                                        backgroundColor: this.state.inputbcolor
                                    }}>
                                        <Typography>{this.state.label}</Typography>
                                        <Tooltip title="remove label">
                                            <IconButton onClick={this.removeLabel}>
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </div> : <div></div>}
                                    <div className="label_close" style={{
                                        backgroundColor: this.state.inputbcolor
                                    }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                flexDirection:"row"
                                            }}
                                            onClick={(event) => {
                                            this.setState({
                                                remOpen: true,
                                                remAnchorEl: event.currentTarget
                                            })
                                        }}>
                                            <AccessAlarmIcon />
                                            <Typography>{this.state.remainder}</Typography>
                                        </div>
                                        <Tooltip title="remove remainder">
                                            <IconButton onClick={this.removeLabel}>
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <div className="arrange">
                                        <div className="icon_arrange">
                                            <Tooltip title="Add remainder">
                                                <IconButton>
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
                                                <IconButton>
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
                                                onClick={async () => {
                                                    await this.setState({
                                                        change: true,
                                                        dialogOpen: false
                                                    })
                                                    this.validation()
                                                }}
                                            >
                                                close
                </Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </div>
                        </Dialog>
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
                        <div className="more_menu">
                            <Menu
                                open={this.state.menuOpen}
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
                                <MenuItem onClick={this.addMenuLabel}
                                >Add Label</MenuItem>
                                <MenuItem onClick={this.handleMenuClick}
                                >Delete Note</MenuItem>
                                <Divider />
                                <MenuItem>Add Drawing</MenuItem>
                                <Divider />
                                <MenuItem>Show tick boxes</MenuItem>
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
                                value={this.state.noteLabel}
                                onChange={(event) => {
                                    this.setState({
                                        noteLabel: event.target.value
                                    })
                                }}
                            />
                            <MenuItem onClick={this.handleAddLabel}>
                                create : {this.state.noteLabel}
                            </MenuItem>
                        </Menu>
                    </MuiThemeProvider>
                </div>
            )
        }
    }
}
export default Remainder;