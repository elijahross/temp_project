"use client"
import getQuote from '../actions/getQuote';
import { useEffect, useState } from 'react';
import gym from '../public/Gym.jpg';
import Image from 'next/image';

interface QuoteResponse {
    status: string;
    image: string;
    message: string;
}

export default function Quote() {
    const [quote, setQuote] = useState<String>();
    const [error, setError] = useState<String>();

    // Call to the server function to get the quote, if successful set the quote, if not set the error message
    const req = async() => {
        const res = await getQuote() as QuoteResponse;
        if (res.status === "200") {
            setQuote(res.message);
        } else {setError(res.message);}}

    useEffect(() => {
        // workaround to avoid flattering due to multiple API calls
        const functionStart = setTimeout(() => {
            req();
        }, 300);
        functionStart
        return () => clearTimeout(functionStart);
    }, []);


    return (
        <div className='w-full flex md:flex-row flex flex-col items-center justify-between'>
            <div className='w-full min-h-[500px] md:max-w-[60%] max-w-max m-auto'>
                <div className='overflow-hidden items-center w-full h-[450px]'>
                    <Image src={gym} alt="quote picture" height={700} className='object-cover h-full w-auto rounded-3xl' />
                </div>
            </div>
            <div className='w-full flex flex-col md:max-w-[40%] max-w-max items-center'>
                <div className='w-full md:min-h-64 min-h-32 overflow-y-auto items-center flex justify-center text-center'>
                    <h2 className={`${quote ? "opacity-100" : "opacity-0"} transition-all duration-700 text-xl md:mb-10 mb-4`}>{quote}</h2>
                    <p className='text-red-500'>{error}</p>
                </div>
                <button type='button' className='bg-secondary text-primary font-bold rounded-lg p-2 mt-10 m-auto' onClick={() => {setQuote(undefined); req();}}>Get Quote</button>
            </div>
        </div>
    )
}
