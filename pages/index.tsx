import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return <>
    <Head>
        <title>Web App - NextJS</title>
    </Head>
    <main className={styles.container}>
      <h1 className={styles.head}>Codegram</h1>
      <p className={styles.comment}>Code gram is a community for programmer/developers.</p>
      <button>Join Us</button>
    </main>
  </>
}