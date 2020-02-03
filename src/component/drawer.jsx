import React, { Component } from 'react'
import { Drawer, Divider, IconButton ,MuiThemeProvider,createMuiTheme, List, ListItemIcon, ListItemText,ListItem} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import NotesIcon from '@material-ui/icons/Notes';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                marginTop: "67px",
                width: "240px"
            }
        }
    }
}
)
class Drawers extends Component{
    constructor(props) {
        super(props);
        this.state = {
            bgcolorN: 'lightgrey',
            bgcolorR: '',
            bgcolorL: '',
            bgcolorE: '',
            bgcolorA: '',
            bgcolorB: '',
            nameChange:"Notes"
        }
    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                    <Drawer
                        class="drawer_decor"
                        variant="persistent"
                        anchor="left"
                        open={this.props.change}
                > 
                    <div className="drawer_head">
                    <div className="name_decor">
                            <span>{this.state.nameChange}</span>
                    </div>
                    <div className="arrow_decor">
                        <IconButton
                            onClick={this.props.value}
                        >
                            <ArrowBackIcon/>
                        </IconButton>
                        </div>
                        </div>
                    <Divider />
                    <div>
                        <List>
                            <ListItem
                                button
                                onClick={()=> {
                                    this.setState({
                                            bgcolorN: 'lightgrey',
                                            bgcolorR: '',
                                            bgcolorL: '',
                                            bgcolorE: '',
                                            bgcolorA: '',
                                        bgcolorB: '', 
                                        nameChange:"Notes"
                                })}}
                                style={{
                                    backgroundColor:this.state.bgcolorN
                                }}
                            >
                                <div className="noteIcon_decor">
                                <ListItemIcon>
                                    <NotesIcon/>
                                </ListItemIcon>
                                    <ListItemText>
                                        <span className="listItemName_decor">Notes</span>
                                </ListItemText>
                                </div>
                            </ListItem>
                            <ListItem
                                button
                                onClick={()=> {
                                    this.setState({
                                        bgcolorN: '',
                                        bgcolorR: 'lightgrey',
                                        bgcolorL: '',
                                        bgcolorE: '',
                                        bgcolorA: '',
                                        bgcolorB: '',
                                        nameChange:"Remainder"
                                })}}
                                style={{
                                    backgroundColor:this.state.bgcolorR
                                }}
                            >
                                <div className="noteIcon_decor">
                                <ListItemIcon>
                                    <NotificationsNoneOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText>
                                        <span className="listItemName_decor">Remainder</span>
                                </ListItemText>
                                </div>
                            </ListItem>
                            <Divider />
                            <label className="label_decor">Label</label>
                            <div>
                            <ListItem
                                    button
                                    onClick={()=> {
                                        this.setState({
                                            bgcolorN: '',
                                            bgcolorR: '',
                                            bgcolorL: 'lightgrey',
                                            bgcolorE: '',
                                            bgcolorA: '',
                                            bgcolorB: '',
                                            nameChange:""
                                    })}}
                                style={{
                                    backgroundColor:this.state.bgcolorL
                                }}
                                >
                                <div className="noteIcon_decor">
                                <ListItemIcon>
                                    <LabelOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText primary=""/>
                                </div>
                                
                                </ListItem>
                                <ListItem
                                    button
                                    onClick={()=> {
                                        this.setState({
                                            bgcolorN: '',
                                            bgcolorR: '',
                                            bgcolorL: '',
                                            bgcolorE: 'lightgrey',
                                            bgcolorA: '',
                                            bgcolorB: '',
                                            nameChange:"Edit Label"
                                    })}}
                                    style={{
                                        backgroundColor:this.state.bgcolorE
                                    }}
                                >
                                <div className="noteIcon_decor">
                                <ListItemIcon>
                                    <EditOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText>
                                        <span className="listItemName_decor">Edit Label</span>
                                </ListItemText>
                                </div>
                                
                            </ListItem>
                            </div>
                            <Divider />
                            <ListItem
                                button
                                onClick={()=> {
                                    this.setState({
                                        bgcolorN: '',
                                        bgcolorR: '',
                                        bgcolorL: '',
                                        bgcolorE: '',
                                        bgcolorA: 'lightgrey',
                                        bgcolorB: '',
                                        nameChange:"Archive"
                                })}}
                                style={{
                                    backgroundColor:this.state.bgcolorA
                                }}
                            >
                                <div className="noteIcon_decor">
                                <ListItemIcon>
                                    <ArchiveOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText>
                                        <span className="listItemName_decor">Archive</span>
                                </ListItemText>
                                </div>
                            </ListItem>
                            <ListItem
                                button
                                onClick={()=> {
                                    this.setState({
                                        bgcolorN: '',
                                        bgcolorR: '',
                                        bgcolorL: '',
                                        bgcolorE: '',
                                        bgcolorA: '',
                                        bgcolorB: 'lightgray',
                                        nameChange:"Bin"
                                })}}
                                style={{
                                    backgroundColor:this.state.bgcolorB
                                }}
                            >
                                <div className="noteIcon_decor">
                                <ListItemIcon>
                                    <DeleteForeverIcon/>
                                </ListItemIcon>
                                <ListItemText>
                                        <span className="listItemName_decor">Bin</span>
                                </ListItemText>
                                </div>
                                
                            </ListItem>
                        </List>
                        </div>
                    </Drawer>
                    </MuiThemeProvider>
        )
    }
}
export default Drawers