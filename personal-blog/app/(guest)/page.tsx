// Home page : Lists all the articlesimport { getPosts } from "@/lib/posts";

import { getPosts } from "@/lib/posts";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts();
  return (
    <div className="flex flex-col justify-center items-center p-10">
      <div className="flex flex-row justify-between w-full max-w-2xl border-b pb-4 mb-10">
        <div className="text-2xl font-bold py-2">
          PERSONAL BLOG
        </div>
        <Link href="/login">
                <button className="bg-blue-500 text-white px-4 py-2 rounded font-bold ">
                    Log In
                </button>
            </Link> 
        </div>
      
      <div className="w-full max-w-2xl">
        <ul className="flex flex-col gap-4">
          {posts.map((post) => {
            return(
              <Link key={post.slug} href={`/article/${post.slug}`}>
                <li className="flex flex-row justify-between border border-2 p-2">
                  {post.title} - {post.date}
                </li>
              </Link>  
            )
          })}
        </ul>
      </div>
    </div>
  );
}
