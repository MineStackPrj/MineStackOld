/**
 * @file Header.tsx
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */

import React from 'react';

import { AppBar, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { HeaderUserMenu } from './HeaderUserMenu';

export interface IHeaderProps {
  isSignIn: boolean
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

/**
 * Primary UI component for user interaction
 */
export const Header = (props: IHeaderProps): JSX.Element => {
  const classes = useStyles();

  return <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        { props.isSignIn && (
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" className={classes.title}>
        Minestack
        </Typography>
        {props.isSignIn && <HeaderUserMenu />}
      </Toolbar>
    </AppBar>
  </div>;
};
