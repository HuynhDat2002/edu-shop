'use client'
import { useState, useEffect } from "react"
import CourseCard from "@/component/CourseCard"
import { Course } from "@/types"
import { useSearchParams } from "next/navigation"
import CourseList from "@/component/CourseList"
import { toast } from 'react-toastify';

export default function Suggestion() {
    const [suggestionList, setSuggestionList] = useState([])

    useEffect(() => {
        async function suggestion() {
            const response = await fetch(`/api/suggestions?userId=1`, {
                method: 'GET'
            });
            const data = await response.json();
            console.log('sugges status', data)
            if (data.status === 404) toast.error(data.message)
            setSuggestionList(data.suggestions);
        }
        suggestion()
    }, [])
    console.log('sugg', suggestionList)
    return (
        <>
            {suggestionList && suggestionList.length > 0 &&

                <div className="flex flex-col gap-10 mt-15">
                    <CourseList courses={suggestionList} />
                </div>
            }
            {
                !suggestionList && (
                    <div className="flex mt-30 mx-auto text-2xl 2xl:text-4xl font-bold mb-20">
                        Không có khoá học nào!
                    </div>
                )

            }

        </>

    )
}