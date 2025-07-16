'use strict'
import { NextResponse } from "next/server";
import { Course } from "@/types";
import { Redis } from "@upstash/redis";
const redis = new Redis({
    url: 'https://relaxed-mastodon-16058.upstash.io',
    token: 'AT66AAIjcDEyMDMyMTUxODFmMDU0ZGQzYTlkMWJhYTQxNmMyN2QxMnAxMA',
})
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
   try{

       const { id } = await params;
   
       console.log('id from api', id);
   
       const cart: Array<any> = await redis.get('cart') || []
       const found = cart.findIndex((wl) => wl.id === id)
       cart.splice(found, 1)
       await redis.set("cart", JSON.stringify(cart))
       return NextResponse.json({
           message: "Đã loại khỏi giỏ hàng",
           status: 200,
           cart: cart
       })
   }
   catch (err){
    return NextResponse.json({
           message: "Lỗi không thể xoá khỏi giỏ hàng",
           status: 500,
       })
   }
  
}