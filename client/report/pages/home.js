import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
    return (
        <div className="Landing-page bg-background-image min-h-screen flex flex-col justify-center">
            <div>
                <h1 className=' text-white font-bold text-9xl w-min mx-auto py-2'> HackGT</h1>
                <h3 className='text-white font-bold text-4xl w-min mx-auto py-2'> Someslogan </h3>
                <div className='mx-auto flex justify-center py-5'>
                    <a href="/"> 
                        <button className='bg-gray-700 text-white px-3 py-1.5 text-2xl rounded-xl '> Report </button>
                    </a>
                </div>
            </div>
        </div>
    )
}