import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Registered</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
           Registered <span className={styles.blue}>appliance</span> successfully!
        </h1>

        <p className={styles.description}>
          The appliance is registered successfully.
        </p>

        <div className={styles.grid}>
          <Link href="/">
            <a className={styles.card}>
              <h2>Register another! &rarr;</h2>
              <p>Register another appliance with a project</p>
            </a>
          </Link>

          <Link href="/">
            <a className={styles.card}>
              <h2>Support &rarr;</h2>
              <p>Contact Contivo support for help with operations</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  )
}
