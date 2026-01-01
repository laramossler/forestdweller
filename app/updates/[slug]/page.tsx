import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts, getPostBySlug } from '@/lib/posts';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Forest Dweller`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-16 bg-warm-white min-h-screen">
      <div className="max-w-[680px] mx-auto px-6">
        {/* Back link */}
        <Link
          href="/updates"
          className="inline-flex items-center text-forest hover:text-sage transition-colors mb-8 font-medium"
        >
          ← Back to Updates
        </Link>

        {/* Post header */}
        <header className="mb-12">
          <div className="flex gap-3 mb-4 text-sm text-walnut">
            <span className="bg-sage/20 px-3 py-1 rounded-full">{post.category}</span>
            <span className="bg-forest/10 px-3 py-1 rounded-full">{post.season}</span>
            <span className="text-walnut">{post.year}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl mb-4 text-charcoal leading-tight">
            {post.title}
          </h1>
          <time className="text-walnut text-sm">{post.date}</time>
        </header>

        {/* Featured image */}
        {post.featuredImage && (
          <div className="mb-12 -mx-6">
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
              priority
            />
          </div>
        )}

        {/* Post content */}
        <div className="prose prose-lg max-w-none">
          <MDXRemote source={post.content} />
        </div>

        {/* Footer navigation */}
        <footer className="mt-16 pt-8 border-t border-walnut/20">
          <Link
            href="/updates"
            className="inline-flex items-center text-forest hover:text-sage transition-colors font-medium"
          >
            ← Back to all updates
          </Link>
        </footer>
      </div>
    </article>
  );
}
