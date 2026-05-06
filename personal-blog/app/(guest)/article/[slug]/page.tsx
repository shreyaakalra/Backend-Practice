// Dynamic Route
// Reads one specific file

import { showContent } from "@/lib/posts";

export default async function expandPost({params}: {params: Promise<{slug: string}>}){
    const { slug } = await params;
    const post = await showContent(slug);

    const title = post?.title;
    const date = post?.date;
    const content = post?.content;

    return(
        <div className="flex flex-col justify-center items-start p-10">
            <div className="flex flex-row justify-between w-full max-w-2xl border-b pb-4 mb-10">
                <div className="text-2xl font-bold py-2">
                    {title}
                </div>
                <div className="py-4">
                    {date}
                </div>
            </div>
            <div className="text-left">
                {content}
            </div>
        </div>
    )
}