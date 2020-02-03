import React, { Component } from 'react'
import { Card, InputBase,IconButton,Button,Tooltip,Menu, MenuItem ,MuiThemeProvider,createMuiTheme,Divider} from '@material-ui/core'
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
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
const theme = createMuiTheme({
    overrides: {
        MuiMenu: {
            paper: {
                width: "160px"
            }
        },
        MuiList: {
            padding: {
                paddingTop: "0px",
                paddingBottom:"0px"
            }
        }
    }
})
class Notes extends Component{
    constructor(props) {
        super(props);
        this.state = {
            change: true,
            title: "",
            content: "",
            cardOpen: false,
            cardanchorEl: null,
            menuOpen: false,
            menuanchorEl:null
        }
    }
    handleOnClick = (event) => {
        this.setState({
            cardOpen: true,
            cardanchorEl:event.currentTarget
        })
    }
    validation = () => {
        if (this.state.title !== '') {
            const data = {
                title: this.state.title,
                notes:this.state.content
            }
            userServices.addNote(data).then((res) => {
               if (res) {
                   let note = userServices.getNote();
                   note.then((res) => {
                       console.log(res,"kdjhafkjad");
                   })
                       .catch((err) => {
                       console.log(err,"pooioipo");
                       
                   })
                   console.log(note,"sdfayjagd");
               } 
            })
                .catch((err) => {
                console.log(err);
                
            })
        }
    }
    render() {
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
                            <IconButton
                            >
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
                            border: "1px solid lightgray",
                            boxShadow: "0px 0px 5px 1px",
                            borderRadius: "10px",
                            borderColor: "lightgray"
                        }}
                    ><div>
                            <div className="title_pin">
                                <InputBase
                                    style={{
                                        backgroundColor: "lightgray",
                                        borderRadius: "15px",
                                        height: "auto",
                                        padding:"10px"
                                    }}
                                    multiline
                                    value={this.state.title}
                                    onChange={(event) => {
                                        this.setState({
                                            title:event.target.value
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
                                        backgroundColor: "lightgray",
                                        borderRadius: "15px",
                                        height: "auto",
                                        marginRight: "4px",
                                        padding:"10px"
                                    }}
                                    multiline
                                    fullWidth
                                    placeholder="I know about U naaa..."
                                    value={this.state.content}
                                    onChange={(event) => {
                                        this.setState({
                                            content : event.target.value
                                        })
                                    }}
                            />
                            </div>
                            <div className="arrange">
                                <div className="icon_arrange">
                                    <Tooltip title="Add remainder">
                            <IconButton>
                                <AddAlertOutlinedIcon fontSize="small"/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Collaborator">
                            <IconButton>
                                <PersonAddOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Change color">
                                    <IconButton
                                        onMouseEnter={this.handleOnClick }
                                    >      
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
                                                    menuOpen:true
                                                })
                                            }}
                                        >
                                <MoreVertOutlinedIcon fontSize="small" />
                                        </IconButton>
                                        </Tooltip>
                                </div>
                            <div className ="button_place">
                                    <Button
                                        variant="contained"
                                style={{
                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                                    border: "1px solid grey",
                                    fontSize: "10px",
                                    padding: "0px 0px 0px 0px",
                                    marginTop: "10px",
                                    marginBottom: "10px",
                                    marginRight:"10px"
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
                                padding: "0px 0px 0px 0px",
                                width:"auto"
                            }}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                              }}
                              transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                              }}
                            onMouseOut={() => {
                                this.setState({
                                    cardOpen: false,
                                    cardanchorEl:null
                                })
                            }}
                        >
                            <div className="clrow_one">
                            <IconButton class="changeiconsize">
                            <FiberManualRecordIcon fontSize="large"/>
                            </IconButton>
                            <IconButton class="changeiconsize">
                            <FiberManualRecordIcon fontSize="large"/>
                            </IconButton> 
                            <IconButton class="changeiconsize">
                            <FiberManualRecordIcon fontSize="large"/>
                            </IconButton> 
                            <IconButton class="changeiconsize">
                            <FiberManualRecordIcon fontSize="large"/>
                                </IconButton>
                                </div>    
                    </Menu>
                    <div className="more_menu">
                    <Menu
                        open={this.state.menuOpen}
                        autoFocusItem={this.state.menuOpen}
                        anchorEl={this.state.menuanchorEl}
                        style={{
                            padding:"15px"
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'top',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'bottom',
                          }}
                        >
                                <MenuItem>Add Label</MenuItem>
                                <Divider/>
                                <MenuItem>Add Drawing</MenuItem>
                                <Divider/>
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