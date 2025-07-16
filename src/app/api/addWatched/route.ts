'use strict'
import { NextRequest, NextResponse } from "next/server";
import { Course } from "@/types";
import { Redis } from '@upstash/redis'
const redis = new Redis({
    url: 'https://relaxed-mastodon-16058.upstash.io',
    token: 'AT66AAIjcDEyMDMyMTUxODFmMDU0ZGQzYTlkMWJhYTQxNmMyN2QxMnAxMA',
})
export async function POST(req: NextRequest) {
   const { id } = await req.json()
    const response = await fetch(`http://localhost:3000/api/course/${id}`,{method:"GET"})
    const data = await response.json()

    if (data?.status === 404)
        return NextResponse.json({
            message: "Không tìm thấy khoá học",
            status: 404
        })

    const course = data.course

    let watched: Array<any> = []
    const existingWatched: Array<any> | null = await redis.get("watched");
    console.log('exist',existingWatched)
    if (existingWatched) {
        console.log('already has watched')
        watched = existingWatched
        console.log('watched', watched)

        const found = watched.find((w) => w.id === id)
        if (found) {
            watched.splice(watched.indexOf(found), 1)
            watched.unshift(course)
            console.log('watchedtt', watched)
            await redis.set("watched", JSON.stringify(watched))
        }
        else {
            watched.unshift(course)
            console.log('watchedtt', watched)
            await redis.set("watched", JSON.stringify(watched))
        }
        return NextResponse.json({
            watched: watched
        })
    }
    console.log('do not have watched')
    watched.unshift(course)
    await redis.set("watched", JSON.stringify(watched))
    return NextResponse.json({
        watched: watched
    })

}