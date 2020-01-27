import React from 'react';
import { TextField, Button, Card } from '@material-ui/core';
class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            re_password: ''
        }
    }
    handleOnChange = (e) => {
        this.setState(
            this.state.email = e
)
    }
    render() {
        return (
            <div>
                <Card>
                    <div><span>Forget Password</span></div>
                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        label="E-Mail"
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleOnChange}
                    />
                </Card>

            </div>
        );
    }
}
export default ForgetPassword