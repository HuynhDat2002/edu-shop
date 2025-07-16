'use strict'
import { NextRequest, NextResponse } from "next/server";
import { Course } from "@/types";
import { Redis } from '@upstash/redis'
const redis = new Redis({
    url: 'https://relaxed-mastodon-16058.upstash.io',
    token: 'AT66AAIjcDEyMDMyMTUxODFmMDU0ZGQzYTlkMWJhYTQxNmMyN2QxMnAxMA',
})
export async function POST(req: NextRequest) {
    // lay id khoa hoc
    const { id } = await req.json()
    console.log('id', id)

    // lay thong tin khoa hoc
    const response = await fetch(`http://localhost:3000/api/course/${id}`, { method: "GET" })
    const data = await response.json()
    if (data?.status === 404)
        return NextResponse.json({
            message: "Không thể thêm vào danh sách yêu thích lúc này",
            status: 404
        })
    const course = data.course

    // kiem tra wishlist co ton tai khong
    let wishList: Array<any> = []
    const existingWishList: Array<any> | null = await redis.get("wishList");
    console.log('exist', existingWishList)
    // neu co thi tien hanh them vao danh sach
    if (existingWishList) {
        wishList = existingWishList

        // neu san pham nao co trong danh sach yeu thich roi thi se bi loai
        const found = wishList.find((wl) => wl.id === id)
        if (found) {
            wishList.splice(wishList.indexOf(found), 1)
            console.log('wishlisttt', wishList)
            await redis.set("wishList", JSON.stringify(wishList))
            return NextResponse.json({
                message: "Đã loại khỏi danh sách yêu thích",
                status: 200,
                wishList: wishList
            })
        }
        wishList.push(course)
        console.log('wishlisttt', wishList)
        await redis.set("wishList", JSON.stringify(wishList))

        return NextResponse.json({
            message: "Đã thêm vào danh sách yêu thích",
            status: 200,
            wishList: wishList
        })
    }

    // neu khong co thi tao moi
    console.log('do not have wishlist')
    wishList.push(course)

    await redis.set("wishList", JSON.stringify(wishList))
    return NextResponse.json({
        message: "Đã thêm vào danh sách yêu thích",
        status: 200,
        wishList: wishList
    })

}