import { useState, useEffect, useContext } from 'react';
import CreatableSelect from 'react-select/creatable';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField } from '@material-ui/core';
import { useToast, Spinner } from '@chakra-ui/core';
import TimeField from 'react-simple-timefield';
import firebase from 'firebase/app';
import { UserContext } from '../Page';

const firestore = firebase.firestore();

const useStyles = makeStyles({
	container: {
		padding: 30,
	},
	button: {
		textAlign: "center",
		marginBottom: 30
	},
	title: {
		fontSize: 18,
		fontWeight: 500
	},
});

const getTotalMin = (time) => {
	const [hours, mins, secs] = time.split(':').map(Number);
	const totalMin = (hours * 60) + mins + (secs / 60);
	return totalMin;
}

const AddMiles = () => {
	const toast = useToast();
	const classes = useStyles();
	const { user } = useContext(UserContext);
	const [selectedRoute, setSelectedRoute] = useState();
	const [mileage, setMileage] = useState('');
	const [time, setTime] = useState('00:00:00');
	const [pace, setPace] = useState('');
	const [predefinedRoutes, setPredefinedRoutes] = useState([]);
	const [loading, setLoading] = useState(false);

	const submit = async () => {
		const totalMin = getTotalMin(time);
		const route = selectedRoute.value;
		setLoading(true);
		const found = predefinedRoutes.some(route => route.value === selectedRoute.value);
		if (!found) {
			firestore.collection('app_settings').doc('routes').get().then(res => {
				const data = res.data();
				data.defined.push({ name: selectedRoute.value });
				firestore.collection('app_settings').doc('routes').set({ defined: data.defined });
			});
		}
		firestore.collection(`users`).doc(user.uid).collection('mileEntry').add({
			pace,
			route,
			mileage,
			totalMin,
		}).then(async () => {
			await firestore.collection('mile-leaderboard').doc(user.uid).set({
				miles: Number(user.totalMiles || 0) + Number(mileage),
				name: `${user.firstName} ${user.lastName}`,
			});
			await firestore.collection('route-leaderboard').doc(user.uid).set({
				routes: Number(user.totalRoutes || 0) + 1,
				name: `${user.firstName} ${user.lastName}`,
			});
			await firestore.collection('users').doc(user.uid).update({
				totalMiles: Number(user.totalMiles || 0) + Number(mileage),
				totalRoutes: Number(user.totalRoutes || 0) + 1,
			});
			toast({
				title: 'Success',
				description: 'Mile Entry done.',
				isClosable: true,
				position: 'top-right',
				status: 'success',
			});
			setPace('');
			setMileage('');
			setTime('00:00:00');
			setSelectedRoute(null);
		}).catch((error) => {
			toast({
				title: 'Error',
				description: 'Something went wrong!',
				isClosable: true,
				position: 'top-right',
				status: 'error',
			});
		}).finally(() => setLoading(false));
	};

	useEffect(() => {
		firestore.collection('app_settings').doc('routes').get().then(doc => {
			const routes = doc.data().defined;
			setPredefinedRoutes(routes.map(route => ({ label: route.name, value: route.name, ...route })));
		});
	}, []);

	const handleRouteChange = (selectedRoute) => {
		setSelectedRoute(selectedRoute);
		setMileage('');
	};

	useEffect(() => {
		if (selectedRoute && selectedRoute.mileage) setMileage(selectedRoute.mileage);
	}, [selectedRoute]);

	useEffect(() => {
		const totalMin = getTotalMin(time);
		if (mileage && totalMin > 0) {
			setPace((totalMin / mileage).toFixed(2));
		}
	}, [mileage, time]);

	return (
		<React.Fragment>
			<div className={classes.container}>
				<Grid container spacing={3} wrap>
					<Grid item xs={12} sm={6}>
						<p className="text-lg font-semibold mb-2">Route</p>
						<CreatableSelect
							onChange={handleRouteChange}
							value={selectedRoute}
							options={predefinedRoutes}
							styles={{ menu: base => ({ ...base, position: 'relative' }) }}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<p className="text-lg font-semibold mb-2">Mileage</p>
						<TextField
							variant="outlined"
							size="small"
							type="number"
							className={`w-full ${selectedRoute && selectedRoute.mileage && 'bg-gray-200'}`}
							value={mileage}
							disabled={!!(selectedRoute && selectedRoute.mileage)}
							onChange={event => setMileage(event.target.value)}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={3} wrap>
					<Grid item xs={12} sm={6}>
						<p className="text-lg font-semibold mb-2">Time</p>
						<TimeField
							colon=":"
							showSeconds
							value={time}
							className="w-full"
							onChange={event => setTime(event.target.value)}
							input={<TextField value={time} variant="outlined" size="small" />}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<p className="text-lg font-semibold mb-2">Pace</p>
						<TextField
							variant="outlined"
							size="small"
							value={pace}
							disabled={true}
							className="w-full bg-gray-200"
						/>
					</Grid>
				</Grid>
			</div>
			<div className={classes.button}>
				<Button
					variant="contained"
					color="primary"
					onClick={submit}
					disabled={!pace || !selectedRoute}
				>
					Submit Miles
					{loading && <Spinner ml="4" color="white" />}
        </Button>
			</div>
		</React.Fragment>
	)
}

export default AddMiles;
