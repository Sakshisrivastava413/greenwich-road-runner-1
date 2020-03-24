import { useState } from 'react';
import { Container, Fab, Typography, Grid, CircularProgress, TextField, Button } from '@material-ui/core';
import Link from 'next/Link';
import { useRouter } from 'next/router';
import { AddAPhoto } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase/app';

const useStyles = makeStyles((theme) => ({
  upload: {
    height: 90,
    width: 90,
    marginTop: theme.spacing(3),
  },
  camera: {
    fontSize: 40
  },
  paper: {
    marginTop: 'calc(100vh - 40rem)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    color: 'white',
  },
}));

const firestore = firebase.firestore();

const Signup = () => {
  const router = useRouter();
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !phone) {
      alert("Please fill all the fields");
      return;
    }
    setLoading(true);
    try {
      const user = { firstName, lastName, email, phone };
      const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firestore.collection('users').doc(res.user.uid).set(user);
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
          Sign up
        </Typography>
        <Fab color="primary" aria-label="add" className={classes.upload}>
          <AddAPhoto className={classes.camera} />
        </Fab>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Phone Number"
                label="Phone Number"
                type="number"
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submit}
          >
            {!loading ? 'Sign Up' :
              <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
							<Link href="/login" as="/login">
                <a className="text-indigo-500 underline-none">Already have an account? Sign in</a>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export { Signup };