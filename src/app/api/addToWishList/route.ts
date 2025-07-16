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
    console.log('id', id)
    const response = await fetch(`http://localhost:3000/api/course/${id}`, { method: "GET" })
    const data = await response.json()
    if (data?.status === 404)
        return NextResponse.json({
            message: "Không thể thêm vào danh sách yêu thích lúc này",
            status: 404
        })

    const course = data.course

    let wishList: Array<any> = []
    const existingWishList: Array<any> | null = await redis.get("wishList");
    console.log('exist',existingWishList)
    if (existingWishList) {
        console.log('already has wishlist')
        wishList = existingWishList
        console.log('wish', wishList)

        const found = wishList.find((wl) => wl.id === id)
        if (found) {
            wishList.splice(wishList.indexOf(found), 1)
            console.log('wishlisttt', wishList)
            await redis.set("wishList", JSON.stringify(wishList))
        }
        else {
            wishList.push(course)
            console.log('wishlisttt', wishList)
            await redis.set("wishList", JSON.stringify(wishList))
        }
        return NextResponse.json({
            wishList: wishList
        })
    }
    console.log('do not have wishlist')
    wishList.push(course)

    await redis.set("wishList", JSON.stringify(wishList))
    return NextResponse.json({
        wishList: wishList
    })

}