import { api } from "../../../api/api";
import EditBlogForm from "@/components/blogs/EditBlogForm";

// This function is required for static site generation with dynamic routes
export async function generateStaticParams() {
  const blogs = await api.blogs.getAll();
  return blogs.map((blog: any) => ({
    id: blog.id,
  }));
}

export default function EditBlogPage({ params }: { params: { id: string } }) {
  return <EditBlogForm blogId={params.id} />;
}
