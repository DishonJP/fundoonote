import React from 'react'
import { Typography, IconButton, AppBar, Toolbar, MenuList, MenuItem, CssBaseline, makeStyles, useTheme } from '@material-ui/core'
import { MenuIcon, ExitToAppIcon } from '@material-ui/icons/Menu'
import clsx from 'clsx';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerWidth: 240,

        }
    }

    useStyles = makeStyles(theme => ({

        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${this.state.drawerWidth}px)`,
            marginLeft: this.state.drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: this.state.drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: this.state.drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -this.state.drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
    }));

    render() {
        return (
            <div>
                <div><span>Hello</span></div>
                <AppBar
                    position="fixed"
                    className={clsx(this.classes.appBar, {
                        // [this.classes.appBarShift]: open,
                    })}       >
                    <Toolbar class="toolbar_decor">
                        <IconButton id="menuIcon"
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                        // className={clsx(this.classes.menuButton, open && this.classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h4" noWrap>
                            FundooNote
          </Typography>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            button
                        >
                            <ExitToAppIcon id="exit_icon" />
                        </IconButton>
                        
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
export default Home 