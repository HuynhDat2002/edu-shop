'use strict'
import { NextResponse } from "next/server";
import { Course } from "@/types";
import { Redis } from '@upstash/redis'
const redis = new Redis({
    url: 'https://relaxed-mastodon-16058.upstash.io',
    token: 'AT66AAIjcDEyMDMyMTUxODFmMDU0ZGQzYTlkMWJhYTQxNmMyN2QxMnAxMA',
})
export async function GET(request: Request) {
    const existingWatched: Array<Course> = await redis.get("watched")||[];
    const existingWishList: Array<Course> = await redis.get("wishList")||[];

    if (existingWatched.length===0 && existingWishList.length>0) {
        return NextResponse.json({
            suggestions: existingWishList
        })
    }
    if (existingWatched.length>0 && existingWishList.length===0) {
        return NextResponse.json({
            suggestions: existingWatched
        })
    }

    if (existingWatched.length>0 && existingWishList.length>0) {

        //find element of existingWishList without exist in existingWatched
        console.log('wish',existingWishList)
        const watchedIds = existingWatched.map(item => item.id);
        console.log('watched',watchedIds)
        const temp = existingWishList.filter(item => !watchedIds.includes(item.id))
        console.log('temp',temp)

        const result =[...existingWatched, ...temp];
        console.log(result)
        return NextResponse.json({
            suggestions: result
        })
    }
    console.log('nothing')
    const response = await fetch(`http://localhost:3000/api/courses`,{method:"GET"})
    const data = await response.json()
    const courses = data.courses
    courses.sort((a:Course,b:Course)=>b.averageRating - a.averageRating)
    const result = courses.slice(0,5)
    return NextResponse.json({
        suggestions: result
    })

}