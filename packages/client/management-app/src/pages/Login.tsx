import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Auth from '@actions/Auth';
import FooterCopyright from '@components/FooterCopyright';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert';
import { setUser } from '@reducers/UserAuthInfoReducers';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop    : theme.spacing(8),
    display      : 'flex',
    flexDirection: 'column',
    alignItems   : 'center'
  },
  avatar: {
    margin         : theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width    : '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  buttonProgress: {
    color     : green[500],
    position  : 'absolute',
    top       : '50%',
    left      : '50%',
    marginTop : -12,
    marginLeft: -12
  },
  alert: {
    marginTop   : 0,
    marginBottom: 10
  },
  wrapper: {
    margin  : theme.spacing(1),
    position: 'relative'
  }
}));

type FormData = {
  userId: string;
  password: string;
};

export default function LogIn(): JSX.Element {
  // CSSHooks
  const classes = useStyles();
  // FormHooks フォームを制御するためのHooks関数
  const { register, handleSubmit, errors } = useForm<FormData>();
  // ブラウザの履歴に介入するためのHooks 画面遷移に用いる
  const history = useHistory();
  // Reduxと接続するためのHooks
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);
  const [isError, setError] = React.useState(false);

  const onSubmit: SubmitHandler<FormData> = async event => {
    // User認証
    setLoading(true);
    setError(false);
    try {
      const user = await Auth(event.userId, event.password);
      await dispatch(setUser(user));
      history.push('/dashboard');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="User ID"
            name="userId"
            autoFocus
            inputRef={register({ required: true })}
            helperText={errors.userId && '必須項目です'}
            error={Boolean(errors.userId)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register({ required: true })}
            helperText={errors.password && '必須項目です'}
            error={Boolean(errors.password)}
          />
          <div className={classes.wrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              Log In
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
          {isError && (
            <Alert severity="error" className={classes.alert}>
              パスワードまたはユーザー名が間違っています
            </Alert>
          )}

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                パスワードを忘れましたか?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <FooterCopyright />
      </Box>
    </Container>
  );
}
