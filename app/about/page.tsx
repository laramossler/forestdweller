export const metadata = {
  title: 'About | Forest Dweller',
  description: 'Learn about the forest restoration work, the land, and the mission behind Forest Dweller',
};

export default function AboutPage() {
  return (
    <div className="py-16 bg-warm-white min-h-screen">
      <div className="max-w-[680px] mx-auto px-6">
        <h1 className="font-serif text-4xl md:text-5xl mb-12 text-center text-charcoal">
          About
        </h1>

        <div className="space-y-12">
          {/* The Story */}
          <section>
            <h2 className="font-serif text-3xl mb-6 text-charcoal">The Story</h2>
            <div className="space-y-4 text-charcoal leading-[1.78]">
              <p>
                This project began with 50 acres of degraded forest land in the Pacific Northwest
                and a simple question: What does it take to restore what's been lost?
              </p>
              <p>
                The land had been logged, subdivided, and neglected. Invasive species dominated.
                Native trees struggled. The soil was compacted. But beneath the damage, the forest
                was waiting.
              </p>
              <p>
                Forest Dweller is the documentation of this restoration work—not as a polished
                success story, but as an honest record of learning, mistakes, small victories, and
                the slow transformation of the land.
              </p>
            </div>
          </section>

          {/* The Land */}
          <section className="pt-8 border-t border-walnut/20">
            <h2 className="font-serif text-3xl mb-6 text-charcoal">The Land</h2>
            <div className="space-y-4 text-charcoal leading-[1.78]">
              <p>
                50 acres of mixed forest in the western Cascades. Douglas fir, western red cedar,
                bigleaf maple, red alder. Second growth struggling to become something more.
              </p>
              <p>
                The work includes removing invasive species (English ivy, Himalayan blackberry,
                holly), thinning overcrowded stands, replanting natives, building water retention
                systems, and learning to work with the land rather than against it.
              </p>
              <p>
                This is also a place for craft work—building structures with timber from the land,
                working with natural materials, and creating functional beauty that lasts.
              </p>
            </div>
          </section>

          {/* The Mission */}
          <section className="pt-8 border-t border-walnut/20">
            <h2 className="font-serif text-3xl mb-6 text-charcoal">The Mission</h2>
            <div className="space-y-4 text-charcoal leading-[1.78]">
              <p>
                Forest Dweller exists to document this work in a way that resists the extractive
                nature of modern digital platforms.
              </p>
              <p className="font-medium">This means:</p>
              <ul className="space-y-2 ml-6 list-disc">
                <li>No algorithms deciding what you see</li>
                <li>No engagement metrics optimizing for attention</li>
                <li>No tracking your behavior to sell ads</li>
                <li>No "related content" designed to keep you scrolling</li>
                <li>No social sharing widgets begging for viral growth</li>
              </ul>
              <p>
                Just honest updates about real work, published when there's something worth
                sharing. This site is built to last decades, not chase trends. It's designed to be
                read, not optimized for engagement.
              </p>
              <p>
                If this approach resonates with you, subscribe to occasional email updates. No
                spam. No tracking. Just simple notifications when there's new work to share.
              </p>
            </div>
          </section>

          {/* Contact/Subscribe */}
          <section className="pt-8 border-t border-walnut/20">
            <div className="bg-forest/5 rounded-lg p-8 border border-forest/10">
              <h2 className="font-serif text-2xl mb-4 text-center text-charcoal">
                Stay Connected
              </h2>
              <p className="text-charcoal text-center mb-6 leading-[1.78]">
                Get occasional updates when there's something worth sharing.
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
          </section>
        </div>
      </div>
    </div>
  );
}
