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
	const [user, setUser] = useState(firebase.auth().currentUser);

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged(user => {
			if (user) setUser(user);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (!(user && user.uid)) {
			router.push('/login');
		} else {
			router.push('/home');
		}
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
