'use client'
import { useState, useEffect } from "react"
import CourseCard from "@/component/CourseCard"
import { Course } from "@/types"
import { useSearchParams } from "next/navigation"
import CourseList from "@/component/CourseList"
export default function Search() {
    const searchParams = useSearchParams()
    const [searchList, setSearchList] = useState([])


    useEffect(() => {
        const query = searchParams?.get('query') as string || ''
        const price = searchParams?.get('price') as string || ''
        async function fetchCourses() {
            const response = await fetch(`/api/courses?query=${query}&price=${price}`, {
                method: 'GET'
            });
            const data = await response.json();
            console.log('data', data)
            setSearchList(data.courses ? data.courses : []);
        }
        fetchCourses();
        console.log('price', price)
    }, [searchParams])
    console.log('searchList', searchList)
    return (
        <>
            <div className="flex flex-col gap-10 mt-15">
                <CourseList courses={searchList} />
            </div>
            {searchList.length === 0 && (
                <div className="flex mt-30 mx-auto text-2xl 2xl:text-4xl font-bold">
                    Không có khoá học nào!
                </div>
            )}

        </>

    )
}