import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BlogDetailPage from '@/app/blogs/[id]/page';
import { api } from '@/app/api/api';

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: '1' }),
}));

jest.mock('@/app/api/api', () => ({
  api: {
    blogs: {
      getById: jest.fn(),
    },
    comments: {
      getByBlogId: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe('BlogDetailPage', () => {
  const mockBlog = {
    id: '1',
    title: 'Test Blog',
    content: 'Test Content',
    author: 'Test Author',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockComments = [
    {
      id: '1',
      content: 'Test Comment',
      author: 'Commenter',
      createdAt: new Date(),
    },
  ];

  beforeEach(() => {
    (api.blogs.getById as jest.Mock).mockResolvedValue(mockBlog);
    (api.comments.getByBlogId as jest.Mock).mockResolvedValue(mockComments);
  });

  it('renders blog details and comments', async () => {
    render(<BlogDetailPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Blog')).toBeInTheDocument();
      expect(screen.getByText('Test Comment')).toBeInTheDocument();
    });
  });

  it('adds a new comment', async () => {
    const newComment = {
      id: '2',
      content: 'New Comment',
      author: 'New Commenter',
      createdAt: new Date(),
    };

    (api.comments.create as jest.Mock).mockResolvedValue(newComment);

    render(<BlogDetailPage />);

    await waitFor(() => {
      const authorInput = screen.getByLabelText(/your name/i);
      const contentInput = screen.getByLabelText(/comment/i);
      
      fireEvent.change(authorInput, { target: { value: 'New Commenter' } });
      fireEvent.change(contentInput, { target: { value: 'New Comment' } });
      
      const submitButton = screen.getByRole('button', { name: /add comment/i });
      fireEvent.click(submitButton);
    });

    expect(api.comments.create).toHaveBeenCalledWith('1', {
      content: 'New Comment',
      author: 'New Commenter',
    });
  });
});