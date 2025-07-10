import type { Post, Comment } from './types';

export const mockPosts: Post[] = [
  {
    slug: 'the-art-of-minimalist-design',
    title: 'The Art of Minimalist Design',
    excerpt: 'Discover how less can be more in UI/UX. We explore the principles of minimalist design and its impact on user engagement.',
    author: 'John Smith',
    authorImage: 'https://placehold.co/100x100.png',
    date: '2024-05-15',
    imageUrl: 'https://placehold.co/1200x630.png',
    imageHint: 'minimalist workspace',
    tags: ['UI/UX', 'Design Principles'],
    content: `
      <p>Minimalism in design is not just about what you remove, but about making what remains more impactful. It's a philosophy that has permeated various art forms, and in the digital realm, it translates to cleaner, more intuitive user interfaces.</p>
      <h2 class="font-headline text-2xl font-bold my-4">Why Less is More</h2>
      <p>A minimalist UI reduces cognitive load on the user. By removing unnecessary elements, you guide the user's attention to the most important actions and content. This leads to higher conversion rates and a more pleasant user experience.</p>
      <ul class="list-disc pl-5 my-4 space-y-2">
        <li><strong>Improved Focus:</strong> Users can complete tasks faster without distractions.</li>
        <li><strong>Faster Load Times:</strong> Fewer elements mean smaller page sizes and quicker rendering.</li>
        <li><strong>Timeless Aesthetic:</strong> Minimalist designs tend to age better than trend-heavy ones.</li>
      </ul>
      <p>At CodeToStack, we embrace minimalist principles to create designs that are not only beautiful but also highly functional. It's about finding the perfect balance between form and function.</p>
    `
  },
  {
    slug: 'building-scalable-web-apps-with-nextjs',
    title: 'Building Scalable Web Apps with Next.js',
    excerpt: 'A deep dive into the architecture and best practices for creating scalable and performant web applications using Next.js.',
    author: 'Emily White',
    authorImage: 'https://placehold.co/100x100.png',
    date: '2024-05-10',
    imageUrl: 'https://placehold.co/1200x630.png',
    imageHint: 'code on screen',
    tags: ['Web Development', 'Next.js', 'React'],
    content: `
      <p>Next.js has become the go-to framework for building modern React applications. Its powerful features like Server-Side Rendering (SSR), Static Site Generation (SSG), and API routes make it an excellent choice for projects of any scale.</p>
      <h2 class="font-headline text-2xl font-bold my-4">Key Features for Scalability</h2>
      <p>When building for scale, several Next.js features are indispensable:</p>
      <ul class="list-disc pl-5 my-4 space-y-2">
        <li><strong>Incremental Static Regeneration (ISR):</strong> Update static content without a full rebuild, perfect for large e-commerce sites or blogs.</li>
        <li><strong>Middleware:</strong> Run code before a request is completed. Use it for authentication, A/B testing, and more, at the edge for maximum performance.</li>
        <li><strong>App Router:</strong> The new App Router with Server Components reduces client-side JavaScript, leading to faster initial page loads.</li>
      </ul>
      <p>By leveraging these features, we can build applications that handle high traffic loads while remaining easy to maintain and extend.</p>
    `
  },
];

export const mockComments: Comment[] = [
    { id: '1', author: 'Alice', authorImage: 'https://placehold.co/100x100.png', timestamp: '2 hours ago', text: 'Great article! Really clarified some concepts for me.' },
    { id: '2', author: 'Bob', authorImage: 'https://placehold.co/100x100.png', timestamp: '1 hour ago', text: 'I love the focus on user experience. It\'s so often overlooked.' },
];
