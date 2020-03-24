import dynamic from 'next/dynamic';
import Page from '../components/Page';

const Signup = dynamic(() => import('../components/signup').then(mod => mod.Signup), {
	ssr: false,
});

export default () => (
	<Page title="GRR - Signup">
		{() => <Signup />}
	</Page>
);
