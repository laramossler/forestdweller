import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-serif text-[42px] leading-tight mb-6 text-charcoal">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-[32px] leading-tight mb-4 mt-12 text-charcoal">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-[24px] leading-tight mb-3 mt-8 text-charcoal">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mb-6 text-charcoal leading-[1.78]">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mb-6 ml-6 list-disc space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-6 ml-6 list-decimal space-y-2">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-[1.78]">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-sage pl-6 my-8 italic text-walnut">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-forest underline hover:text-sage transition-colors"
      >
        {children}
      </a>
    ),
    img: (props) => (
      <Image
        {...(props as ImageProps)}
        width={1200}
        height={800}
        className="rounded-lg my-8 w-full h-auto"
        alt={props.alt || ''}
      />
    ),
    ...components,
  };
}
