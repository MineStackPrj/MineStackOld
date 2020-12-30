import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AddCircle, Home } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';

import RoutingURIDefine from '../define/RoutingUri';
import SimpleBackdrop from './Backdrop';
import ResponsiveDrawerListItem from './ResponsiveDrawerListItem';

const drawerWidth = 200;
// 設定値
const headerNavigationHeight = 30;
const bottomNavigationHeight = 30;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width     : drawerWidth,
        flexShrink: 0
      }
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width     : `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
      }
    },
    title: {
      flexGrow : 1,
      textAlign: 'left'
    },
    menuButton: {
      marginRight                 : theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none'
      }
    },
    // necessary for content to be below app bar
    toolbar    : theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow     : 1,
      padding      : theme.spacing(3),
      paddingTop   : `calc(20px + ${headerNavigationHeight}px)`,
      paddingBottom: `calc(10px + ${bottomNavigationHeight}px)`
      // paddingLeft: 0,
      // paddingRight: 0
    },
    headerLogo: {
      display: 'flex',
      height : 48
    }
  })
);

interface IProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: any;
}

export default function ResponsiveDrawer(props: IProps): JSX.Element {
  const { window, children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const closeDrawerNav = (): void => {
    setMobileOpen(false);
  };

  const drawer = (
    <div>
      <List>
        <ResponsiveDrawerListItem to="/info" onClick={closeDrawerNav} icon={<Home />} text="MineStackとは" />
      </List>
      <Divider />
      <List>
        <ResponsiveDrawerListItem
          to={`/${RoutingURIDefine.createServer}`}
          onClick={closeDrawerNav}
          icon={<AddCircle />}
          text="サーバー新規作成"
        />
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            MineStack
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>{children}</main>
      <SimpleBackdrop />
    </div>
  );
}
