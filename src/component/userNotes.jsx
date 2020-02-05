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
import userServices from '../services/userServices'
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

class UserNotes extends Component{
    constructor(props) {
        super(props);
        this.state = {
            backcolor: "",
            inputbcolor: "lightgray",
        }
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

        return (
                <Card
                            style={{
                                width: "35%",
                                height: "20%",
                                borderRadius: "10px",
                                border:"1px solid lightgray",
                                backgroundColor: this.state.backcolor,
                                margin: "2%",
                                flexWrap:"nowrap"
                            }}>
                            <div>
                                <div className="title_pin">
                                    {/* <InputBase
                                        style={{
                                            backgroundColor: this.state.inputbcolor,
                                            borderRadius: "5px",
                                            height: "auto",
                                            padding: "10px"
                                        }}
                                        multiline
                                        value={this.props.allNotes.title}
                                        onChange={(event) => {
                                            this.setState({
                                                title: event.target.value
                                            })
                                        }}
                                        fullWidth
                                        placeholder="Title"
                            /> */}
                            <text>{this.props.allNotes.title}</text>
                                    <Tooltip title="Pin it">
                                        <IconButton>
                                            <PinDropOutlinedIcon
                                                fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div className="title_pin">
                                    {/* <InputBase
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
                                        value={this.props.allNotes.content}
                                        onChange={(event) => {
                                            this.setState({
                                                content: event.target.value
                                            })
                                        }}/> */}
                            <text>{this.props.allNotes.notes}</text>
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
                                    
                                </div>
                </div>
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
                </Card>
                
                        
            
        )
    }
}
export default UserNotes