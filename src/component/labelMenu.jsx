import React, { Component } from "react"
import { Menu, Typography, TextField, MenuItem, MuiThemeProvider, createMuiTheme, Divider } from "@material-ui/core"
import userServices from "../services/userServices"
const theme = createMuiTheme({
    overrides: {
        MuiList: {
            padding: {
                padding: "10px"
            }
        },
        MuiListItem: {
            gutters: {
                paddingLeft: "0px",
                paddingRight: "0px"
            }
        }
    }
})

class LabelMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labelNames:[]
        }
    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Menu
                    open={this.props.labelMenu}
                    autoFocusItem={this.props.labelMenu}
                    anchorEl={this.props.labelAnchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'top',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'bottom',
                    }}
                    onClose={this.props.labelMenuClose}
                    style={{
                        padding: "10px"
                    }}
                >
                    <Typography>Label</Typography>
                    <Divider />
                    <TextField
                        style={{
                            height: "5vh"
                        }}
                        value={this.props.notelabel}
                        onChange={(event) => {
                            this.props.labelNoteChange(event)
                        }}
                    />
                    <MenuItem
                        onClick={this.props.handleAddLabel}>create : {this.props.notelabel}
                    </MenuItem>
                </Menu>
            </MuiThemeProvider>
        )
    }
}
export default LabelMenu