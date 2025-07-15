'use strict'
import { NextResponse } from "next/server";
import { Course } from "@/types";
import { Redis } from '@upstash/redis'
const redis = new Redis({
    url: 'https://relaxed-mastodon-16058.upstash.io',
    token: 'AT66AAIjcDEyMDMyMTUxODFmMDU0ZGQzYTlkMWJhYTQxNmMyN2QxMnAxMA',
})
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id as string);

    const existingWishList: Array<any> | null = await redis.get("wishList");

    if (existingWishList) {
        const found = existingWishList.find((wl) => wl.id === id)
        if (found) {
            return NextResponse.json({
                isWishList: true
            })
        }

    }
    return NextResponse.json({
        isWishList: false
    })

}