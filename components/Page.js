import Head from 'next/head';
import dynamic from 'next/dynamic';
import firebase from 'firebase/app';
import { useRouter } from 'next/router';
import { createContext, useState, useEffect } from 'react';

import 'firebase/auth';
import 'firebase/firebase-firestore';
import firebaseConfig from '../firebaseConfig';
import '../index.css';

const DynamicHeader = dynamic(() => import('./Header').then(mod => mod.default), {
	ssr: false,
});

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const UserContext = createContext();

const Page = ({ title, ...props }) => {
	const router = useRouter();
	const [user, setUser] = useState();

	firebase.auth().onAuthStateChanged(user => {
		setUser(user);
	});

	useEffect(() => {
		if (router.pathname.search(/login|signup/) === -1) {
			if (!user || !user.uid) {
				router.push('/login');
			}
		}
	}, [user]);

	return (
		<div>
			<Head>
				<title>{title}</title>
			</Head>
			<UserContext.Provider value={{ user }}>
				<DynamicHeader />
				<props.children />
			</UserContext.Provider>
		</div>
	);
};

export default Page;
