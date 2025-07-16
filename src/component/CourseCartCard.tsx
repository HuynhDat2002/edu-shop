'use client'
import { Course } from "@/types";
import { useState, useEffect } from "react";
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import { toast } from 'react-toastify';
export default function CourseCartCard({ course,handleReload }: { course: Course,handleReload:any}) {
  const router = useRouter()
  const [wishList, setWishList] = useState("")
  const [isWishList, setIsWishList] = useState(false)
  const [isDelete,setIsDelete]=useState(false)
  useEffect(() => {
    async function checkWishList() {
      const response = await fetch(`/api/checkWishList/${course.id}`, {
        method: 'GET'
      });
      const data = await response.json();
      setIsWishList(data.isWishList);
    }
    checkWishList()
  }, [])
  const handleCourse = (id: number): void => {
    // Handle Course click, e.g., navigate to Course details page
    console.log('Course:', id);
    async function addWatched() {
      await fetch(`/api/addWatched`, {
        method: 'POST',
        body: JSON.stringify({
          id: id,
        }),
      },
      );
    }
    addWatched()
    router.push(`/course/${id}`)
  };
  const handleWishList = async () => {
    const response = await fetch(`/api/addToWishList`, {
      method: "POST",
      body: JSON.stringify({
        id: course.id,
      }),
    })
    const data = await response.json();
    console.log('data wish list', data)
    if (data.status === 404) {
      toast.error(data.message)
    }
    if (data.status === 200) {
      toast.success(data.message)
      setIsWishList(!isWishList)
    }

  }

  const handleDelete = async ()=>{
    // e.preventDefault()
     const response = await fetch(`/api/deleteCart/${course.id}`, {
      method: "DELETE",
    })
    const data = await response.json();
    if (data.status === 500) {
      toast.error(data.message)
    }
    if (data.status === 200) {
      toast.success(data.message)
      handleReload()
    }
  }
  return (
    <div

      className='flex flex-wrap justify-center'
    >
      <div className="flex flex-col w-[90%] sm:w-[70%] xs:w-[80%] h-[400px] sm:h-[450px] md:h-[400px] xl:h-[500px] 2xl:h-[550px] md:w-[90%] gap-5 bg-white border-1 border-gray-300  shadow-lg rounded-lg overflow-hidden">
        <div className="flex relative">

          <Image
            src={course.thumb}
            alt={course.name}
            width={154}
            height={250}
            className="w-full h-[200px] sm:h-[250px] md:h-[200px] 2xl:h-[300px] border-b-1 border-gray-300 shadow-md object-cover"
            unoptimized
          />
          <div
            className="cursor-pointer"
            onClick={() => handleWishList()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="black"
              className={`size-7 2xl:size-10 absolute top-2 right-2 ${isWishList ? "fill-red-500" : "fill-white"} hover:fill-red-500`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>

          </div>

        </div>
        <div className="flex flex-col text-start px-1 mb-2 justify-between gap-3 sm:gap-3 flex-1">
          <p className="text-lg xl:text-2xl dark:text-zinc-400 text-zinc-600 font-bold line-clamp-2 basis-1/2">
            {course.name}
          </p>
          <p className="text-md xl:text-xl text-zinc-600 basis-1/4">
            {course.shortDescription}
          </p>
          <div className="flex flex-row justify-between items-center px-2 basis-1/4">
            <p className="text-start xl:text-2xl text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent ">{course.price} VNĐ</p>
            <div className="flex flex-row gap-5">
              <div className="flex justify-center items-center" onClick={()=>handleDelete()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-8 fill-black hover:fill-red-500 ">
                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
              </svg>

              </div>

              <button
                onClick={() => handleCourse(course.id)}
                className="flex flex-row  justify-center items-center cursor-pointer text-white end-1.5 top-1 bottom-1 bg-ctBlue-header hover:bg-ctBlue-header shadow-md focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2"
              >
                <span className="text-lg font-semibold">Xem chi tiết</span>
                <ChevronRightIcon className="size-6 text-white" />
              </button>

            </div>
          </div>
        </div>
      </div>


    </div>
  );
}