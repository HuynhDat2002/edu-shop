
'use client'
import { useState,useEffect } from 'react';
import Image from 'next/image';
import { Rating } from '@mui/material';

export default function Comment({ comment }: { comment: any }) {
    const [date,setDate] = useState<any>();
    useEffect(()=>{
        setDate(new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "long" }))
    },[])
    return (
        <div key={comment.userId} id="comment" className="flex flex-col my-3 mx-5 p-2 ring-1 ring-ctBlue-logo rounded-lg shadow-lg gap-3">
                <div className="flex flex-row items-center text-lg font-bold">
                    <Image
                        src={'/logo.png'}
                        alt="User Avatar"
                        width={60}
                        height={60}
                        className="rounded-full"
                    />
                    <div className="flex flex-col">
                        <p>
                            {comment.userName}
                        </p>
                        <p className="text-gray-500">
                            {(() => {
                                const createDate = new Date(comment.date);
                                return !isNaN(createDate.getTime())
                                    ? date?.format(createDate)
                                    : 'Ngày không hợp lệ';
                            })()}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-3">
                    <Rating
                        name="simple-controlled"
                        value={comment.rating}
                        readOnly={true}
                        sx={{
                            '& .MuiRating-iconEmpty': {
                                color: '#000000',
                            },
                            '& .MuiRating-iconFilled': {
                                color: '#fbbf24',
                            },
                        }}
                        size='large'

                        precision={0.5}
                        className="text-white"
                    />
                    <div className="text-2xl">
                        {comment.rating}
                    </div>
                </div>
                <div className="text-xl">
                    {comment.comment}
                </div>
        </div>
    )
}