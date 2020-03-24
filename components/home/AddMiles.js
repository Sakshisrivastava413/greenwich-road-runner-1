import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button, TextField } from '@material-ui/core';
import TimeField from 'react-simple-timefield';

const routeOptions = [
	{ value: 'blues', label: 'Your Miles' },
	{ value: 'rock', label: 'Tack Miles' },
	{ value: 'jazz', label: 'Mianus Your Miles' },
	{ value: 'orchestra', label: 'Your Miles Rock State Park' },
	{ value: 'orchestra', label: 'Your Miles NYC Central Park' },
	{ value: 'orchestra', label: "Your Miles Tod's Point" },
	{ value: 'orchestra', label: 'William K' },
	{ value: 'orchestra', label: "Randy's Note" },
	{ value: 'orchestra', label: "Ric's Warm Up" },
	{ value: 'orchestra', label: "Lost & Found" },
	{ value: 'orchestra', label: "Tod's Loop" },
];

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

const AddMiles = () => {
	const classes = useStyles();
	const [time, setTime] = useState('00:00:00');
	const [route, setRoute] = useState(routeOptions[0]);
	const [mileage, setMileage] = useState('');
	const [pace, setPace] = useState('');

	const submit = () => {
		console.log(time, route, mileage, pace);
	};

	const handleChange = (e) => {
		setRoute(e);
	}

	return (
		<React.Fragment>
			<div className={classes.container}>
				<Grid container spacing={3} wrap>
					<Grid item xs={12} sm={6}>
						<p className={classes.title}>Route</p>
						<CreatableSelect
							defaultValue={routeOptions[0]}
							onChange={handleChange}
							onInputChange={handleChange}
							options={routeOptions}
							styles={{ menu: base => ({ ...base, position: 'relative' }) }}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<p className={classes.title}>Mileage</p>
						<TextField variant="outlined" size="small" style={{ width: '100%' }} onChange={(e) => setMileage(e.target.value)} />
					</Grid>
				</Grid>
				<Grid container spacing={3} wrap>
					<Grid item xs={12} sm={6}>
						<p className={classes.title}>Time</p>
						<TimeField
							value={time}                     // {String}   required, format '00:00' or '00:00:00'
							onChange={(value) => setTime(value)}      // {Function} required
							style={{
								width: '100%'
							}}
							input={<TextField value={time} variant="outlined" size="small" />} // {Element}  default: <input type="text" />
							colon=":"                        // {String}   default: ":"
							showSeconds                      // {Boolean}  default: false
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<p className={classes.title}>Pace</p>
						<TextField variant="outlined" size="small" style={{ width: '100%' }} onChange={(e) => setPace(e.target.value)} />
					</Grid>
				</Grid>
			</div>
			<div className={classes.button}>
				<Button variant="contained" color="primary" onClick={submit}>
					Submit Miles
        </Button>
			</div>
		</React.Fragment>
	)
}

export default AddMiles;
