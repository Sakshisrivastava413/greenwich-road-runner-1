import Head from 'next/head';
import dynamic from 'next/dynamic';
import firebase from 'firebase/app';
import { useRouter } from 'next/router';
import { createContext, useState, useEffect } from 'react';
import { ThemeProvider } from '@chakra-ui/core';

import 'firebase/auth';
import 'firebase/firebase-firestore';
import firebaseConfig from '../firebaseConfig';
import '../index.css';

const DynamicHeader = dynamic(() => import('./Header').then(mod => mod.default), {
	ssr: false,
});

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export const UserContext = createContext();

const Page = ({ title, ...props }) => {
	const router = useRouter();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged(async authUserRes => {
			if (authUserRes) {
				const { uid } = authUserRes;
				const userRes = await firebase.firestore().collection('users').doc(uid).get();
				const user = userRes.data();
				if (user) setUser({ ...user, uid });
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		// if (!(user && user.uid) && router.pathname.search(/login|signup/) !== -1) {
		// 	router.push('/login');
		// } else {
		// 	router.push('/home');
		// }
		let unsubscribeUserData;
		if (user && user.uid) {
			unsubscribeUserData = firebase.firestore().collection('users').doc(user.uid).onSnapshot(snapshot => {
				setUser({ ...snapshot.data(), uid: user.uid });
			});
		}
		return () => {
			if (unsubscribeUserData) unsubscribeUserData();
		};
	}, [user]);

	return (
		<div>
			<Head>
				<title>{title}</title>
			</Head>
			<ThemeProvider>
				<UserContext.Provider value={{ user }}>
					<DynamicHeader />
					<props.children />
				</UserContext.Provider>
			</ThemeProvider>
		</div>
	);
};

export default Page;
