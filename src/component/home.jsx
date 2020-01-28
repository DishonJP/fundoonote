import React from 'react'
import { Typography, IconButton, AppBar, Toolbar, MenuList, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            variant="h4"
                            noWrap
                        >
                            FundooNote
          </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
export default Home 