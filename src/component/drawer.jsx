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
                width: "200px"
            }
        },
        MuiListItem: {
            button: {
                backgroundColor:"lightsalmon"
            }
        }
    }
}
)
class Drawers extends Component{
    constructor(props) {
        super(props);
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
                        <span>DishonJP</span>
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
                                button>
                                <div className="noteIcon_decor">
                                <ListItemIcon>
                                    <NotesIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Notes"/>
                                </div>
                                
                            </ListItem>
                            <ListItem
                                button>
                                <div className="noteIcon_decor">
                                <ListItemIcon>
                                    <NotificationsNoneOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Remainder"/>
                                </div>
                                
                            </ListItem>
                            <Divider />
                            <label>Label</label>
                            <div>
                            <ListItem
                                    button
                                >
                                <div className="noteIcon_decor">
                                <ListItemIcon>
                                    <LabelOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText primary=""/>
                                </div>
                                
                                </ListItem>
                                <ListItem
                                button>
                                <div className="noteIcon_decor">
                                <ListItemIcon>
                                    <EditOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Edit Label"/>
                                </div>
                                
                            </ListItem>
                            </div>
                            <Divider />
                            <ListItem
                                button>
                                <div className="noteIcon_decor">
                                <ListItemIcon>
                                    <ArchiveOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Archive"/>
                                </div>
                                
                            </ListItem>
                            <ListItem
                                button>
                                <div className="noteIcon_decor">
                                <ListItemIcon>
                                    <DeleteForeverIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Bin"/>
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