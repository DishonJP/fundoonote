import React from 'react'
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Card, InputBase, IconButton, Button, Tooltip, Menu, MenuItem,DialogContent, MuiThemeProvider, createMuiTheme, Divider, Typography, Dialog } from '@material-ui/core'
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
class Bin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            change: true,
            dialogOpen: false,
            menuanchorEl: null,
            menuOpen: false,
            title: this.props.binNotes.data().title,
            content: this.props.binNotes.data().notes,
            cardOpen: false,
            cardanchorEl: null,
            backcolor: "",
            inputbcolor: "lightgray",
            trash: this.props.binNotes.data().trash,
            docId: this.props.binNotes.id,
            width:this.props.layout,
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
    handleOnClick = (event) => {
        event.preventDefault();
        this.setState({
            cardOpen: true,
            cardanchorEl: event.currentTarget
        })
    }
    handleDelete = () => {
       let data = {
            id:this.state.docId
       }
        userServices.deleteNote(data);
        this.setState({
            dialogOpen: false
        })
    }
    handleRestore = async () => {
        await this.setState({
            trash: false,
            dialogOpen: false,
            menuOpen: false,
        })
        let data = {
            trash: this.state.trash,
            id:this.state.docId
        }
        userServices.binNotes(data)
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
                        backgroundColor: this.state.inputbcolor,
                        margin: "2%",
                        flexWrap: "nowrap",
                        padding: "10px"

                    }}>
                    <div>
                        <div className="title_pin1">
                            <Typography variant="h5">{this.state.title}</Typography>
                        </div>
                        <div className="title_pin">
                            <Typography>{this.state.content}</Typography>
                        </div>
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
                                        width: "240px",
                                        height: "auto",
                                        borderColor: "lightgray",
                                        backgroundColor: this.state.inputbcolor,
                                        padding: "5px"
                                    }}
                                >
                                    <div className="title_pin">
                                        <Typography
                                            variant="h4"
                                            style={{
                                                backgroundColor: this.state.inputbcolor
                                        }}
                                        >
                                            {this.state.title}
                                        </Typography>
                                    </div>
                                    <div className="title_pin">
                                        <Typography
                                            style={{
                                                backgroundColor: this.state.inputbcolor
                                        }}
                                        >
                                            {this.state.content}
                                        </Typography>
                                    </div>
                                    <div className="arrange">
                                        <div className="icon_arrange">
                                            <Tooltip title="Restore">
                                                <IconButton onClick={this.handleRestore}>
                                                    <RestoreFromTrashIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Remove Forever">
                                                <IconButton >
                                                    <DeleteForeverIcon onClick={this.handleDelete} fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </DialogContent>
                            </div>
                        </Dialog>
                    </MuiThemeProvider>
                </div>
            )
        }
    }
}
export default Bin