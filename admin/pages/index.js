import Head from 'next/head'
import Image from 'next/image'
import SideBar from "../components/SideBar";

export default function Home({ problemHistory }) {
  const problemString = JSON.stringify(problemHistory);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard for managing errors" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='text-3xl font-bold mb-4'>Reports</h1>
      <p>Select a point to view more information</p>
      <iframe src={`/map/index.html?data=${problemString}`} className='m-4 w-full h-4/5'></iframe>
    </>

  )
}

export async function getServerSideProps() {
  const problemHistoryRes = await fetch(`${process.env.SERVER_HOST}/history`);
  const problemHistory = await problemHistoryRes.json();

  return {
    props: {
      problemHistory
    }
  }
}