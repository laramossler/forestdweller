# Forest Dweller

A minimal, beautiful website for documenting forest restoration work, craft projects, recipes, and seasonal observations from 50 acres in the Pacific Northwest.

## Philosophy

- **Anti-social-media**: No engagement hacks, no infinite scroll, no share buttons
- **Anti-algorithmic**: No "related posts" widgets, no tracking
- **Built to last decades**: Not chasing trends
- **Performance and accessibility**: Non-negotiable

## Tech Stack

- **Next.js 14+** (App Router)
- **Tailwind CSS** (custom design system)
- **MDX** for content (Markdown with embedded React components)
- **TypeScript** for type safety
- **Deployed to Vercel**

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Content Management

Posts are stored as MDX files in `/content/posts/`.

### Creating a New Post

1. Create a new `.mdx` file in `/content/posts/`
2. Add frontmatter with required metadata:

```yaml
---
title: Your Post Title
date: YYYY-MM-DD
category: 'Forest' | 'Craft' | 'Kitchen' | 'DIY' | 'Reflections'
season: 'Spring' | 'Summer' | 'Fall' | 'Winter'
year: 2025
featuredImage: /images/your-image.jpg (optional)
excerpt: A brief description (optional, auto-generates from first 150 chars)
---
```

3. Write your content in Markdown below the frontmatter
4. Deploy - the site will automatically rebuild

### Adding Images

1. Place images in `/public/images/`
2. Reference them in MDX: `/images/your-image.jpg`
3. Images are automatically optimized with next/image

## Design System

### Color Palette

- **Deep Forest**: `#2C5F2D`
- **Sage**: `#97BC62`
- **Warm White**: `#F4F1EA`
- **Walnut**: `#8B7355`
- **Charcoal**: `#2B2B2B`
- **Clay**: `#C17C5B`

### Typography

- **Headings**: Crimson Text (serif) - 42px/32px/24px
- **Body**: Inter (sans-serif) - 18px with 1.78 line-height
- **Max content width**: 680px

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure build settings
4. Deploy!

### Environment Variables

No environment variables are required for basic deployment.

## Project Structure

```
forestdweller/
├── app/                    # Next.js app directory
│   ├── components/         # React components
│   ├── about/             # About page
│   ├── archive/           # Archive page with filters
│   ├── updates/           # Updates feed and individual posts
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles and design system
├── content/
│   └── posts/             # MDX blog posts
├── lib/
│   ├── posts.ts           # Post reading/parsing utilities
│   └── types.ts           # TypeScript type definitions
├── public/                # Static assets
└── mdx-components.tsx     # MDX component customization
```

## License

All rights reserved.

## Built to Last

This project is designed for longevity, not trends. No tracking, no analytics, no engagement optimization. Just honest documentation of real work.
