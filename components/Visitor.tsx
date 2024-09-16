"use client"
import { useEffect, useState } from 'react';
import { auth } from '../actions/authenticate';

interface Response {
    status: string;
    message: string;
    user: Visitor;
    visit?: Visitor[];
    view?: View[];
}

interface Visitor {
    visitorId: string;
    visits: number;
}

interface View {
    viewId: string;
    visitorId: string;
}

// This component calls server function which returns statistics about the visitors, views and returns
// The results are displayed in the form of animated counters

export default function Visitor() {
    // Set the visitor count and error message into the state
    const [visitorCount, setVisitorCount] = useState(0);
    const [viewCount, setViewCount] = useState(0);
    const [returnCount, setReturnCount] = useState(0);
    const [error, setError] = useState<String>();

    // Call to the server function to get the visitor/view/returns count, if successful animate the counter states, if not set the error message
    const req = async () => {
        const authRequest = await auth() as any as Response;
        if (authRequest.status === "200") {
            //Animate the returning counter
            if (authRequest.user) {
                const target = authRequest.user.visits;
                const animateReturns = setInterval(() => {
                    setReturnCount((prev) => {
                        if (prev < target) {
                            return prev + 1;
                        } else {
                            clearInterval(animateReturns);
                            return prev;
                        }
                    });
                }, 50);
            }
            //Animate the visitor counter
            if (authRequest.visit) {
                const target = authRequest.visit.length;
                const animateVisits = setInterval(() => {
                    setVisitorCount((prev) => {
                        if (prev < target) {
                            return prev + 1;
                        } else {
                            clearInterval(animateVisits);
                            return prev;
                        }
                    });
                }, 100);
            }
            //Animate the views counter
            if (authRequest.view) {
                const target = authRequest.view.length;
                const animateViews = setInterval(() => {
                    setViewCount((prev) => {
                        if (prev < target) {
                            return prev + 2;
                        } else {
                            clearInterval(animateViews);
                            return prev;
                        }
                    });
                }, 50);
            }
        } else {
            setError(authRequest.message);
            console.log(authRequest.message);
        }
    };


    useEffect(() => {
        req();
    }, []);


    return (
        <div className='w-full sm:px-20 px-0 items-center mb-10 md:mt-10 mt-32'>
            {error ? <p className='text-red-400 text-xs'>{error}</p> :
                <div className="w-full flex flex-row items-center justify-between">
                    <div className='md:mx-20 mx-8 items-center justify-center flex flex-col font-bold'>
                        <p className='text-4xl text-center mb-2'>{visitorCount}</p>
                        <h2 className='text text-center'>Visitors</h2>
                    </div>
                    <div className={`md:mx-20 mx-8 items-center justify-center flex flex-col font-bold`}>
                        <p className='text-4xl text-center mb-2'>{viewCount}</p>
                        <h2 className='text text-center'>Views</h2>
                    </div>
                    <div className={`md:mx-20 mx-8 items-center justify-center flex flex-col font-bold`}>
                        <p className='text-4xl text-center mb-2'>{returnCount}</p>
                        <h2 className='text text-center'>Returns</h2>
                    </div>
                </div>}

        </div>
    )
}
