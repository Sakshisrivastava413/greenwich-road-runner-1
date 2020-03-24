import Head from 'next/head'
import { CircularProgress } from '@material-ui/core';
import '../index.css';

const Home = () => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <div className="h-screen bg-gray-500">
        Hello
        <CircularProgress thickness={10} />
      </div>
    </main>
  </div>
)

export default Home
