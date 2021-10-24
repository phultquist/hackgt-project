import Head from 'next/head'
import Image from 'next/image'
import SideBar from "../components/SideBar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard for managing errors" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='text-3xl font-bold'>Good Days Cafe</h1>
      <iframe src="/map/index.html" className='m-4 w-full h-4/5'></iframe>
    </>

  )
}
