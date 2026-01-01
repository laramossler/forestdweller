import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import Image from 'next/image';

export default function Home() {
  const posts = getAllPosts();
  const latestPost = posts[0];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-forest text-warm-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-6 text-warm-white">
            Forest Dweller
          </h1>
          <p className="text-xl md:text-2xl text-sage leading-relaxed max-w-2xl mx-auto">
            Documenting forest restoration, craft projects, recipes, and seasonal observations
            from 50 acres in the Pacific Northwest
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-warm-white">
        <div className="max-w-[680px] mx-auto px-6">
          <h2 className="font-serif text-3xl mb-6 text-center">The Mission</h2>
          <div className="prose prose-lg">
            <p className="text-charcoal leading-[1.78] mb-4">
              This is a space for slow documentation—recording the work of restoring degraded
              forest land, building with our hands, cooking with the seasons, and learning from
              the land.
            </p>
            <p className="text-charcoal leading-[1.78]">
              No algorithms. No engagement hacks. No infinite scroll. Just honest updates about
              real work, built to last decades, not chase trends.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Update Preview */}
      {latestPost && (
        <section className="py-16 bg-sage/10">
          <div className="max-w-[680px] mx-auto px-6">
            <h2 className="font-serif text-3xl mb-8 text-center">Latest Update</h2>
            <article className="bg-warm-white rounded-lg shadow-sm p-8 border border-walnut/10">
              {latestPost.featuredImage && (
                <div className="mb-6 -mt-8 -mx-8">
                  <Image
                    src={latestPost.featuredImage}
                    alt={latestPost.title}
                    width={680}
                    height={400}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                </div>
              )}
              <div className="flex gap-3 mb-4 text-sm text-walnut">
                <span className="bg-sage/20 px-3 py-1 rounded-full">{latestPost.category}</span>
                <span className="bg-forest/10 px-3 py-1 rounded-full">{latestPost.season}</span>
              </div>
              <h3 className="font-serif text-2xl mb-3">
                <Link
                  href={`/updates/${latestPost.slug}`}
                  className="text-charcoal hover:text-forest transition-colors"
                >
                  {latestPost.title}
                </Link>
              </h3>
              <time className="text-walnut text-sm block mb-4">{latestPost.date}</time>
              {latestPost.excerpt && (
                <p className="text-charcoal leading-[1.78] mb-6">{latestPost.excerpt}</p>
              )}
              <Link
                href={`/updates/${latestPost.slug}`}
                className="inline-block bg-forest text-warm-white px-6 py-3 rounded-md hover:bg-sage transition-colors font-medium"
              >
                Read Full Update
              </Link>
            </article>
            <div className="text-center mt-8">
              <Link
                href="/updates"
                className="text-forest hover:text-sage transition-colors font-medium underline"
              >
                View all updates →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Email Signup */}
      <section className="py-16 bg-warm-white">
        <div className="max-w-[680px] mx-auto px-6">
          <div className="bg-forest/5 rounded-lg p-8 border border-forest/10">
            <h2 className="font-serif text-2xl mb-4 text-center">Stay Connected</h2>
            <p className="text-charcoal text-center mb-6 leading-[1.78]">
              Get occasional updates when there's something worth sharing. No spam, no tracking,
              no nonsense.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-md border border-walnut/30 focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/20"
                required
              />
              <button
                type="submit"
                className="bg-forest text-warm-white px-6 py-3 rounded-md hover:bg-sage transition-colors font-medium whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
