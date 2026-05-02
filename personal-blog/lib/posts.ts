import path from "path";


const articlesDir = path.join(process.cwd(), "articles");

export type Post = {
    slug: string;
    title: string;
    date: string;
    content: string;
}