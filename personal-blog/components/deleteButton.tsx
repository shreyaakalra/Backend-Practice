"use client"

import { deletePost } from "@/lib/posts";

export default function DeleteButton({slug}: {slug: string}){
   return(
    <button
        className="text-red-600"
        onClick={()=>{deletePost(slug)}}
    >
        Delete
    </button>
   ); 
}

