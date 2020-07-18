import React from "react";
import { IconButton } from '@material-ui/core';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import ViewListIcon from '@material-ui/icons/ViewList';

const IconChange = (props) => {
    return (
        <IconButton
            id="icon_butSize"
            onClick={props.change}>
            {(this.props.data) ? <ViewCompactIcon id="font_sizeicon"
                fontSize="medium"
            /> :
                <ViewListIcon id="font_sizeicon"
                    fontSize="medium"
                />
            }
        </IconButton>
    )
}
export default IconChange