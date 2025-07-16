'use client'
import CourseList from "@/component/CourseList";
import { useState,useEffect } from "react";
import { Course } from "@/types";
export default function Home() {
   const [courses, setCourses] = useState<Course[]>([]);
      useEffect(() => {
          async function fetchCourses() {
              const response = await fetch('/api/courses', {
                  method: 'GET'
              });
              const data = await response.json();
              setCourses(data.courses);
          }
          fetchCourses();
      }, []);
      console.log('Courses', courses);
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-10 mt-15 ">
        <CourseList courses={courses}/>
      </main>
    </div>
  );
}
