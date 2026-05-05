// Admin Home: Lists articles + edit/delete buttons

import DeleteButton from "@/components/deleteButton";
import {getPosts } from "@/lib/posts";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col justify-center items-center p-10">
        <div className="flex flex-row justify-between w-full max-w-2xl border-b pb-4 mb-10">
            <div className="text-2xl font-bold py-2">Admin Dashboard</div>
            <Link href="/add">
                <button className="bg-blue-500 text-white px-4 py-2 rounded font-bold ">
                    + ADD NEW
                </button>
            </Link> 
        </div>

        <div className="w-full max-w-2xl">
            <ul className="flex flex-col gap-4">
                {posts.map((post) => {
                    return(
                        <li key={post.slug} className="flex flex-row justify-between border border-2 p-2">
                            <div className="font-bold =">
                                <div>{post.title}</div>
                            </div>
                            <div className="flex flex-row gap-3">
                                <Link href={`/edit/${post.slug}`}>
                                    <button className="text-blue-500">
                                        Edit
                                    </button>
                                </Link>
                                
                                <DeleteButton
                                    slug={post.slug}
                                />
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    </div>
  );
}

