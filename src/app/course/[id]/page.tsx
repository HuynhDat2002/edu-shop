
'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation'
// import { Rating as ReactRating } from '@smastrom/react-rating'
import { Rating, useTheme, useMediaQuery } from '@mui/material';
import CommentList from '@/component/CommentList';

export default function Course() {
    const params = useParams<{ id: string }>()
    const theme = useTheme();
    const isLg = useMediaQuery(theme.breakpoints.up('lg'))
    const courseId = parseInt(params.id, 10);
    const [value, setValue] = useState<number | null>(5);
    const [course, setCourse] = useState(
        {
            id: 0,
            name: "",
            price: 0,
            thumb: "",
            poster: "",
            shortDescription: "",
            longDescription: "",
            averageRating: 0,
            reviews: [
                {
                    userId: 0,
                    userName: "",
                    rating: 0,
                    comment: "",
                    date: ""
                }
            ]
        }
    );
    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch(`/api/course/${courseId}`, {
                method: 'GET'
            });
            const data = await response.json();
            console.log(data)
            setCourse(data.course ? data.course :[]);
        }
        fetchProducts();
    }, [params]);
    console.log('value', value);
    console.log('course', course);
    return (
        <div className="flex flex-col gap-3 mt-9 2xl:mt-17">
            <div className="bg-black flex flex-col lg:flex-row justify-center items-center gap-3 xl:gap-15 lg:px-10 lg:gap-10  w-screen h-[550px] overflow-hidden p-2">
                <Image
                    src={course.poster || "/logo.png"}
                    alt={course.name}
                    width={0}
                    height={0}
                    className=" w-[300px] h-[200px] sm:w-[400px] sm:h-[300px] 2xl:w-[600px] 2xl:h-[400px] object-cover shadow-2xl shadow-gray-300"
                    unoptimized
                />
                <div className="flex flex-col text-white max-w-3xl gap-5 text-justify justify-between" >
                    <p className="text-lg 2xl:text-4xl font-bold">{course.name}</p>
                    <p className="2xl:text-2xl text-gray-300">{course.longDescription}</p>
                    <div className="flex flex-row items-center gap-3">
                        <Rating
                            name="simple-controlled"
                            value={course.averageRating}
                            sx={{
                                '& .MuiRating-iconEmpty': {
                                    color: '#ffffff',
                                },
                                '& .MuiRating-iconFilled': {
                                    color: '#fbbf24',
                                },
                            }}
                            size={isLg ? 'large' : 'medium'}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            precision={0.5}
                            className="text-white"
                        />
                        <div className="text-lg lg:text-2xl">
                            {course.averageRating}
                        </div>

                    </div>
                    <div className="flex flex-row justify-between items-center px-2 ">
                        <p className="text-start text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent ">{course.price} VNĐ</p>
                        <button
                            className="flex flex-row  justify-center items-center cursor-pointer text-black end-1.5 top-1 bottom-1 bg-white hover:bg-ctBlue-header shadow-md focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2"
                        >
                            <span className="text-lg xl:text-2xl font-semibold">Tham gia ngay</span>
                        </button>
                    </div>
                </div>

            </div>
            <div className="flex flex-col xl:flex-row justify-center items-center">

                {/* comment */}
                <div className="mt-5">
                    <CommentList comments={course.reviews} />
                </div>
            </div>
        </div>
    )
}
