import Head from 'next/head';
import firebase from 'firebase/app';
import { useRouter } from 'next/router';
import { createContext, useState, useEffect } from 'react';

import 'firebase/auth';
import 'firebase/firebase-firestore';
import firebaseConfig from '../firebaseConfig';
import Header from './Header';

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const UserContext = createContext();

const Page = ({ title, children }) => {
	const router = useRouter();
	const [user, setUser] = useState();

	firebase.auth().onAuthStateChanged(user => {
		setUser(user);
	});

	useEffect(() => {
		if (user && user.uid) {
			router.push('/home');
		} else {
			router.push('/login');
		}
	}, [user]);

	return (
		<div>
			<Head>
				<title>{title}</title>
			</Head>
			<UserContext.Provider value={{ user }}>
				<Header />
				<children />
			</UserContext.Provider>
		</div>
	);
};

export default Page;
