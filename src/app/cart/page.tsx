'use client'
import { useState, useEffect } from "react";
import CourseCartCard from "../../component/CourseCartCard";
import { Course } from "@/types";
import CourseList from "../../component/CourseList";
export default function WishList() {
    const [cart, setCart] = useState<Course[]>([]);


    const handleReload = () => {
        console.log('hiiii')
        async function fetchCourses() {
            const response = await fetch('/api/getCart', {
                method: 'GET'
            });
            const data = await response.json();
            setCart(data.cart);
        }
        fetchCourses();
        // hoặc gọi API load lại dữ liệu ở đây
    };

    useEffect(() => {
        async function fetchCourses() {
            const response = await fetch('/api/getCart', {
                method: 'GET'
            });
            const data = await response.json();
            setCart(data.cart);
        }
        fetchCourses();
    }, []);
    console.log('Courses', cart);
    return (
        <>
            <div className="flex flex-col gap-10 mt-18">
                <div className="flex flex-col min-h-screen justify-start items-center md:justify-start md:items-start mx-auto mb-10 2xl:mt-10">

                    <div className="flex justify-center items-center mx-auto grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-1 md:gap-y-7 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 2xl:gap-x-0 ">

                        {cart.map((course: Course) => (
                            <div key={course.id} className="">

                                <CourseCartCard course={course} handleReload={handleReload} />
                            </div>
                        ))}
                    </div>
                    {/* <Page type={tab.tab}/> */}

                </div>
            </div>
            {
                cart.length === 0 && (
                    <div className="flex mt-30 mx-auto text-2xl 2xl:text-4xl font-bold">
                        Giỏ hàng trống!
                    </div>
                )
            }
        </>

    );
}