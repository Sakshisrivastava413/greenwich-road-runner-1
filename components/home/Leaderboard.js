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
	tableContainer: {
		maxHeight: 380,
		width: '100%',
	},
	value: {
		textAlign: 'center',
		marginBottom: 30
	},
}));

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
			{false && <div className="w-full text-center text-white bg-indigo-700 rounded text-3xl font-bold px-6 py-3">LEADERBOARD</div>}
			<div className="w-full flex justify-around">
				{!mileLeaderboardLoading ? (
					<TableContainer component={Paper} className={classes.tableContainer}>
						<Table stickyHeader className={classes.table} aria-label="miles table">
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
						{!mileLearderboard.length && (
							<h1 className="flex font-bold justify-center items-center w-full p-4 text-2xl text-gray-600">No Data</h1>
						)}
					</TableContainer>
				) : (
					<TableLoading />
				)}
				{!routeLeaderboardLoading ? (
					<TableContainer component={Paper} className={classes.tableContainer}>
						<Table stickyHeader className={classes.table} aria-label="routes table">
							<TableHead>
								<TableRow>
									<TableCell align="center">
										<span className="font-semibold text-lg">Name</span>
									</TableCell>
									<TableCell align="center">
										<span className="font-semibold text-lg">Routes Completed</span>
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
						{!routeLearderboard.length && (
							<h1 className="flex font-bold justify-center items-center w-full p-4 text-2xl text-gray-600">No Data</h1>
						)}
					</TableContainer>
				) : (
					<TableLoading />
				)}
			</div>
		</div>
	);
}

export default Leaderboard;
