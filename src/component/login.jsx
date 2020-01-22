import React from "react"
import { TextField, Card } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import userServices from "../services/userServices";
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
    validation = () => {
        const data = {
            email: this.state.email,
            password: this.state.password
        }
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
                    SnackbarMsg: "Invalid e-mail / password"
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        return (

            <div className="login_Form">
                <Card className="login_Container">
                    <div className="login">Login</div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        autoHideDuration={6000}
                        open={this.state.snackbarOpen}
                        message={<span id="message-id">{this.state.SnackbarMsg}</span>}
                        onClick={() => this.setState({ snackbarOpen: false })} />
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
                        <Button
                            type="submit"
                            variant="outlined"
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