"use client";

import { useState } from "react";
import { api } from "../../api/api";
import type { Blog, Comment } from "../../api/types/blog";

interface BlogDetailProps {
  blog: Blog;
  initialComments: Comment[];
}

export default function BlogDetail({ blog, initialComments }: BlogDetailProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState({ content: "", author: "" });

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const comment = await api.comments.create(blog.id, newComment);
    setComments([...comments, comment]);
    setNewComment({ content: "", author: "" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <article className="prose lg:prose-xl">
        <h1 className="font-extrabold text-3xl">{blog.title}</h1>
        <p className="text-white">By {blog.author}</p>
        <div className="mt-8 text-justify">{blog.content}</div>
      </article>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Comments</h2>
        <form onSubmit={handleCommentSubmit} className="mb-8 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Your Name</label>
            <input
              type="text"
              value={newComment.author}
              onChange={(e) =>
                setNewComment({ ...newComment, author: e.target.value })
              }
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Comment</label>
            <textarea
              value={newComment.content}
              onChange={(e) =>
                setNewComment({ ...newComment, content: e.target.value })
              }
              className="w-full p-2 border rounded-md h-24"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
          >
            Add Comment
          </button>
        </form>

        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-card p-4 rounded-lg shadow-sm">
              <p className="font-medium">{comment.author}</p>
              <p className="mt-2">{comment.content}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
