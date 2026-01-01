import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostMetadata } from './types';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPosts(): PostMetadata[] {
  // Ensure directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      // Generate excerpt if not provided
      const excerpt = data.excerpt || '';

      return {
        slug,
        title: data.title,
        date: typeof data.date === 'string' ? data.date : data.date.toISOString().split('T')[0],
        category: data.category,
        season: data.season,
        year: data.year,
        featuredImage: data.featuredImage,
        excerpt,
      } as PostMetadata;
    });

  // Sort posts by date (most recent first)
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Auto-generate excerpt from first 150 characters if not provided
    const excerpt = data.excerpt || content.slice(0, 150).trim() + '...';

    return {
      slug,
      title: data.title,
      date: typeof data.date === 'string' ? data.date : data.date.toISOString().split('T')[0],
      category: data.category,
      season: data.season,
      year: data.year,
      featuredImage: data.featuredImage,
      excerpt,
      content,
    } as Post;
  } catch {
    return null;
  }
}

export function getPostsByCategory(category: string): PostMetadata[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.category === category);
}

export function getPostsBySeason(season: string): PostMetadata[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.season === season);
}

export function getPostsByYear(year: number): PostMetadata[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.year === year);
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts();
  const categories = new Set(allPosts.map((post) => post.category));
  return Array.from(categories).sort();
}

export function getAllSeasons(): string[] {
  const allPosts = getAllPosts();
  const seasons = new Set(allPosts.map((post) => post.season));
  return Array.from(seasons).sort();
}

export function getAllYears(): number[] {
  const allPosts = getAllPosts();
  const years = new Set(allPosts.map((post) => post.year));
  return Array.from(years).sort((a, b) => b - a);
}
