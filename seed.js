const csv_to_json = require('csvtojson');
const admin = require('firebase-admin');

const serviceAccount = require('./admin-credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://greenwich-road-runner.firebaseio.com'
});

const firestore = admin.firestore();
const route_collection = firestore.collection('app_settings').doc('routes');

csv_to_json({
	colParser: {
		'Route Milage': item => {
			const numericalPart = Number(item.split(' miles')[0]);
			return isNaN(numericalPart) ? '' : numericalPart;
		}
	},
}).fromFile('./routes.csv').then(json => {
	route_collection.get().then(res => {
		const data = res.data();
		const defined = (data.defined || []).concat([
			...json.map(row => ({
				name: row['Route Name'],
				mileage: row['Route Milage'],
			})
		)]);
		route_collection.set({ defined }).then(() => {
			console.log('Done.');
		});
	});
});