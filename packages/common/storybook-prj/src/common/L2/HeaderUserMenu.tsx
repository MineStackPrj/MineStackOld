
/**
 * @file HeaderUserMenu.tsx
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */

import React from 'react';

import { IconButton, ListItemIcon, ListItemText, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles(() => ({
  styledMenu: {
    paper: {
      border: '1px solid #d3d4d5'
    }
  }
}));

/**
 * Primary UI component for user interaction
 */
export const HeaderUserMenu = (): JSX.Element => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical  : 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical  : 'top',
          horizontal: 'center'
        }}
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.styledMenu}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="ユーザー設定" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="ログアウト" />
        </MenuItem>
      </Menu>
    </div>
  );
};
