import React, { Component } from "react";
import { IconButton} from '@material-ui/core';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import ViewListIcon from '@material-ui/icons/ViewList';
export default class IconChange extends Component{
    render() {
            return (
                <IconButton
                id="icon_butSize"
                    onClick={this.props.change}>
                    {(this.props.data)?<ViewCompactIcon id="font_sizeicon"
                        fontSize="medium"
                    />:
                    <ViewListIcon id="font_sizeicon"
                        fontSize="medium"
                    />
                    }
                </IconButton>
            )
}
}