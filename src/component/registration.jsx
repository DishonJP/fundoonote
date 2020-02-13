import React from "react"
import { TextField, Button, Card, IconButton } from "@material-ui/core"
import userServices from "../services/userServices";
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            rePassword: '',
            SnackbarMsg: '',
            snackbarOpen: false,
        };
    }
    handleFName = event => {
        this.setState({ firstName: event.target.value })
    }
    handleLName = event => {
        this.setState({ lastName: event.target.value })
    }
    handleEmail = event => {
        this.setState({ email: event.target.value })
    }
    handlePassword = event => {
        this.setState({ password: event.target.value })
    }
    handleCheckPassword = event => {
        this.setState({ rePassword: event.target.value })
    }
    validation = () => {
        if (this.state.firstName !== '' && this.state.lastName !== '' && this.state.email !== '' && this.state.password !== '' && this.state.rePassword !== '') {
            if (/^[a-zA-Z]{2,12}$/i.test(this.state.firstName)) {
                if (/^[a-zA-Z]{2,12}$/i.test(this.state.lastName)) {
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
                        if (this.state.password === this.state.rePassword && this.state.password.length > 5 && this.state.password.length < 17) {
                            const data = {
                                firstName: this.state.firstName,
                                lastName: this.state.lastName,
                                email: this.state.email,
                                password: this.state.password
                            }
                            userServices.userRegistration(data).then(res => {
                                if (res.user) {
                                    this.setState({
                                        snackbarOpen: true,
                                        SnackbarMsg: "Registration Successful"
                                    })
                                    this.props.history.push("/login");
                                }
                                else {
                                    this.setState({
                                        snackbarOpen: true,
                                        SnackbarMsg: "Some problem occured while Registration"
                                    })
                                }

                            }).catch(err => {
                                this.setState({
                                    snackbarOpen: true,
                                    SnackbarMsg: err
                                })
                            }
                            )
                        } else {
                            this.setState({
                                snackbarOpen: true,
                                SnackbarMsg: "Invalid password"
                            })
                        }
                    } else {
                        this.setState({
                            snackbarOpen: true,
                            SnackbarMsg: "Invalid e-mail"
                        })
                    }
                }
                else {
                    this.setState({
                        snackbarOpen: true,
                        SnackbarMsg: "lastName cant contain numbers or special characters"
                    })
                }
            } else {
                this.setState({
                    snackbarOpen: true,
                    SnackbarMsg: "firstName cant contain numbers or special characters"
                })
            }
        }
        else {
            this.setState({
                snackbarOpen: true,
                SnackbarMsg: "plzs fill all the fields"
            })
        }
    }
    handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            snackbarOpen: false
        })
    };
    render() {
        return (
            <div className="registration_Form">
                <Card class="registration_Container">
                    <span className="app_name">
                        <span className="f">F</span>
                        <span className="f">u</span>
                        <span className="f">n</span>
                        <span className="f">d</span>
                        <span className="o">o</span>
                        <span className="o">o</span>
                        <span className="f">N</span>
                        <span className="f">o</span>
                        <span className="f">t</span>
                        <span className="f">e</span></span>
                    <div className="login">Registration</div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        autoHideDuration={3000}
                        open={this.state.snackbarOpen}
                        message={<span id="message-id">{this.state.SnackbarMsg}</span>}
                        action={
                                <IconButton size="small" aria-label="close" color="secondary" onClick={this.handleClose}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                        }
                    />
                    <div className="text_Div">
                        <div>
                            <TextField
                                required
                                fullWidth variant="outlined"
                                label="firstname"
                                type="text"
                                value={this.state.firstName}
                                onChange={this.handleFName} />
                        </div>
                        <div className="setMargin">
                            <TextField
                                fullWidth
                                required label="lastname"
                                variant="outlined"
                                type="text"
                                value={this.state.lastName}
                                onChange={this.handleLName} />
                        </div>
                    </div>
                    <div>
                        <TextField
                            required
                            label="email"
                            fullWidth variant="outlined"
                            type="text" value={this.state.email}
                            onChange={this.handleEmail} />
                    </div>
                    <div className="text_Div">
                        <div>
                            <TextField
                                required
                                label="password"
                                fullWidth
                                variant="outlined"
                                type="password"
                                value={this.state.password}
                                onChange={this.handlePassword} />
                        </div>
                        <div className="setMargin">
                            <TextField
                                required
                                label="Re-enter password"
                                fullWidth variant="outlined"
                                type="password"
                                value={this.state.rePassword}
                                onChange={this.handleCheckPassword} />
                        </div>

                    </div>
                    <div className="set_Button">
                        <Button id="styled_component"
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={this.validation}
                        >
                            SUBMIT
                            </Button>
                    </div>
                </Card>
            </div>
        )
    }
}
export default Registration;