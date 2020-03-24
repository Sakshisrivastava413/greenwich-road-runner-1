import React, { useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/Link';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: 'calc(100vh - 36rem)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: 'white',
  },
}));

const Login = () => {
  const classes = useStyles();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (email === '' && password === '') {
      alert('Email or password cannot be empty!')
      return;
		}

    try {
      setLoading(true);
      await firebase.login(email, password);
      router.push('/home');
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h4" variant="h4">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={classes.wrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={submit}
            >
              {!loading ? 'Sign In' :
                <CircularProgress size={24} className={classes.buttonProgress} />}
            </Button>
          </div>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link href="/signup" as="/signup">
                <a className="text-indigo-500 underline-none">Don't have an account? Sign Up</a>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export { Login };