import React from "react"
import { TextField, Card , IconButton} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import userServices from "../services/userServices";
import CloseIcon from '@material-ui/icons/Close';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            SnackbarMsg: '',
            snackbarOpen: false,
        };
    }
    handleEmail = event => {
        this.setState({ email: event.target.value })
    }
    handlePassword = event => {
        this.setState({ password: event.target.value })
    }
    handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            snackbarOpen: false
        })
    };
    validation = () => {
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        if (this.state.email !== '') {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
                if (this.state.password !== '') {
                    userServices.userLogin(data).then(res => {
                        console.log("Hello", res);
                        if (res.user) {
                            this.setState({
                                snackbarOpen: true,
                                SnackbarMsg: "Login Successful"
                            })
                        }
                        else {
                            this.setState({
                                snackbarOpen: true,
                                SnackbarMsg: "Login Unsuccessful invalid e-mail / password"
                            })
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    this.setState({
                        snackbarOpen: true,
                        SnackbarMsg: "Enter your password"
                    })
                }
            } else {
                this.setState({
                    snackbarOpen: true,
                    SnackbarMsg: "Invalid Email"
                })
            }
        }else{ 
            this.setState({
                snackbarOpen: true,
                SnackbarMsg: "Enter your Email"
            })
        }
    }
    render() {
        return (

            <div className="login_Form">
                <Card class="login_Container">
                    <span className="app_name"><span className="f">F</span>
                    <span className="f">u</span>
                    <span className="f">n</span>
                    <span className="f">d</span>
                    <span className="o">o</span>
                    <span className="o">o</span>
                    <span className="f">N</span>
                    <span className="f">o</span>
                    <span className="f">t</span>
                    <span className="f">e</span></span>
                    <div className="login">Login</div>
                    <Snackbar id="snackbar_color"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        autoHideDuration={3000}
                        open={this.state.snackbarOpen}
                        message={<span id="message-id">{this.state.SnackbarMsg}</span>}
                        action={
                            <React.Fragment>
                                <IconButton size="small" aria-label="close" color="secondary" onClick={this.handleClose}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </React.Fragment>
                        } />
                   
                        <div className="set_Div">
                            <TextField
                                required
                                variant="outlined"
                                label="email"
                                type="text"
                                value={this.state.email}
                                onChange={this.handleEmail} />
                        </div>
                        <div className="set_Div">
                            <TextField
                                required
                                variant="outlined"
                                label="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.handlePassword} />
                        </div>
                    <div className="set_Button">
                        <Button id="styled_component"
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={this.validation}>
                            SUBMIT
                            </Button>
                    </div>
                </Card>
            </div>
        )
    }
}
export default Login