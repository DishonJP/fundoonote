import React, { Component } from 'react'
import { Card, InputBase, IconButton, Button, Tooltip, Menu, MenuItem, MuiThemeProvider, createMuiTheme, Divider } from '@material-ui/core'
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
        bcolor:"#dab5d7"
    },
    {
        colors: "teal",
        bcolor: "lightgray"
    },
    {
        colors: "#ff3333",
        bcolor:"#ffcccc"
    },
    {
        colors: "#00b300",
        bcolor:"#b3ffb3"
    },
    {
        colors: "#0066ff",
        bcolor:"#b3d1ff"
    },
    {
        colors: "#ffff1a",
        bcolor:"#ffffb3"
    },
    {
        colors: "#ff6600",
        bcolor:"#ffd1b3"
    },
    {
        colors: "#b35900",
        bcolor:"#ffbf80"
    },
    {
        colors: "#00264d",
        bcolor:"#66b3ff"
    },
    {
        colors: "#737373",
        bcolor:"#e6e6e6"
    },
    {
        colors: "#ffffff",
        bcolor:"#e6e6e6"
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
            backcolor: "",
            inputbcolor:"lightgray"
        }
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

    
    validation = () => {
        if (this.state.title !== '') {
            const data = {
                title: this.state.title,
                notes: this.state.content
            }
            userServices.addNote(data).then((res) => {
                console.log(res,"ajhskdjhaksdh211342455"); 
                this.props.change();
            })
                .catch((err) => {
                    console.log(err);
                })
            
        }
        this.setState({
            change:true
        })
    }
    handleArchive = () => {
        let data = {
            title: this.state.title,
            notes:this.state.content
        }
        userServices.addArchive(data).then((res) => {
            console.log("done");
        })
    }
    render() {
        let colorArr = colorArray.map(color => {
            return (
                <IconButton
                    onClick={() => {
                        this.setState({
                            backcolor: color.colors,
                            inputbcolor:color.bcolor
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
                <div className="ncard_decor">
                    <MuiThemeProvider theme={theme}>
                        <Card
                            style={{
                                width: "15cm",
                                height: "auto",
                                border: "1px solid lightgray",
                                boxShadow: "0px 0px 5px 1px",
                                borderRadius: "10px",
                                borderColor: "lightgray"
                            }}
                        >
                            <div className="note_decor">
                                <InputBase
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
                </div>
            )
        }
        else {
            return (
                <div className="ncard_decor">
                    <MuiThemeProvider theme={theme}>
                        <Card
                            style={{
                                width: "15cm",
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
                                                borderColor:this.state.inputbcolor,
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
                                cardanchorEl:null
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
                                <MenuItem>Add Label</MenuItem>
                                <Divider />
                                <MenuItem>Add Drawing</MenuItem>
                                <Divider />
                                <MenuItem>Show tick boxes</MenuItem>
                            </Menu>
                        </div>
                    </MuiThemeProvider>
                    
                </div>
            )
        }
    }
}
export default Notes