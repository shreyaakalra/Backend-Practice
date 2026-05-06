// Dynamic Route
// Form pre-filled with existing article data

"use server"

import { showContent, updatePost } from "@/lib/posts"

export default async function EditPost({params}: {params: {slug: string}}){
    const post = await showContent(params.slug);

    if(!post){

    }
}
