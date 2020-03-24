import { useEffect } from 'react';
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
	Card
} from '@material-ui/core';
import firebase from 'firebase/app';

const firestore = firebase.firestore();

const useStyles = makeStyles(theme => ({
	table: {
		minWidth: 650,
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
	tableTitle: {
		textAlign: "center",
		fontSize: 30,
		fontWeight: 700,
		background: theme.palette.primary.main,
		color: 'white'
	},
	tablehead: {
		fontWeight: 600
	}
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

	useEffect(() => {
		// calculate mileage of each user
		firestore.collection('users').get().then(response => {
			// const users = response.docs.map(doc => doc.data());
			console.log(response.docs.map(doc => doc.data()));
		});
	}, []);

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
			<Card className={classes.tableTitle}>LEADERBOARD</Card>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell className={classes.tablehead}>Name</TableCell>
							<TableCell align="right" className={classes.tablehead}>Miles YTD</TableCell>
							<TableCell align="right" className={classes.tablehead}>Routes</TableCell>
							<TableCell align="right" className={classes.tablehead}>Completed</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map(row => (
							<TableRow key={row.name}>
								<TableCell>
									{row.name}
								</TableCell>
								<TableCell align="right">{row.miles}</TableCell>
								<TableCell align="right">{row.routes}</TableCell>
								<TableCell align="right">{row.completed}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

export default Leaderboard;
