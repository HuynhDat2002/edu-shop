import { NextResponse } from "next/server";
import { Course } from "@/types";
import courses from './courses.json'; // Assuming you have a products.json file with product data
import { Redis } from '@upstash/redis'
const redis = new Redis({
    url: 'https://relaxed-mastodon-16058.upstash.io',
    token: 'AT66AAIjcDEyMDMyMTUxODFmMDU0ZGQzYTlkMWJhYTQxNmMyN2QxMnAxMA',
})
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.toLowerCase() || "";
    const price = searchParams.get("price")?.toLowerCase() || "";
    console.log('query from api',query,'price',price)
    if(!await redis.get("courses")){
        console.log('do not have courses')
        await redis.set('courses',JSON.stringify(courses.courses))
    }
    if (query !== "") {

        let result: any
        if (price === "") result = courses.courses.filter((course) => course.name.toLowerCase().includes(query))
        if (price === "lt500") result = courses.courses.filter((course) => course.name.toLowerCase().includes(query) && course.price < 500000)
        if (price === "from500to1m") result = courses.courses.filter((course) => course.name.toLowerCase().includes(query) && course.price >= 500000 && course.price <= 1000000)
        if (price === "g1000") result = courses.courses.filter((course) => course.name.toLowerCase().includes(query) && course.price > 1000000)

        return NextResponse.json({
            courses: result
        })

    }
    else {
        let result: any
        if (price === "") result = courses.courses
        if (price === "lt500") result = courses.courses.filter((course) => course.price < 500000)
        if (price === "from500to1m") result = courses.courses.filter((course) => course.price >= 500000 && course.price <= 1000000)
        if (price === "gt1000") result = courses.courses.filter((course) => course.price > 1000000)

        return NextResponse.json({
            courses: result
        })
    }
}