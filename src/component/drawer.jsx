import React, { Component } from 'react'
import { Drawer, Divider, IconButton ,MuiThemeProvider,createMuiTheme} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                width: "200px"
            }
        },
       
    }
}
)
class Drawers extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                
                    <Drawer
                        class="drawer_decor"
                        variant="persistent"
                        anchor="left"
                        open={this.props.change}
                > 
                    <div className="drawer_head">
                    <div className="name_decor">
                        <span>DishonJP</span>
                    </div>
                    <div className="arrow_decor">
                        <IconButton
                            onClick={this.props.value}
                        >
                            <ArrowBackIcon/>
                        </IconButton>
                        </div>
                        </div>
                        <Divider/> 
                    </Drawer>
                    </MuiThemeProvider>
        )
    }
}
export default Drawers