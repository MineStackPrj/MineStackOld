/**
 * @file SideMenuSimpleItem.tsx
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */

import React from 'react';
import { useHistory } from 'react-router-dom';

import { Icon, ListItem, ListItemIcon, ListItemText, makeStyles, SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

export interface ISideMenuItemSimpleProps {

  /**
   * 遷移先のパス
   */
  routingPath: string;

  /**
   * 表示名
   */
  title: string

  /**
   * アイコンのコンポーネント
   */
  icon: OverridableComponent<SvgIconTypeMap<any, 'svg'>>;
}

const useStyles = makeStyles((theme) => ({
  ListItemPadding: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3)
    }
  }
}));

/**
 * Primary UI component for user interaction
 */
export const SideMenuSimpleItem = (props: ISideMenuItemSimpleProps): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const testId = `SideMenu${props.routingPath}`;

  return (<ListItem
    button
    selected={history.location.pathname === props.routingPath}
    className={classes.ListItemPadding}
    onClick={() => {
      history.push(props.routingPath);
    }}
    data-testid={testId}
  >
    <ListItemIcon>
      <Icon
        component={props.icon}
      />
    </ListItemIcon>
    <ListItemText primary={props.title} />
  </ListItem>);
};
