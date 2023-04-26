import Head from 'next/head';
import Link from "next/link";
import Navbar from  '@/components/navbar';
import Bank from '@/components/bank';

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
        <Navbar/>
        <Bank/>
      </section>
    </>
  )
}