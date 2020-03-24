import dynamic from 'next/dynamic';
import Page from '../components/Page';

const Home = dynamic(() => import('../components/home').then(mod => mod.Home), {
	ssr: false,
});

export default () => (
	<Page title="home">
		<Home />
	</Page>
);
