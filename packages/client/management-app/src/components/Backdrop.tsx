import React from 'react';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useSelector } from '@utils/ReactHooksOrigin';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color : '#fff'
    }
  })
);

export default function SimpleBackdrop(): JSX.Element {
  const classes = useStyles();
  const backdrop = useSelector(state => state.backdrop.backdrop);

  return (
    <div>
      <Backdrop className={classes.backdrop} open={backdrop.isOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
