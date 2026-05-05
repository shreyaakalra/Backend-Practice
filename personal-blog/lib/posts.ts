// things to do :
// 1. need a slug for URL name
// 2. so both admin and guest would get to see all the posts so on that page we first need to make sure there is a way we can see all the posts titles and date created.
// 3. but now if they want to see just one article and it's content then you need a function for that too
// 4. but the admin will be able to do edit and delete and add new articles so we need to create functions for that too
// basically these are the functions required : generateSlug, add, edit, update, delete 

import path from "path";
import fs from 'fs/promises';
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  date: string;
  content: string;
}

// need a path to get to the articles directory
const articlesDir = path.join(process.cwd(), "articles");

// But first also need to check if the articles directory even exists or not cause if we will try to access a directory that doesn't exist it might give an error
async function checkDir(){
  try{
    await fs.access(articlesDir);
  } catch {
    await fs.mkdir(articlesDir)
  }
}

// to generate a slug for url name
export function generateSlug(title: string): string{
// 1. need the title for website
// 2. have to edit the title to make it look like article-2-type-shit
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

// to get all the posts
export async function getPosts(): Promise<Post[]> {
  await checkDir();

  // 1. need to go to the articles directory and read everything
  const files = await fs.readdir(articlesDir);

  // filter out any non-markdown files and store them in mdFiles
  const mdFiles = files.filter((file) => file.endsWith(".md"));

  const posts = await Promise.all(
    mdFiles.map(async (filename) => {
      const filePath = path.join(articlesDir, filename);
      const fileContent = await fs.readFile(filePath, "utf-8");

      const { data, content} = matter(fileContent);

      return {
        slug: filename.replace(".md",""),
        title: data.title || "Untitled",
        date: data.date || "1970-01-01",
        content
      };
    })
  );

  return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

// to get one post details and all it's content
export async function showContent(slug: string): Promise<Post | null>{
  // 1. need the url of a specific file that user wants to open
  try{
    const filePath = path.join(articlesDir, slug+".md");
    const fileContent = await fs.readFile(filePath, "utf-8");

    const {data, content} = matter(fileContent)

    // 2. show its title, created at, content etc
    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || "1970-01-01",
      content
    }
  } catch {
    return null;
  }
}

// to create/edit a post
export async function createPost(title: string, date: string, content: string ): Promise<string>{
  await checkDir();
  const slug = generateSlug(title);
  const filePath = path.join(articlesDir, slug+".md");

  // matter.stringify converts our data back into a valid markdown
  const fileString = matter.stringify(content, {title, date});

  // write the file on the given file path, put the current fileString in it
  await fs.writeFile(filePath, fileString, "utf-8");
  return slug;
}

// to delete a post
export async function deletePost(slug: string){
  try{
    const filePath = path.join(articlesDir, slug+".md");
    await fs.unlink(filePath);
  } catch (error){
    console.error(`Failed to delete post : ${slug}`, error);
  }
}