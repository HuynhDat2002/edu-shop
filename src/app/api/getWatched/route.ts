'use strict'
import { NextResponse } from "next/server";
import { Course } from "@/types";
import { Redis } from '@upstash/redis'
const redis = new Redis({
    url: 'https://relaxed-mastodon-16058.upstash.io',
    token: 'AT66AAIjcDEyMDMyMTUxODFmMDU0ZGQzYTlkMWJhYTQxNmMyN2QxMnAxMA',
})
export async function GET(request: Request) {
    // await redis.del("watched")
    const existingWatched: Array<number> | null = await redis.get("watched");

    if (existingWatched) {
      return NextResponse.json({
            watched: existingWatched
        })
    }
    return NextResponse.json({
        watched: []
    })

}