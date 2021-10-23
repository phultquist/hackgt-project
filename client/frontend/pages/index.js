import Head from 'next/head'
import Image from 'next/image'
// import '../styles/HomePage.css'

export default function Home() {
  return (
    <div className="Landing-page bg-background-image min-h-screen flex flex-col justify-center">
      {/* <div class="w-screen h-screen justify-center items-center"> */}
      <div>
        <h1 className=' text-white font-bold text-9xl w-min mx-auto py-2'> HackGT</h1>
        <h3 className='text-white font-bold text-4xl w-min mx-auto py-2'> Someslogan </h3>
        <div className='mx-auto flex justify-center py-5'>
          <button className='bg-gray-700 text-white px-3 py-1.5 text-2xl rounded-xl '> Report </button>
        </div>
      </div>
    </div>
  )
}


