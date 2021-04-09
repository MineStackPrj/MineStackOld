/**
 * @file ErrorMessage.tsx
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */

import React from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import { ErrorOutline } from '@material-ui/icons';

export interface IErrorMessageProps {
  message: string;

  className?: string;
  dataTestId?: string;
}

const useStyles = makeStyles({
  root: {
    flexDirection: 'row',
    display      : 'flex'
  },
  errorMessage: {
    marginLeft: 5
  }
});

const ErrorMessage = (props: IErrorMessageProps): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.root + ' ' + props.className} data-testid={props.dataTestId}>
      <ErrorOutline color="secondary" />
      <Typography color="secondary" className={classes.errorMessage}>
        {props.message}
      </Typography>
    </div>
  );
};
export default ErrorMessage;
