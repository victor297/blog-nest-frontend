const API_BASE_URL = 'http://localhost:3001';

export const api = {
  blogs: {
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/blogs`);
      return response.json();
    },
    getById: async (id: string) => {
      const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
      return response.json();
    },
    create: async (data: { title: string; content: string; author: string }) => {
      const response = await fetch(`${API_BASE_URL}/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    update: async (id: string, data: { title: string; content: string }) => {
      const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    delete: async (id: string) => {
      await fetch(`${API_BASE_URL}/blogs/${id}`, {
        method: 'DELETE',
      });
    },
  },
  comments: {
    create: async (blogId: string, data: { content: string; author: string }) => {
      const response = await fetch(`${API_BASE_URL}/blogs/${blogId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    getByBlogId: async (blogId: string) => {
      const response = await fetch(`${API_BASE_URL}/blogs/${blogId}/comments`);
      return response.json();
    },
  },
};