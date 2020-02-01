import React, { Component } from 'react'
import { Card, InputBase,IconButton,Button } from '@material-ui/core'
import ListAltIcon from '@material-ui/icons/ListAlt';
import BrushIcon from '@material-ui/icons/Brush';
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined'; 
import PinDropOutlinedIcon from '@material-ui/icons/PinDropOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
class Notes extends Component{
    constructor(props) {
        super(props);
        this.state = {
            change:true
        }
    }
    render() {
        if (this.state.change) {
            return (
                <div className="ncard_decor">
                    <Card
                        style={{
                            width: "15cm",
                            height: "8vh",
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
                            <IconButton
                            >
                                <ListAltIcon />
                            </IconButton>
                            <IconButton>
                                <BrushIcon />
                            </IconButton>
                            <IconButton>
                                <InsertPhotoOutlinedIcon />
                            </IconButton>
                        </div>
                    </Card>
                </div>
            )
        }
        else {
            return (
                <div className="ncard_decor">
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
                                        borderRadius:"15px"
                                    }}
                                fullWidth
                                placeholder="Title"
                            />
                            <IconButton>
                                <PinDropOutlinedIcon fontSize="small" />
                            </IconButton>
                            </div>
                            <div className="title_pin">
                            <InputBase
                                    style={{
                                        backgroundColor: "lightgray",
                                        borderRadius: "15px",
                                        height:"6vh"
                                    }}
                                fullWidth
                                placeholder="I know about U naaa..."
                            />
                            </div>
                            <IconButton>
                                <AddAlertOutlinedIcon fontSize="small"/>
                            </IconButton>
                            <IconButton>
                                <PersonAddOutlinedIcon fontSize="small" />
                            </IconButton>
                            <IconButton>
                                <ColorLensOutlinedIcon fontSize="small" />
                            </IconButton>
                            <IconButton>
                                <InsertPhotoOutlinedIcon fontSize="small" />
                            </IconButton>
                            <IconButton>
                                <ArchiveOutlinedIcon fontSize="small" />
                            </IconButton>
                            <IconButton>
                                <MoreVertOutlinedIcon fontSize="small" />
                            </IconButton>
                            <Button>
                                close
                            </Button>
                            </div>
                    </Card>
                </div>
            )
        }
    }
}
export default Notes