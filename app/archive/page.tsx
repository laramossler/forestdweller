import { getAllPosts, getAllCategories, getAllSeasons, getAllYears } from '@/lib/posts';
import ArchiveClient from './ArchiveClient';

export const metadata = {
  title: 'Archive | Forest Dweller',
  description: 'Browse all updates by category, season, or year',
};

export default function ArchivePage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const seasons = getAllSeasons();
  const years = getAllYears();

  return (
    <div className="py-16 bg-warm-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="font-serif text-4xl md:text-5xl mb-4 text-center text-charcoal">
          Archive
        </h1>
        <p className="text-center text-walnut mb-12 leading-[1.78]">
          Browse all updates by category, season, or year
        </p>

        <ArchiveClient
          posts={posts}
          categories={categories}
          seasons={seasons}
          years={years}
        />
      </div>
    </div>
  );
}
