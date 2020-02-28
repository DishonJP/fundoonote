import React, { PureComponent } from 'react'
import { Card, InputBase, IconButton, Button, Tooltip, Menu, MenuItem, DialogContent, MuiThemeProvider, createMuiTheme, Divider, Typography, Dialog, TextField, Chip } from '@material-ui/core'
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined';
import PinDropOutlinedIcon from '@material-ui/icons/PinDropOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import CloseIcon from '@material-ui/icons/Close';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import userServices from '../services/userServices'
import MoreMenu from './moreMenu';
import LabelMenu from './labelMenu';
import RemMenu from './remMenu';
import Message from './message';
import ColabratorDialog from './colabratorDialog';
import { log } from 'util';
const theme = createMuiTheme({
    overrides: {
        MuiMenu: {
            paper: {
                width: "auto"
            }
        },
        MuiDialog: {
            paper: {
                borderRadius: "10px"
            }
        }
    }
})
const themes = createMuiTheme({
    overrides: {
        MuiList: {
            padding: {
                paddingTop: "0px",
                paddingBottom: "0px",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "114px",
            }
        }
    }
});
const colorArray = [
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

class UserNotes extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            change: true,
            dialogOpen: false,
            cardOpen: false,
            cardanchorEl: null,
            labelMenu: false,
            labelAnchorEl: null,
            remAnchorEl: null,
            remOpen: false,
            menuOpen: false,
            menuanchorEl:null,
            cardWidth: '',
            displayIcon: "hidden",
            border: "none",
            width: this.props.layout,
            title: this.props.allNotes.data().title,
            content: this.props.allNotes.data().notes,
            backcolor: this.props.allNotes.data().inputbcolor,
            inputbcolor: this.props.allNotes.data().inputbcolor,
            trash: this.props.allNotes.data().trash,
            docId: this.props.allNotes.id,
            pin: this.props.allNotes.data().pin,
            noteLabel: this.props.allNotes.data().notelabel,
            remainder: this.props.allNotes.data().remainder,
            archive: this.props.allNotes.data().archive,
            msg: "",
            snackBarOpen: false,
            colOpen:false
        }
    }
    moreMenuClose =()=> {
        this.setState({
            menuOpen: false,
            menuanchorEl:null
        })
    }
    handleClickAway = () => {
        this.setState({
            remOpen: false,
            labelMenu: false,
            cardOpen: false,
            dialogOpen: false
        })
    }
    labelNoteChange = (event) => {
        this.setState({
            noteLabel:event.target.value
        })
    }
    labelMenuClose = () => {
        this.setState({
            labelMenu: false,
            labelAnchorEl:null
        })
    }
    remDataChange = (data) => {
        this.setState({
            remainder:data
        })
    }
    remClose = () => {
        this.setState({
            remOpen: false,
            remAnchorEl:null
        })
    }
    removeLabel = async () => {
        await this.setState({
            noteLabel: ""
        })
        let data = {
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
        console.log(data.pin);
        userServices.binNotes(data);
        this.props.get();
        this.props.la();
    }
    closeColab = () => {
        this.setState({
            colOpen:false
        })
    }
    addColab = (data) => {
        const datas = {
            title: this.state.title,
            notes: this.state.content,
            id: data,
            trash: this.state.trash,
            pin: this.state.pin,
            label: this.state.noteLabel,
            archive: this.state.archive,
            remainder: this.state.remainder,
            backcolor: this.state.backcolor,
            inputbcolor: this.state.inputbcolor
        }
        userServices.addColab(datas).then(res => {
            console.log("added");
        })
        this.props.get();
        this.props.la();
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
            label: this.state.noteLabel,
            archive: this.state.archive,
            remainder: this.state.remainder,
            backcolor: this.state.backcolor,
            inputbcolor: this.state.inputbcolor
        }
        console.log(this.state.docId);
        userServices.binNotes(data);

        this.props.get();
        this.props.la();
    }
    handleArchive = () => {
        let data = {
            title: this.state.title,
            notes: this.state.content,
            id: this.state.docId,
            trash: this.state.trash,
            pin: this.state.pin,
            label: this.state.noteLabel,
            archive: true,
            remainder: this.state.remainder,
            backcolor: this.state.backcolor,
            inputbcolor: this.state.inputbcolor
        }
        userServices.binNotes(data).then((res) => {
            console.log("done");

        })
        this.props.get();
        this.props.la();
        this.setState({
            dialogOpen: false
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
            label: this.state.noteLabel,
            archive: this.state.archive,
            remainder: this.state.remainder,
            backcolor: this.state.backcolor,
            inputbcolor: this.state.inputbcolor
        }
        let daata = "";
        for (let i = 0; i < this.state.remainder.length; i++) {
            if (i < 4) {
                daata += this.state.remainder[i];
                if (i === 3) {
                    console.log(daata);
                    console.log(da.getFullYear());
                    if (da.getFullYear() < daata) {
                        userServices.binNotes(data);
                        this.props.get();
                        this.props.la();
                        this.setState({
                            remAnchorEl: null,
                            dialogOpen: false,
                            remOpen: false,
                        })
                        break;
                    } else if (da.getFullYear() === daata) {
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
                if (i === 6) {
                    if (da.getMonth() + 1 < daata) {
                        userServices.binNotes(data);
                        this.props.get();
                        this.props.la();
                        this.setState({
                            remAnchorEl: null,
                            dialogOpen: false,
                            remOpen: false,
                        })
                        break;
                    }
                    else if (da.getMonth() + 1 === daata) {
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
                if (i === 9) {
                    if (da.getDay() < daata) {
                        userServices.binNotes(data);
                        this.props.get();
                        this.props.la();
                        this.setState({
                            remAnchorEl: null,
                            dialogOpen: false,
                            remOpen: false,
                        })
                        break;
                    }
                    else if (da.getDay() === daata) {
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
                if (i === 12) {
                    if (da.getHours() < daata) {
                        userServices.binNotes(data);
                        this.props.get();
                        this.props.la();
                        this.setState({
                            remAnchorEl: null,
                            dialogOpen: false,
                            remOpen: false,
                        })
                        break;
                    }
                    else if (da.getHours() === daata) {
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
                if (i === (this.state.remainder.length - 1)) {
                    if (da.getMinutes() < daata) {
                        userServices.binNotes(data);
                        this.props.get();
                        this.props.la();
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
        userServices.binNotes(data)
        this.props.get();
        this.props.la();
    }
    handleOnClick = (event) => {
        event.preventDefault();
        this.setState({
            cardOpen: true,
            cardanchorEl: event.currentTarget
        })
    }
    validation = () => {
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
        userServices.binNotes(data).then((res) => {
            console.log(res, "done update");
        })
            .catch((err) => {
                console.log(err);
            })
        this.props.get();
        this.props.la();
        this.setState({
            labelMenu: false,
            labelAnchorEl: null,
            noteLabel: '',
            dialogOpen: false
        })
    }
    handlePin =() => {
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
         userServices.binNotes(data).then((res) => {
             
        })
            .catch((err) => {
                console.log(err);
            })
            this.setState({
                msg: "note pinned successfully",
                snackBarOpen:true
            })
        this.props.handleMessage(this.state.msg,this.state.snackBarOpen);
        this.props.get();
        this.props.la();
    }
    handleLabel = async (lab) => {
         await this.setState({
            noteLabel:lab
        })
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
        userServices.addLabel(data);
        this.props.get();
        this.props.la();
        this.setState({
            labelMenu: false
        })
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
        userServices.addLabel(data);
        this.props.get();
        this.props.la();
        this.setState({
            labelMenu: false
        })
    }
    handleClickLabel = (event) => {
        this.setState({
            menuOpen: false,
            menuanchorEl: false,
            labelMenu: true,
            labelAnchorEl: event.currentTarget
        })
    }
    componentDidMount() {
        if (this.props.layout === true) {
            this.setState({
                cardWidth: "24%"
            })
        } else {
            this.setState({
                cardWidth: "60%"
            })
        }
    }
    componentWillReceiveProps(props) {
        if (props.layout === true) {
            this.setState({
                cardWidth: "24%"
            })
        } else {
            this.setState({
                cardWidth: "60%"
            })
        }
        this.setState({
            width: props.layout,
            title: props.allNotes.data().title,
            content: props.allNotes.data().notes,
            backcolor: props.allNotes.data().inputbcolor,
            inputbcolor: props.allNotes.data().inputbcolor,
            trash: props.allNotes.data().trash,
            docId: props.allNotes.id,
            pin: props.allNotes.data().pin,
            noteLabel: props.allNotes.data().notelabel,
            remainder: props.allNotes.data().remainder,
            archive: props.allNotes.data().archive,
        })
    }
    render() {
        let colorArr = colorArray.map(color => {
            return (
                <IconButton
                    onClick={() => {
                        this.setState({
                            backcolor: color.bcolor,
                            inputbcolor: color.bcolor
                        })
                    }}
                    style={{
                        backgroundColor: color.bcolor,
                        margin:"2px"
                    }}
                >
                </IconButton>
            )
        })
        if (this.state.change) {
            return (
                <MuiThemeProvider theme={theme}>
                    
                    <Card id="card"
                        onMouseEnter={() => {
                            this.setState({
                                displayIcon: "",
                                border: "0px 0px 3px 1px"
                            })
                        }}
                        onMouseLeave={() => {
                            this.setState({
                                displayIcon: "hidden",
                                border: "none"
                            })
                        }}
                        style={{
                            width: this.state.cardWidth,
                            minWidth: "280px",
                            height: "fit-content",
                            borderRadius: "10px",
                            border: "1px solid lightgray",
                            backgroundColor: this.state.inputbcolor,
                            margin: "3px",
                            display:"flex",
                            flexWrap: "nowrap",
                            padding: "10px",
                            boxShadow: this.state.border
                        }}>
                        <div>
                            <div onClick={() => {
                                this.setState({
                                    change: false,
                                    dialogOpen: true
                                })
                            }}
                                className="title_pin1">
                                <Typography variant="h5">{this.state.title}</Typography>
                                <div style={{
                                    visibility: this.state.displayIcon
                                }}>
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
                            </div>
                            <div onClick={() => {
                                this.setState({
                                    change: false,
                                    dialogOpen: true
                                })
                            }}
                                className="title_pin">
                                <InputBase
                                    fullWidth
                                    multiline
                                    readOnly={true}
                                    value={this.state.content}
                                ></InputBase>
                            </div>
                            <div classname="usernote_laRe">
                            {this.state.noteLabel !== "" ?
                                <Chip
                                    style={{
                                        backgroundColor: "rgba(0,0,0,.2)",
                                    }}
                                    label={this.state.noteLabel}
                                    onDelete={this.removeLabel} /> : null}
                            {this.state.remainder !== "" ?
                                <Chip
                                    style={{
                                            backgroundColor: "rgba(0,0,0,.2)",
                                        marginLeft:"3px"
                                    }}
                                    label={this.state.remainder}
                                    onDelete={this.removeRemainder} />: null}
                                </div>
                            <div
                                style={{
                                    visibility: this.state.displayIcon
                                }}
                                className="arrange">
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
                                        <IconButton onClick={() => {
                                            this.setState({
                                                colOpen:true
                                            })
                                        }}>
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
                            </div>
                            <MuiThemeProvider theme={themes}>
                            <Menu
                                open={this.state.cardOpen}
                                anchorEl={this.state.cardanchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'center',
                                    horizontal: 'center',
                                }}
                                onClose={() => {
                                    this.setState({
                                        cardOpen: false,
                                        cardanchorEl: null
                                    })
                                }}
                            >
                                <div >
                                    {colorArr}
                                </div>
                                </Menu>
                            </MuiThemeProvider>
                            <ColabratorDialog
                                addColab={this.addColab}
                                colOpen={this.state.colOpen} closeColab={this.closeColab} />
                            <div className="more_menu">
                                <MoreMenu
                                    menuOpen={this.state.menuOpen}
                                    menuanchorEl={this.state.menuanchorEl}
                                    handleClickLabel={this.handleClickLabel}
                                    handleMenuClick={this.handleMenuClick}
                                    moreMenuClose={this.moreMenuClose}
                                />
                            </div>
                            <div className="more_menu">
                                <RemMenu
                                    remOpen={this.state.remOpen}
                                    remAnchorEl={this.state.remAnchorEl}
                                    remainder={this.state.remainder}
                                    remDataChange={this.remDataChange}
                                    remClose={this.remClose}
                                />
                            </div>
                            <LabelMenu
                                labelMenu={this.state.labelMenu}
                                labelAnchorEl={this.state.labelAnchorEl}
                                handleAddLabel={this.handleAddLabel}
                                notelabel={this.state.noteLabel}
                                labelMenuClose={this.labelMenuClose}
                                labelNoteChange={this.labelNoteChange}
                                handleLabel={this.handleLabel}
                            />
                        </div>
                    </Card>
                </MuiThemeProvider>
            )
        }
        else {
            return (
                <div className="ncard_decor">
                    <MuiThemeProvider theme={theme}>
                        <Dialog
                            open={this.state.dialogOpen}>
                            <div>
                                <DialogContent
                                    style={{
                                        width: "auto",
                                        height: "auto",
                                        borderColor: "lightgray",
                                        backgroundColor: this.state.backcolor,
                                        padding: "5px"
                                    }}>
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
                                    <div classname="usernote_laRe">
                            {this.state.noteLabel !== "" ?
                                <Chip
                                    style={{
                                        backgroundColor: "rgba(0,0,0,.2)",
                                    }}
                                    label={this.state.noteLabel}
                                    onDelete={this.removeLabel} /> : null}
                            {this.state.remainder !== "" ?
                                <Chip
                                    style={{
                                            backgroundColor: "rgba(0,0,0,.2)",
                                        marginLeft:"3px"
                                    }}
                                    label={this.state.remainder}
                                    onDelete={this.removeRemainder} />: null}
                                </div>
                                    <div className="arrange">
                                        <div className="icon_arrange">
                                            <Tooltip title="Add remainder">
                                                <IconButton
                                                    id="icon_butSize1"
                                                    onClick={(event) => {
                                                    this.setState({
                                                        remOpen: true,
                                                        remAnchorEl: event.currentTarget
                                                    })
                                                }}>
                                                    <AddAlertOutlinedIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Collaborator">
                                                <IconButton id="icon_butSize1">
                                                    <PersonAddOutlinedIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Change color" >
                                                <IconButton id="icon_butSize1" onClick={this.handleOnClick}>
                                                    <ColorLensOutlinedIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Insert Photo">
                                                <IconButton id="icon_butSize1">
                                                    <InsertPhotoOutlinedIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Archive">
                                                <IconButton id="icon_butSize1" onClick={this.handleArchive}>
                                                    <ArchiveOutlinedIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="More">
                                                <IconButton
                                                    id="icon_butSize1"
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
                                                    this.validation();
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
                                padding: "0px 0px 0px 0px",
                            }}
                            elevation={0}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            onClose={() => {
                                this.setState({
                                    cardOpen: false,
                                    cardanchorEl: null
                                })
                            }}>
                            <div>
                                {colorArr}
                            </div>
                        </Menu>
                        <div className="more_menu">
                        <MoreMenu
                                    menuOpen={this.state.menuOpen}
                                    menuanchorEl={this.state.menuanchorEl}
                                    handleClickLabel={this.handleClickLabel}
                                    handleMenuClick={this.handleMenuClick}
                                    moreMenuClose={this.moreMenuClose}
                                />
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
                                onClose={() => {
                                    this.setState({
                                        remOpen: false,
                                        remAnchorEl:null
                                    })
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
                        <LabelMenu
                                labelMenu={this.state.labelMenu}
                                labelAnchorEl={this.state.labelAnchorEl}
                                handleAddLabel={this.handleAddLabel}
                                notelabel={this.state.noteLabel}
                                labelMenuClose={this.labelMenuClose}
                                labelNoteChange={this.labelNoteChange}
                                handleLabel={this.handleLabel}
                            />
                    </MuiThemeProvider>
                </div>
            )
        }
    }
}
export default UserNotes