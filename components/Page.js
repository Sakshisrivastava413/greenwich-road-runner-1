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
	const [isLoggedIn, setLoggedIn] = useState(firebase.auth().currentUser && firebase.auth().currentUser.uid);
	const [user, setUser] = useState(null);

	useEffect(() => {
		let unsubscribeUserData;
		const unsubscribe = firebase.auth().onAuthStateChanged(async authUserRes => {
			if (authUserRes) setLoggedIn(authUserRes.uid);
			if (authUserRes) {
				const { uid } = authUserRes;
				if (uid) {
					const userRes = await firebase.firestore().collection('users').doc(uid).get();
					const user = userRes.data();
					if (user) {
						unsubscribeUserData = firebase.firestore().collection('users').doc(uid).onSnapshot(snapshot => {
							const userObj = snapshot.data();
							if (userObj) {
								setUser({ ...userObj, uid });
							}
						});
					}
				}
			}
		});

		return () => {
			if (unsubscribeUserData) unsubscribeUserData();
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (user && user.uid) {
			if (router.pathname === '/login' || router.pathname === '/signup') {
				router.push('/home');
			}
		}

		if (!isLoggedIn && router.pathname === '/home') {
			router.push('/login');
		}
	}, [isLoggedIn, user]);

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
