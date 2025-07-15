'use client'
import { useState, useEffect } from "react"
import CourseCard from "@/component/CourseCard"
import { Course } from "@/types"
import { useSearchParams } from "next/navigation"
import CourseList from "@/component/CourseList"
export default function Suggestion() {
    const [suggestionList, setSuggestionList] = useState([])

    useEffect(() => {
        async function suggestion() {
            const response = await fetch(`/api/suggestions?userId=1`, {
                method: 'GET'
            });
            const data = await response.json();
            setSuggestionList(data.suggestions);
        }
        suggestion()
    }, [])
    return (
        <>
            <div className="flex flex-col gap-10 mt-15">
                <CourseList courses={suggestionList} />
            </div>


        </>

    )
}