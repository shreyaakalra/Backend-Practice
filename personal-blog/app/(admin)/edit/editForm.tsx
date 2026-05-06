"use client"

import { createPost, deletePost, generateSlug} from "@/lib/posts";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditPost({oldTitle, oldDate, oldContent, oldSlug}:{oldTitle: string, oldDate: string, oldContent: string, oldSlug: string}){

    const router = useRouter();
    

    const [title, setTitle] = useState(oldTitle);
    const [date, setDate] = useState(oldDate);
    const [content, setContent] = useState(oldContent);

    async function postSubmit(){
       await createPost(title, date, content);
       if(title!==oldTitle){
        await deletePost(oldSlug);
       }
       router.push('/dashboard');
    }

    return(
        <div className="flex flex-col w-full max-w-2xl mx-auto p-10">
            <div className="border-b mb-10 text-2xl pb-4 font-bold py-2 text-blue-500">
                Edit Article
            </div>
            <div className="mb-2 font-bold">Article Title</div>
            <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your article title here"
                className="border border-white h-15 p-4 mb-10"
            />
            <div className="mb-2 font-bold">Publishing Date</div>
            <input 
                value={date}
                onChange={(e)=> setDate(e.target.value)}
                placeholder="Enter the publishing date"
                className="border border-white h-15 p-4 mb-10"
            />
            <div className="mb-2 font-bold">Content</div>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter the content here"
                className="border border-white h-90 p-4 mb-10 text-left"
            />
            <button 
                className="border border-3 h-10 border-blue-400 bg-blue-500 font-bold"
                onClick={postSubmit}
            >
                Submit
            </button>
        </div>
    )
}