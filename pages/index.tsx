import Head from 'next/head';
import Link from "next/link";
import Navbar from  '@/components/navbar';
import Bank from '@/components/bank';
import styles from '@/styles/style';

export default function Home() {
  return (
    <>
    <Head>
        <title>Ophir Institute</title>
        <meta name="description" content="Taking over the World of Finance" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <section id='bank'>
        <div className='bg-purple-800 w-full overflow-hidden'>
          <div className={`bg-black ${styles.paddingX}`}>
            <div className={`${styles.boxWidth}`}>
              <Navbar/>
            </div>
          </div>
          <div className={`${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Bank/>
          </div>
          </div>
        </div>
      </section>
    </>
  )
}