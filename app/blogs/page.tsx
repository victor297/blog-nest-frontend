"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit2, Trash2 } from "lucide-react";
import { api } from "../api/api";
import type { Blog } from "../api/types/blog";
import Image from "next/image";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await api.blogs.getAll();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await api.blogs.delete(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 from-blue-500 to-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <Link
          href="/blogs/new"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
        >
          Create New Blog
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-card rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-3">
              <div className="relative w-full aspect-video rounded-lg">
                <Image
                  src="https://thumbs.dreamstime.com/b/blog-writing-online-internet-blue-computer-keyboard-symbol-84741227.jpg"
                  alt=""
                  layout="fill"
                  className="rounded-lg"
                  objectFit="cover"
                />
              </div>
              <h2 className="text-xl font-semibold mt-2">{blog.title}</h2>
              <p className="text-muted-foreground mb-2">
                {blog.content.substring(0, 150)}...
              </p>
              <div className="flex justify-between items-center">
                <Link
                  href={`/blogs/${blog.id}`}
                  className="text-primary hover:underline"
                >
                  Read more
                </Link>
                <div className="flex gap-2">
                  <Link
                    href={`/blogs/${blog.id}/edit`}
                    className="p-2 hover:bg-secondary rounded-md"
                  >
                    <Edit2 className="w-4 h-4" color="green" />
                  </Link>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="p-2 hover:bg-destructive hover:text-destructive-foreground rounded-md"
                  >
                    <Trash2 className="w-4 h-4" color="red" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
