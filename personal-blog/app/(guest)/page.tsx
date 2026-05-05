// Home page : Lists all the articlesimport { getPosts } from "@/lib/posts";

import { getPosts } from "@/lib/posts";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts();
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-6xl mt-10">PERSONAL BLOG</div>
      <div className="mt-20">
        <ul>
          {posts.map((post) => {
            return(
              <Link key={post.slug} href={`/articles/${post.slug}`}>
                <li>
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
