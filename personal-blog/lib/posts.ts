import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

// 1. The absolute path to your articles folder
// Next.js requires process.cwd() to consistently find the root of your project
const articlesDir = path.join(process.cwd(), "articles");

// 2. TypeScript Contracts
export type Post = {
  slug: string;
  title: string;
  date: string;
  content: string;
};

// Helper: Convert "My Awesome Title!" to "my-awesome-title"
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// Helper: Ensure the articles directory exists so the app doesn't crash on first run
async function ensureDir() {
  try {
    await fs.access(articlesDir);
  } catch {
    await fs.mkdir(articlesDir);
  }
}

// --- THE CRUD OPERATIONS ---

// READ ALL
export async function getPosts(): Promise<Post[]> {
  await ensureDir();
  const filenames = await fs.readdir(articlesDir);

  // Filter out any non-markdown files (like .DS_Store on Mac)
  const mdFiles = filenames.filter((file) => file.endsWith(".md"));

  const posts = await Promise.all(
    mdFiles.map(async (filename) => {
      const filePath = path.join(articlesDir, filename);
      const fileContent = await fs.readFile(filePath, "utf-8");
      
      // gray-matter separates the frontmatter from the content
      const { data, content } = matter(fileContent);
      
      return {
        slug: filename.replace(".md", ""),
        title: data.title || "Untitled",
        date: data.date || "1970-01-01",
        content,
      };
    })
  );

  // Sort by date descending (newest first)
  return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

// READ ONE
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(articlesDir, `${slug}.md`);
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title,
      date: data.date,
      content,
    };
  } catch (error) {
    // If the file doesn't exist, fs.readFile throws an error. Catch it and return null.
    return null;
  }
}

// CREATE
export async function createPost(title: string, date: string, content: string): Promise<string> {
  await ensureDir();
  const slug = generateSlug(title);
  const filePath = path.join(articlesDir, `${slug}.md`);

  // matter.stringify converts our data back into a valid markdown file with frontmatter
  const fileString = matter.stringify(content, { title, date });
  
  await fs.writeFile(filePath, fileString, "utf-8");
  return slug; // Return the slug so our UI can redirect to the new post
}

// DELETE
export async function deletePost(slug: string): Promise<void> {
  try {
    const filePath = path.join(articlesDir, `${slug}.md`);
    await fs.unlink(filePath);
  } catch (error) {
    console.error(`Failed to delete post: ${slug}`, error);
  }
}