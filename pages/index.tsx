import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return <>
  <Head><title>Web App - NextJS</title></Head>
  <div className={styles.wrapper}>
  <div className={styles.head}>
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">
            Welcome to Codegram
          </h1>
      <p className="mb-5">
        Codegram is a friendly community for programmmers/developers.
      </p>
      <Link href="/auth/"><a className="btn btn-primary" >Get Started</a></Link>
  </div>
  </div>
  </div> 
  </>
}