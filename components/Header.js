import { AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';

const useStyles = makeStyles(theme => ({
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    background: 'white'
  },
  header: {
    height: '3rem'
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
          <img src="logo.png" className={classes.header} />
          {router.pathname.search(/login|signup/) === -1 && (
            <Button color="primary" onClick={logout}>logout</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
