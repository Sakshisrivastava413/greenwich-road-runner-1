import { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Card,
	CardContent,
	Tabs,
	Tab,
	AppBar
} from '@material-ui/core';
import { Avatar, Spinner } from '@chakra-ui/core';

import { UserContext } from '../Page';
import AddMiles from './AddMiles';
import Leaderboard from './Leaderboard';

const TabPanel = (props) => {
	const { value } = props;
	if (value === 1) return <Leaderboard />;
	else return <AddMiles />;
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
	pos: {
		marginBottom: 12,
	},
	large: {
		width: '10rem',
		height: '10rem'
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
	const { user } = useContext(UserContext);
	const classes = useStyles();
	const [current, setCurrent] = useState(0);

	const handleTabChange = (event, newValue) => setCurrent(newValue);

	if (!user) return (
		<div className="h-screen flex justify-center items-center">
			<Spinner size="lg" color="blue.500" />
		</div>
	);

	return (
		<div className={classes.main}>
			<Card className={classes.root}>
				<CardContent>
					<div className="flex justify-between">
						<div className="flex flex-col items-center justify-center mx-6">
							<Avatar size="2xl" src={user.photoUrl} name={user.firstName + user.lastName} />
							<p className="text-2xl font-semibold my-4">{`${user.firstName} ${user.lastName}`}</p>
						</div>
						<div className="flex flex-col self-end p-6">
							<p className="text-2xl">YTD Total: <span className={classes.value}>172 miles</span></p>
							<p className="text-2xl">Routes Completed: <span className={classes.value}>15</span></p>
						</div>
					</div>

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
