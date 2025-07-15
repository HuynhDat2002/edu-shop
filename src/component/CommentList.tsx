
'use client'

import Comment from "./Comment"
export default function CommentList({ comments }: { comments: any }) {
    return (
        <div className="flex mx-auto mt-5 mb-5 w-[80%] lg:w-[700px]  xl:w-[1000px] flex-col border-1 shadow-lg  rounded-lg shadow-lg">
            <span className="font-bold text-2xl mx-5 py-5">Đánh giá</span>
            {comments?.length > 0 && comments.map((cmt: any) => (
                
                    <div key={cmt.userId}id="comment" >
                        <Comment comment={cmt}/>
                    </div>
                

            ))}
        </div>
    )
}