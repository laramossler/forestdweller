export type Category = 'Forest' | 'Craft' | 'Kitchen' | 'DIY' | 'Reflections';
export type Season = 'Spring' | 'Summer' | 'Fall' | 'Winter';

export interface PostMetadata {
  title: string;
  date: string;
  category: Category;
  season: Season;
  year: number;
  featuredImage?: string;
  excerpt?: string;
  slug: string;
}

export interface Post extends PostMetadata {
  content: string;
}
