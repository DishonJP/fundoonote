import React, { Component } from "react"
import { Menu, Typography, Card, TextField, MenuItem, Button, MuiThemeProvider, createMuiTheme, Divider, InputBase } from "@material-ui/core"
import userServices from "../services/userServices"
const theme = createMuiTheme({
    overrides: {
        MuiList: {
            padding: {
                padding: "0px"
            }
        },
        MuiListItem: {
            gutters: {
                paddingLeft: "0px",
                paddingRight: "0px"
            }
        }, MuiPopover: {
            paper: {
                overflowY:"hidden"
            }
        }
    }
})
class LabelMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labelNames: []
        }
    }
    getLabel() {
        let data = userServices.getLabel();
        data.then(res => {
            this.setState({
                labelNames: res
            })
        })
    }
    componentDidMount() {
        this.getLabel();
    }
    render() {
        let labelObj = this.state.labelNames.map(element => {
            if (element !== "") {
                return (
                    <MenuItem
                        style={{
                        padding: "10px",
                        height:"5vh"
                        }}
                        onClick={() => {
                        this.props.handleLabel(element)
                    }}>
                        {element}
                    </MenuItem>
                )
            }
            return null
        });
        return (
            <MuiThemeProvider theme={theme}>
                <Menu
                    open={this.props.labelMenu}
                    autoFocusItem={this.props.labelMenu}
                    anchorEl={this.props.labelAnchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    onClose={this.props.labelMenuClose}
                    style={{
                        maxHeight: "70vh",
                    }}
                >
                    <Card class="labelMenu_Decor" >
                        <Typography style={{
                            paddingLeft: "10px",
                            paddingRight:"10px"
                        }}>Label</Typography>
                        <InputBase
                            autoFocus={true}
                            fullWidth
                            style={{
                                height: "5vh",
                                paddingLeft: "10px",
                                paddingRight:"10px"
                            }}
                            placeholder="enter label name"
                            value={this.props.notelabel}
                            onChange={(event) => {
                                this.props.labelNoteChange(event)
                            }}
                        />
                        <MenuItem style={{
                            paddingLeft: "10px",
                            paddingRight:"10px"
                        }}
                            onClick={this.props.handleAddLabel}>create : {this.props.notelabel}
                        </MenuItem>
                    </Card>
                    <div className="scroll_label">
                        {labelObj}
                    </div>
                </Menu>
            </MuiThemeProvider>
        )
    }
}
export default LabelMenu