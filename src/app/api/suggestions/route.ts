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
    // await redis.del("wishList")

    // await redis.del("courses")
    const existingWatched: Array<Course> = await redis.get("watched") || [];
    const existingWishList: Array<Course> = await redis.get("wishList") || [];
    const cart: Array<Course> = await redis.get("cart") || [];
    const courses: Array<Course> = await redis.get("courses") || [];
    console.log('courses from suggestion', courses)


    if (existingWatched.length > 0 || existingWishList.length > 0 || cart.length>0) {
        const relate = new Map()
        for (const course of courses) {
            if (existingWishList.length > 0) {
                const isMatch = existingWishList.some(e =>
                    e.keyword.some(key => course.keyword.includes(key))
                );

                if (isMatch) {
                    relate.set(course.id, course);
                    continue;
                    // Không cần lặp tiếp e hoặc key nữa vì đã tìm thấy match
                }
                
            }
            if (existingWatched.length > 0) {
                const isMatch = existingWatched.some(e =>
                    e.keyword.some(key => course.keyword.includes(key))
                );

                if (isMatch) {
                    relate.set(course.id, course);
                    continue;
                    // Không cần lặp tiếp e hoặc key nữa vì đã tìm thấy match
                }
            }

            if (cart.length > 0) {
                const isMatch = cart.some(e =>
                    e.keyword.some(key => course.keyword.includes(key))
                );

                if (isMatch) {
                    relate.set(course.id, course);
                    // Không cần lặp tiếp e hoặc key nữa vì đã tìm thấy match
                }
            }
        }

        const suggestions = Array.from(relate.values())
        return NextResponse.json({
            suggestions: suggestions
        })
    }

    console.log('nothing')
    if (courses.length === 0) return NextResponse.json({
            message: "Không thể lấy gợi ý lúc này",
            status: 404
        })

    courses.sort((a: Course, b: Course) => b.averageRating - a.averageRating)
    const result = courses.slice(0, 5)
    return NextResponse.json({
        suggestions: result
    })

}