import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Welcome to Our Blog Platform
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Share your thoughts, ideas, and stories with the world.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/blogs"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Read Blogs
            </Link>
            <Link
              href="/blogs/new"
              className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-1"
            >
              Create a Blog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
