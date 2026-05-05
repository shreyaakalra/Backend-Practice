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

        <div className="w-full max-w-2xl">
            <ul className="flex flex-col gap-4">
                {posts.map((post) => {
                    return(
                        <li key={post.slug} className="">
                            <div className="flex flex-row ">
                                <div>{post.title}</div>
                                <div>{post.date}</div>
                            </div>

                            <div>
                                
                                <button>Edit</button>
                                

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

/*
    import { getPosts } from "@/lib/posts";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts();
  
  return (
    <div className="flex flex-col justify-center items-center p-10">
      
      <div className="flex flex-row justify-between w-full max-w-2xl border-b pb-4 mb-10">
        <div className="text-2xl font-bold">Admin Dashboard</div>
        
        <Link href="/add">
            <button className="bg-blue-500 text-white px-4 py-2 rounded font-bold">
              + ADD NEW
            </button>
        </Link>
      </div>

      <div className="w-full max-w-2xl">
        <ul className="flex flex-col gap-4">
          {posts.map((post) => {
            return(
              // The flex-row and justify-between pushes the text left and buttons right
              <li key={post.slug} className="flex flex-row justify-between items-center bg-gray-100 p-4 rounded">
                
     
                <div>
                  <div className="font-bold">{post.title}</div>
                  <div className="text-sm text-gray-500">{post.date}</div>
                </div>


                <div className="flex gap-2">
                  <Link href={`/edit/${post.slug}`}>
                    <button className="bg-yellow-400 px-3 py-1 rounded text-sm font-bold">Edit</button>
                  </Link>
                  
                  <button className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">Delete</button>
                </div>

              </li>
            )
          })}
        </ul>
      </div>

    </div>
  );
}
 */