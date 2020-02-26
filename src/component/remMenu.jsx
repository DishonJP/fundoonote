import React, { Component } from 'react'
import { GoogleComponent } from 'react-google-location'
import { Menu, MenuItem, TextField, Button } from '@material-ui/core'
class RemMenu extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Menu
        open={this.props.remOpen}
        anchorEl={this.props.remAnchorEl}
        keepMounted
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={this.props.remClose}
      >
        <MenuItem
          style={{
            backgroundColor: 'white'
          }}
        >
          <TextField
            type="datetime-local"
            value={this.props.remainder}
            onChange={(event) => {
              this.props.remDataChange(event)
            }}
            InputLabelProps={{
              shrink: false,
            }}
          />
          <Button onClick={this.props.handleRemainder}>submit</Button>
        </MenuItem>
        <MenuItem>8:00</MenuItem>
        <MenuItem>20:00</MenuItem>
        <MenuItem>2:00</MenuItem>
        <GoogleComponent
          language={'en'}
          country={'country:in|country:us'}
          coordinates={true}
          locationBoxStyle={'custom-style'}
          locationListStyle={'custom-style-list'}
          onChange={(e) => { this.setState({ place: e }) }} />
      </Menu>
    )
  }
}
export default RemMenu;