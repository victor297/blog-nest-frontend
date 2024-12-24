import { api } from "../../api/api";
import BlogDetail from "./blog-detail";
import type { Blog } from "../../api/types/blog";

// This is required for static site generation with dynamic routes
export async function generateStaticParams() {
  const blogs = await api.blogs.getAll();
  return blogs.map((blog: any) => ({
    id: blog.id,
  }));
}

// Server component that fetches data
export default async function BlogPage({ params }: { params: { id: string } }) {
  const blog = await api.blogs.getById(params.id);
  const comments = await api.comments.getByBlogId(params.id);

  return <BlogDetail blog={blog} initialComments={comments} />;
}
