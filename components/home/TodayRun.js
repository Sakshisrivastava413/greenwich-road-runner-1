import { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';
import firebase from 'firebase/app';
import { Spinner } from '@chakra-ui/core';
import { isToday, format } from 'date-fns';
import { UserContext } from '../Page';

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

const TodayRun = () => {
	const { user } = useContext(UserContext);
	const classes = useStyles();
	const [userEntries, setUserEntries] = useState([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// get user mile entries
		firebase.firestore().collection('users').doc(user.uid).collection('mileEntry').get().then(res => {
			const entries = res.docs.map(doc => doc.data());
			const todayEntries = entries.filter(entry => isToday(new Date(entry.createdAt)));
			setUserEntries(todayEntries);
			setLoading(false);
		});
	}, []);

	const TableLoading = () => (
		<div className="flex justify-center items-center p-6">
			<Spinner m={16} />
		</div>
	);

	return (
		<div>
			{false && <div className="w-full text-center text-white bg-indigo-700 rounded text-3xl font-bold px-6 py-3">Today's Run</div>}
			<div className="w-full flex justify-around">
				{!loading ? (
					<TableContainer component={Paper} className={classes.tableContainer}>
						<Table stickyHeader className={classes.table} aria-label="miles table">
							<TableHead>
								<TableRow>
									<TableCell align="center">
										<span className="font-semibold text-lg">Time</span>
									</TableCell>
									<TableCell align="center">
										<span className="font-semibold text-lg">Route</span>
									</TableCell>
									<TableCell align="center" className="font-semibold">
										<span className="font-semibold text-lg">Mileage</span>
									</TableCell>
									<TableCell align="center" className="font-semibold">
										<span className="font-semibold text-lg">Duration</span>
									</TableCell>
									<TableCell align="center" className="font-semibold">
										<span className="font-semibold text-lg">Pace</span>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{userEntries.map((row, i) => (
									<TableRow key={i}>
										<TableCell align="center">
											<span className="">{format(new Date(row.createdAt), 'HH:mm:ss')}</span>
										</TableCell>
										<TableCell align="center">
											<span className="">{row.route}</span>
										</TableCell>
										<TableCell align="center">
											<span className="">{row.mileage}</span>
										</TableCell>
										<TableCell align="center">
											<span className="">{row.totalMin} minutes</span>
										</TableCell>
										<TableCell align="center">
											<span className="">{(row.totalMin / row.mileage).toFixed(2)}</span>
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

export default TodayRun;
