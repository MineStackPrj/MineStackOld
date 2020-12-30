import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';

// Route関連
const useStyles = makeStyles(() =>
  createStyles({
    listItem: {
      minWidth: '30px'
    }
  })
);

const ResponsiveDrawerListItem: React.FC<{
  to: string;
  onClick: any;
  icon: any;
  text: string;
}> = prop => {
  const classes = useStyles();
  return (
    <ListItem button component={Link} to={prop.to} onClick={prop.onClick}>
      <ListItemIcon className={classes.listItem}>{prop.icon}</ListItemIcon>
      <ListItemText primary={prop.text} />
    </ListItem>
  );
};

export default ResponsiveDrawerListItem;
