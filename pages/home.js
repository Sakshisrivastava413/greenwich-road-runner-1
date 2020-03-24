import dynamic from 'next/dynamic';

const Home = dynamic(() => import('../components/home').then(mod => mod.Home), {
	ssr: false,
});

export default () => <Home />;
