import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';

const useStyles = makeStyles(theme => ({
  flex: {
    display: 'flex',
    justifyContent: 'space-between'
  },
}));

const Header = () => {
  const classes = useStyles();
	const router = useRouter();

  const logout = () => {
    firebase.auth().signOut();
    router.push('/login');
    localStorage.removeItem('user');
  };

  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar className={classes.flex}>
          <Typography variant="h6">Greenwich Road Runner</Typography>
          {router.pathname.search(/login|signup/) === -1 && (
            <Button color="inherit" onClick={logout}>logout</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
