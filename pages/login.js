import dynamic from 'next/dynamic';
import Page from '../components/Page';

const Login = dynamic(() => import('../components/login').then(mod => mod.Login), {
	ssr: false,
});

export default () => (
	<Page title="GRR - Login">
		{() => <Login />}
	</Page>
);
