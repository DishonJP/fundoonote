import React from "react"
import { TextField, Button, Card } from "@material-ui/core"
import userServices from "../services/userServices";
import Snackbar from '@material-ui/core/Snackbar';
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
        if (this.state.firstName !== '' && this.state.lastName !== '') {
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
        } else {
            this.setState({
                snackbarOpen: true,
                SnackbarMsg: "plzs fill all the fields"
            })
        }
    }
    render() {
        return (
            <div className="registration_Form">
                <Card className="registration_Container">
                    <div className="login">Registration</div><br />
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        autoHideDuration={6000}
                        open={this.state.snackbarOpen}
                        message={<span id="message-id">{this.state.SnackbarMsg}</span>}
                        onClick={() => this.setState({ snackbarOpen: false })} />
                    <div className="text_Div">
                        <div id="firstname">
                            <TextField
                                required
                                label="firstname"
                                fullWidth
                                variant="outlined"
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
                    <div className="set_Button">>
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
export default Registration;