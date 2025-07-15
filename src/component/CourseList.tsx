'use client'
import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import { Course } from "@/types";
export default function CourseList({courses}:{courses:Course[]}) {
  
    console.log('Courses', courses);
    return (

        <div className="flex flex-col min-h-screen justify-start items-center md:justify-start md:items-start mx-auto mb-10 2xl:mt-10">

            <div className="flex justify-center items-center mx-auto grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-1 md:gap-y-7 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 2xl:gap-x-0 ">

                {courses.map((course: Course) => (
                    <div key={course.id} className="">

                        <CourseCard course={course} />
                    </div>
                ))}
            </div>
            {/* <Page type={tab.tab}/> */}

        </div>

    );
}