import React, { Component } from 'react'
import { Card, InputBase,IconButton } from '@material-ui/core'
import ListAltIcon from '@material-ui/icons/ListAlt';
import BrushIcon from '@material-ui/icons/Brush';
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined'; 
import PinDropOutlinedIcon from '@material-ui/icons/PinDropOutlined';
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
                            height: "20vh",
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
                                <PinDropOutlinedIcon/>
                            </IconButton>
                            </div>
                            </div>
                    </Card>
                </div>
            )
        }
    }
}
export default Notes