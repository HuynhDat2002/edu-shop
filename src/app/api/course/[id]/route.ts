'use strict'
import {NextResponse} from "next/server";
import {Course} from "@/types";
export async function GET(request:Request,{ params }: { params: Promise<{ id: string }> } ) {
    const {id} = await params;

    console.log('id from api', id);

    // get products
     const response = await fetch('http://localhost:3000/api/courses', {
                method: 'GET'
            });
    const data = await response.json();
    if(data.courses.length<=0) {
        console.error('Products not found');
        return NextResponse.json({error: 'Products not found'}, {status: 404});
    }
    // get product by id
    const course = data.courses.find((product:Course)=>product.id===parseInt(id as string))
    if(!course) return NextResponse.json({error: 'Product not found'}, {status: 404});
    return NextResponse.json({
        course: course
    })
}