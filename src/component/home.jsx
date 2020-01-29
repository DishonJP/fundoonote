import React, { Component } from 'react'
import { AppBar, Toolbar,Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    render() {
        return (
            <div className="header_decor">
                <AppBar class="appbar_decor"
                    position="fixed">
                    <Toolbar
                        color="inherit"
                    >
                        <MenuIcon/>
                    </Toolbar>
                    <Typography
                        noWrap
                        class ="appname_decor"
                    >
                        FundooNote
                    </Typography>
                    <Toolbar
                        color="inherit"
                    >
                       <AccountCircleIcon/>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
export default Home