import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/posts';

export const metadata = {
  title: 'Updates | Forest Dweller',
  description: 'Latest updates on forest restoration, craft projects, recipes, and seasonal observations',
};

export default function UpdatesPage() {
  const posts = getAllPosts();

  return (
    <div className="py-16 bg-warm-white min-h-screen">
      <div className="max-w-[680px] mx-auto px-6">
        <h1 className="font-serif text-4xl md:text-5xl mb-4 text-center text-charcoal">
          Updates
        </h1>
        <p className="text-center text-walnut mb-12 leading-[1.78]">
          Reverse chronological documentation of work, observations, and learning
        </p>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-walnut text-lg">No updates yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-12">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-warm-white rounded-lg shadow-sm border border-walnut/10 overflow-hidden hover:shadow-md transition-shadow"
              >
                {post.featuredImage && (
                  <Link href={`/updates/${post.slug}`}>
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      width={680}
                      height={400}
                      className="w-full h-64 object-cover hover:opacity-95 transition-opacity"
                    />
                  </Link>
                )}
                <div className="p-8">
                  <div className="flex gap-3 mb-4 text-sm text-walnut">
                    <span className="bg-sage/20 px-3 py-1 rounded-full">{post.category}</span>
                    <span className="bg-forest/10 px-3 py-1 rounded-full">{post.season}</span>
                    <span className="text-walnut">{post.year}</span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl mb-3">
                    <Link
                      href={`/updates/${post.slug}`}
                      className="text-charcoal hover:text-forest transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <time className="text-walnut text-sm block mb-4">{post.date}</time>
                  {post.excerpt && (
                    <p className="text-charcoal leading-[1.78] mb-6">{post.excerpt}</p>
                  )}
                  <Link
                    href={`/updates/${post.slug}`}
                    className="inline-block text-forest hover:text-sage transition-colors font-medium underline"
                  >
                    Read full post →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
