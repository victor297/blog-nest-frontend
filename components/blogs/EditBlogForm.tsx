'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/app/api/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function EditBlogForm({ blogId }: { blogId: string }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await api.blogs.getById(blogId);
        setFormData({
          title: blog.title,
          content: blog.content,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog:', error);
        router.push('/blogs');
      }
    };

    fetchBlog();
  }, [blogId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.blogs.update(blogId, formData);
      router.push(`/blogs/${blogId}`);
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full p-2 border rounded-md h-48"
            required
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
          >
            Update Blog
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}