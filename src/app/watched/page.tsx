'use client'
import { useState, useEffect } from "react";
import CourseCard from "../../component/CourseCard";
import { Course } from "@/types";
import CourseList from "../../component/CourseList";
export default function Watched() {
    const [watched, setWatched] = useState<Course[]>([]);
    useEffect(() => {
        async function fetchCourses() {
            const response = await fetch('/api/getWatched', {
                method: 'GET'
            });
            const data = await response.json();
            setWatched(data.watched);
        }
        fetchCourses();
    }, []);
    console.log('Courses', watched);
    return (
        <>
            <div className="flex flex-col gap-10 mt-18">
                <CourseList courses={watched} />
            </div>
            {
                watched.length === 0 && (
                    <div className="flex mt-30 mx-auto text-2xl 2xl:text-4xl font-bold">
                        Không có khoá học nào!
                    </div>
                )
            }
        </>
    );
}