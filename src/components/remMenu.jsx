import React, { Component } from 'react'
import { GoogleComponent } from 'react-google-location'
import { Menu, MenuItem, TextField, Button } from '@material-ui/core'

const RemMenu = (props) => {
  return (
    <Menu
      open={props.remOpen}
      anchorEl={props.remAnchorEl}
      keepMounted
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      onClose={props.remClose}
    >
      <MenuItem
        style={{
          backgroundColor: 'white'
        }}
      >
        <TextField
          type="datetime-local"
          value={props.remainder}
          onChange={(event) => {
            props.remDataChange(event)
          }}
          InputLabelProps={{
            shrink: false,
          }}
        />
        <Button onClick={props.handleRemainder}>submit</Button>
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
export default RemMenu;