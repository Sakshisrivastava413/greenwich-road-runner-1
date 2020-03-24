import firebase from 'firebase/app';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Card,
	CardContent,
	Avatar,
	Tabs,
	Tab,
	AppBar
} from '@material-ui/core';

import AddMiles from './AddMiles';
import Leaderboard from './Leaderboard';

const TabPanel = (props) => {
	const { value } = props;
	if (value == 1) return (<Leaderboard />);
	else return (<AddMiles />);
};

const useStyles = makeStyles(theme => ({
	main: {
		margin: 20
	},
	root: {
		marginTop: '6rem',
		minWidth: 275,
		height: '100%',
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	large: {
		width: '10rem',
		height: '10rem'
	},
	name: {
		fontSize: 22,
		margin: '10px 20px 0px 20px',
		fontWeight: 500
	},
	profile: {
		display: 'flex',
		wrap: 'flexWrap'
	},
	runDetail: {
		width: '100%',
		textAlign: "center"
	},
	title: {
		fontSize: 20
	},
	value: {
		color: theme.palette.primary.main,
		fontWeight: 700
	}
}));

const Home = () => {
	const classes = useStyles();
	const [current, setCurrent] = useState(0);

	const handleTabChange = () => {
		setCurrent(current ? 0 : 1);
	};

	return (
		<div className={classes.main}>
			<Card className={classes.root}>
				<CardContent>
					<div className={classes.profile}>
						<div>
							<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
						</div>
						<div className={classes.runDetail}>
							<p className={classes.title}>YTD Total: <span className={classes.value}>172 miles</span></p>
							<p className={classes.title}>Routes Completed: <span className={classes.value}>15</span></p>
						</div>
					</div>
					<p className={classes.name}>Rajeshwar Prasad Srivastava</p>

				</CardContent>
				<AppBar position="static" color="default">
					<Tabs
						value={current}
						onChange={handleTabChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
					>
						<Tab label="Add Miles" />
						<Tab label="Leaderboard" />
					</Tabs>
				</AppBar>
				<TabPanel value={current} index={0}>
					Item One
        </TabPanel>
			</Card>
		</div>
	);
}

export { Home };
