import dynamic from 'next/dynamic';

const Login = dynamic(() => import('../components/login').then(mod => mod.Login), {
	ssr: false,
});

export default () => <Login />;
