import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return <>
  <Head>
        <title>Web App - NextJS</title>
    </Head>
  <div className="hero min-h-screen bg-base-200">
  <div className="text-center hero-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">
            Welcome to Codegram
          </h1>
      <p className="mb-5">
      Codegram is a friendly community for programmmers/developers.
      </p>
      <button className="btn btn-primary">Get Started</button>
  </div>
  </div>
  </div> 
  </>
}