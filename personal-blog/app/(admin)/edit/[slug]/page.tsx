// Dynamic Route
// Form pre-filled with existing article data

// form to create new article

import {showContent } from "@/lib/posts";
import EditPost from "../editForm";

export default async function edit({ params }: { params: Promise<{ slug: string }> }){
    const { slug } = await params;
    const post = await showContent(slug);

    if(!post){
        return <div>
            Article Not Found
        </div>
    }

    const oldTitle = post?.title;
    const oldDate = post?.date;
    const oldContent = post?.content;

    return(
        <EditPost
        oldTitle={oldTitle}
        oldDate={oldDate}
        oldContent={oldContent}
        oldSlug={slug}
        />
    )
}