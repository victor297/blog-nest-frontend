import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BlogsPage from '@/app/blogs/page';
import { api } from '@/app/api/api';

jest.mock('@/app/api/api', () => ({
  api: {
    blogs: {
      getAll: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe('BlogsPage', () => {
  const mockBlogs = [
    {
      id: '1',
      title: 'Test Blog',
      content: 'Test Content',
      author: 'Test Author',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(() => {
    (api.blogs.getAll as jest.Mock).mockResolvedValue(mockBlogs);
  });

  it('renders blog list', async () => {
    render(<BlogsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Blog')).toBeInTheDocument();
    });
  });

  it('deletes a blog', async () => {
    (api.blogs.delete as jest.Mock).mockResolvedValue(undefined);
    window.confirm = jest.fn().mockImplementation(() => true);

    render(<BlogsPage />);

    await waitFor(() => {
      const deleteButton = screen.getByRole('button', { name: /delete/i });
      fireEvent.click(deleteButton);
    });

    expect(api.blogs.delete).toHaveBeenCalledWith('1');
  });
});