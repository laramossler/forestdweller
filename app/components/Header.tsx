import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-warm-white border-b border-walnut/20">
      <nav className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold text-forest hover:text-sage transition-colors">
            Forest Dweller
          </Link>
          <ul className="flex gap-8 items-center">
            <li>
              <Link
                href="/updates"
                className="text-charcoal hover:text-forest transition-colors font-medium"
              >
                Updates
              </Link>
            </li>
            <li>
              <Link
                href="/archive"
                className="text-charcoal hover:text-forest transition-colors font-medium"
              >
                Archive
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-charcoal hover:text-forest transition-colors font-medium"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
