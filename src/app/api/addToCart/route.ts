'use strict'
import { NextRequest, NextResponse } from "next/server";
import { Course } from "@/types";
import { Redis } from '@upstash/redis'
const redis = new Redis({
    url: 'https://relaxed-mastodon-16058.upstash.io',
    token: 'AT66AAIjcDEyMDMyMTUxODFmMDU0ZGQzYTlkMWJhYTQxNmMyN2QxMnAxMA',
})
export async function POST(req: NextRequest) {
    // lay id cua khoa hocj
    const { id } = await req.json()
    console.log('id', id)

    // dua vao id tim ra khoa hoc
    const response = await fetch(`http://localhost:3000/api/course/${id}`, { method: "GET" })
    const data = await response.json()
    if (data?.status === 404)
        return NextResponse.json({
            message: "Không thể thêm vào giỏ hàng lúc này",
            status: 404
        })
    const course = data.course

    // kiem tra gio hang
    let cart: Array<any> = []
    const existingCart: Array<any> | null = await redis.get("cart");
    console.log('exist', existingCart)
    // neu ton tai gio hang
    if (existingCart) {
        cart = existingCart

        const found = cart.find((course) => course.id === id)
        //neu tim thay khoa hoc nay trong gio hang roi thi khong them nua
        if (found) {
            return NextResponse.json({
                message: "Đã có trong giỏ hàng",
                status: 200
            })
        }
        else {
            cart.push(course)
            await redis.set('cart',JSON.stringify(cart))
            return NextResponse.json({
                message: "Đã thêm vào giỏ hàng",
                status: 200,
                cart: cart
            })
        }
    }
    console.log('do not have cart')
    cart.push(course)

    await redis.set("cart", JSON.stringify(cart))
    return NextResponse.json({
        message: "Đã thêm vào giỏ hàng",
        status: 200,
        cart: cart
    })

}