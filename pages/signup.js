import dynamic from 'next/dynamic';

const Signup = dynamic(() => import('../components/signup').then(mod => mod.Signup), {
	ssr: false,
});

export default () => <Signup />;
