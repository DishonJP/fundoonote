import React, { Component } from 'react'
import { Dialog, Divider, Avatar, Typography, MuiThemeProvider, createMuiTheme, InputBase, Button, MenuItem } from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import userServices from '../services/userServices';
const theme = createMuiTheme(
    {
        overrides: {
            MuiDialog: {
                paper: {
                    width: "50%",
                    height: "45%"
                }
            }
        }
    }
)
class ColabratorDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colArray: [],
            colText: "",
            display: false,
            uid:""
        }
    }
    getCollaborator() {
        let colData = userServices.getCollaborator();
        colData.then(res => {
            this.setState({
                colArray:res
            })
        })
    }
    componentDidMount() {
        this.getCollaborator();
    }
    render() {
        let count=0
        let colObj = this.state.colArray.map(col => {
            if (col.email.toLocaleLowerCase().startsWith(this.state.colText.toLocaleLowerCase()) && this.state.colText !== "" && col.email !== localStorage.getItem("email")) {
              count++
                return (
                    <MenuItem
                        button
                        onClick={() => {
                            this.setState({
                                colText: col.email,
                                uid:col.curUser,
                                display:true
                            })
                        }}
                    >
                        {col.email}
                    </MenuItem>
                )
           }
           return null
        })
        return (
            <MuiThemeProvider theme={theme}>
                <Dialog
                    open={this.props.colOpen}
                >
                    <div style={{
                        height: "100%",
                        display: "flex",
                        flexDirection:"column"
                    }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: "wrap",
                        padding: "15px"
                    }}>
                        <Typography variant="h6" component="h2"
                            className="set_margin">
                            Collabrator
                </Typography>
                        <Divider />
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: "15px"
                        }}>
                            <div
                            className="set_margin">
                                <Avatar alt="D" />
                            </div>
                            <div
                                className="set_margin">
                                <Typography variant="subtitle2">{localStorage.getItem("firstName")} {localStorage.getItem("lastName")} (owner)</Typography>
                                <Typography variant="subtitle2">{localStorage.getItem("email")}</Typography>
                            </div>
                        </div>
                        <div
                            className="person_add">
                            <div
                                className="add_icon">
                                <PersonAddIcon fontSize="medium" />

                            </div>
                            <InputBase
                                className="set_margin"
                                autoFocus={true}
                                    placeholder="Hello from the otherside"
                                    value={this.state.colText}
                                    onChange={async (event) => {
                                        await this.setState({
                                            colText:event.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    visibility:this.state.display?"hidden":count>0?"visible":"hidden"
                                }}
                                className="col_menu">
                            {colObj}
                            </div>
                    </div>
                    <footer className="footer_decor">
                    <div>
                        <Button onClick={this.props.closeColab}>cancel</Button>
                    </div>
                            <div style={{
                        marginLeft:"10px"
                    }}>
                                <Button onClick={() => {
                                    this.props.addColab(this.state.uid)
                        }}>save</Button>
                        </div>
                        </footer>
                        </div>
                </Dialog>
            </MuiThemeProvider>
        )
    }
}
export default ColabratorDialog