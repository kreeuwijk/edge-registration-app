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
          <Link href="/" className={styles.card}>
            <h2>Register another! &rarr;</h2>
            <p>Register another appliance with a project</p>
          </Link>

          <Link href="/" className={styles.card}>
            <h2>Support &rarr;</h2>
            <p>Contact Contivo support for help with operations</p>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
