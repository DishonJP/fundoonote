import React, { Component } from 'react'
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
    </Menu>
  )
}
export default RemMenu;