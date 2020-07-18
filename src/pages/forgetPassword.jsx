import React from 'react';
import { TextField, Button, Card, IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import userServices from '../services/userServices'
class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            snackbarMsg: '',
            snackbarOpen: false
        }
    }
    handleOnChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    validation = () => {
        if (this.state.email !== '') {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
                const data = {
                    email: this.state.email,
                    password: this.state.password
                }
                userServices.emailVerify(data).then(res => {
                    if (res === undefined) {
                        this.setState({
                            snackbarOpen: true,
                            snackbarMsg: "Check your E-Mail"
                        })
                        setTimeout(() => {
                            this.props.history.push("/login");
                        }, 2000);
                        return;
                    }
                    else {
                        this.setState({
                            snackbarOpen: true,
                            snackbarMsg: "Invalid Email-ID"
                        })
                    }

                }).catch(err => {
                    this.setState({
                        snackbarOpen: true,
                        snackbarMsg: err
                    })
                }
                );

            } else {
                this.setState(
                    {
                        snackbarOpen: true,
                        snackbarMsg: "Invalid E-mail"
                    }
                )
            }
        } else {
            this.setState(
                {
                    snackbarOpen: true,
                    snackbarMsg: "Enter Your E-Mail"
                }
            )
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
            <div className="card_position">
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    autoHideDuration={3000}
                    open={this.state.snackbarOpen}
                    message={<span id="message-id">{this.state.snackbarMsg}</span>}
                    action={
                        <IconButton size="small" aria-label="close" color="secondary" onClick={this.handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                />
                <Card id="card_decor">
                    <div className="name_decor"><span>Forget Password</span></div>

                    <TextField id="email_space"
                        required
                        fullWidth
                        variant="outlined"
                        label="E-Mail"
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleOnChange}
                    />
                    <Button id="button_space"
                        variant="contained"
                        color="primary"
                        onClick={this.validation}
                    >
                        Submit
                    </Button>
                </Card>
            </div>
        );
    }
}
export default ForgetPassword