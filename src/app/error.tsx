'use client'

import Error from "next/error";

export default function ErrorBoundary( {error}:{error:Error}){
    console.log('error',error)
    return (
        <div className="text-black font-bold text-xl flex justify-center items-center content-center place-content-center h-screen w-screen">
            500 | Server side error
           
        </div>
    )
}