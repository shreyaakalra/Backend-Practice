// Admin Home: Lists articles + edit/delete buttons

import { getPosts } from "@/lib/posts";
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

        <div>
            <ul className="">
                {posts.map((post) => {
                    return(
                        <li key={post.slug} className="">
                            <div>
                                <div>{post.title}</div>
                                <div>{post.date}</div>
                            </div>

                            <div>
                                <Link href={`/edit/${post.slug}`}>
                                    <button>Edit</button>
                                </Link>

                                <button>Delete</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    </div>
  );
}

// bg-blue-500 text-white px-4 py-2 rounded font-bold