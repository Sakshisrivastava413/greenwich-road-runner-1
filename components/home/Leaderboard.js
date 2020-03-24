import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Grid,
	Card,
	CircularProgress
} from '@material-ui/core';
import firebase from 'firebase/app';
import { Spinner } from '@chakra-ui/core';

const firestore = firebase.firestore();

const useStyles = makeStyles(theme => ({
	table: {
		minWidth: 300,
	},
	title: {
		padding: '30px 0px 10px 30px',
		fontSize: 20,
		fontWeight: 600,
		textAlign: "center"
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.primary.main,
	},
	value: {
		textAlign: 'center',
		marginBottom: 30
	},
}));

function createData(name, miles, routes, completed) {
	return { name, miles, routes, completed };
}

const rows = [
	createData('Frozen yoghurt', 159, 'yes', 4.0),
	createData('Ice cream sandwich', 237, 'chef park', 4.3),
	createData('Eclair', 262, 'uchi road', 24),
	createData('Cupcake', 305, 'mount everest', 4.3),
	createData('Gingerbread', 356, 'tikka lal road', 3.9),
];

const Leaderboard = () => {
	const classes = useStyles();
	const [mileLearderboard, setMileLeaderboard] = useState([]);
	const [routeLearderboard, setRouteLeaderboard] = useState([]);

	const [mileLeaderboardLoading, setMileLeaderboardLoading] = useState(true);
	const [routeLeaderboardLoading, setRouteLeaderboardLoading] = useState(true);

	useEffect(() => {
		// calculate mileage of each user
		firebase.firestore().collection('mile-leaderboard').get().then(res => {
			const mileLearderboard = res.docs.map(doc => doc.data());
			const sorted = mileLearderboard.sort((e1, e2) => e1.miles > e2.miles ? -1 : 1);
			setMileLeaderboardLoading(false);
			setMileLeaderboard(sorted);
		});
		firebase.firestore().collection('route-leaderboard').get().then(res => {
			const routeLearderboard = res.docs.map(doc => doc.data());
			const sorted = routeLearderboard.sort((e1, e2) => e1.routes > e2.routes ? -1 : 1);
			setRouteLeaderboardLoading(false);
			setRouteLeaderboard(sorted);
		});
	}, []);

	const TableLoading = () => (
		<div className="flex justify-center items-center p-6">
			<Spinner m={16} />
		</div>
	);

	return (
		<div>
			<div className={classes.title}>Today's Run</div>
			<Grid container spacing={3}>
				<Grid xs>
					<div className={classes.paper}>Route</div>
					<div className={classes.value}>xs</div>

				</Grid>
				<Grid xs>
					<div className={classes.paper}>Miles</div>
					<div className={classes.value}>xs</div>
				</Grid>
				<Grid xs>
					<div className={classes.paper}>Time</div>
					<div className={classes.value}>xs</div>
				</Grid>
				<Grid xs>
					<div className={classes.paper}>Pace</div>
					<div className={classes.value}>xs</div>
				</Grid>
			</Grid>
			<div className="w-full text-center text-white bg-indigo-700 rounded text-3xl font-bold px-6 py-5">LEADERBOARD</div>
			<div className="flex justify-around items-center">
				{!mileLeaderboardLoading ? (
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="miles table">
							<TableHead>
								<TableRow>
									<TableCell align="center">
										<span className="font-semibold text-lg">Name</span>
									</TableCell>
									<TableCell align="center" className="font-semibold">
										<span className="font-semibold text-lg">Miles</span>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{mileLearderboard.map(row => (
									<TableRow key={row.name}>
										<TableCell align="center">
											<span className="">{row.name}</span>
										</TableCell>
										<TableCell align="center">
											<span className="">{row.miles}</span>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				) : (
					<TableLoading />
				)}
				{!routeLeaderboardLoading ? (
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="routes table">
							<TableHead>
								<TableRow>
									<TableCell align="center">
										<span className="font-semibold text-lg">Miles</span>
									</TableCell>
									<TableCell align="center">
										<span className="font-semibold text-lg">Miles</span>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{routeLearderboard.map(row => (
									<TableRow key={row.name}>
										<TableCell align="center">
											<span className="">{row.name}</span>
										</TableCell>
										<TableCell align="center">
											<span className="">{row.routes}</span>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				) : (
					<TableLoading />
				)}
			</div>
		</div>
	);
}

export default Leaderboard;
