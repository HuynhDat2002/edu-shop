'use client'
import { useState, useEffect } from "react";
import CourseCard from "../../component/CourseCard";
import { Course } from "@/types";
import CourseList from "../../component/CourseList";
export default function WishList() {
    const [wishList, setWishList] = useState<Course[]>([]);
    useEffect(() => {
        async function fetchCourses() {
            const response = await fetch('/api/getWishList', {
                method: 'GET'
            });
            const data = await response.json();
            setWishList(data.wishList);
        }
        fetchCourses();
    }, []);
    console.log('Courses', wishList);
    return (
        <>
            <div className="flex flex-col gap-10 mt-18">
                <CourseList courses={wishList} />
            </div>
            {
                wishList.length === 0 && (
                    <div className="flex mt-30 mx-auto text-2xl 2xl:text-4xl font-bold">
                        Không có khoá học nào!
                    </div>
                )
            }
        </>

    );
}