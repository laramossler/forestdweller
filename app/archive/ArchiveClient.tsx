'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { PostMetadata } from '@/lib/types';

interface ArchiveClientProps {
  posts: PostMetadata[];
  categories: string[];
  seasons: string[];
  years: number[];
}

export default function ArchiveClient({
  posts,
  categories,
  seasons,
  years,
}: ArchiveClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSeason, setSelectedSeason] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');

  const filteredPosts = posts.filter((post) => {
    if (selectedCategory && post.category !== selectedCategory) return false;
    if (selectedSeason && post.season !== selectedSeason) return false;
    if (selectedYear && post.year !== parseInt(selectedYear)) return false;
    return true;
  });

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedSeason('');
    setSelectedYear('');
  };

  const hasActiveFilters = selectedCategory || selectedSeason || selectedYear;

  return (
    <div>
      {/* Filters */}
      <div className="mb-12 bg-warm-white rounded-lg p-6 border border-walnut/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Category filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-charcoal mb-2">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-walnut/30 focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 bg-warm-white"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Season filter */}
          <div>
            <label htmlFor="season" className="block text-sm font-medium text-charcoal mb-2">
              Season
            </label>
            <select
              id="season"
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-walnut/30 focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 bg-warm-white"
            >
              <option value="">All Seasons</option>
              {seasons.map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
            </select>
          </div>

          {/* Year filter */}
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-charcoal mb-2">
              Year
            </label>
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-walnut/30 focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 bg-warm-white"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reset button */}
        {hasActiveFilters && (
          <div className="text-center">
            <button
              onClick={resetFilters}
              className="text-forest hover:text-sage transition-colors font-medium underline text-sm"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="mb-6 text-center text-walnut">
        Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'update' : 'updates'}
      </div>

      {/* Posts grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-walnut text-lg">No updates match your filters.</p>
          <button
            onClick={resetFilters}
            className="mt-4 text-forest hover:text-sage transition-colors font-medium underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-warm-white rounded-lg shadow-sm border border-walnut/10 overflow-hidden hover:shadow-md transition-shadow"
            >
              {post.featuredImage && (
                <Link href={`/updates/${post.slug}`}>
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover hover:opacity-95 transition-opacity"
                  />
                </Link>
              )}
              <div className="p-6">
                <div className="flex gap-2 mb-3 text-xs text-walnut flex-wrap">
                  <span className="bg-sage/20 px-2 py-1 rounded-full">{post.category}</span>
                  <span className="bg-forest/10 px-2 py-1 rounded-full">{post.season}</span>
                  <span className="text-walnut">{post.year}</span>
                </div>
                <h2 className="font-serif text-xl mb-2">
                  <Link
                    href={`/updates/${post.slug}`}
                    className="text-charcoal hover:text-forest transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <time className="text-walnut text-xs block mb-3">{post.date}</time>
                {post.excerpt && (
                  <p className="text-charcoal leading-[1.78] text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
