import React, { Component } from "react";
import { IconButton} from '@material-ui/core';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import ViewListIcon from '@material-ui/icons/ViewList';
export default class IconChange extends Component{
    constructor(props) {
        super(props);
    }
    render() {
            return (
                <IconButton onClick={this.props.change}>
                    {(this.props.data)?<ViewCompactIcon
                        fontSize="medium"
                    />:
                    <ViewListIcon
                        fontSize="medium"
                    />
                    }
                </IconButton>
            )
}
}