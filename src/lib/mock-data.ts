import type { Post, Comment, PortfolioItem, PricingPlan } from './types';

// Mock data is no longer used for main content, but can be kept for other purposes like comments if needed.

export const mockComments: Comment[] = [
    { id: '1', author: 'Alice', authorImage: 'https://placehold.co/100x100.png', timestamp: '2 hours ago', text: 'Great article! Really clarified some concepts for me.' },
    { id: '2', author: 'Bob', authorImage: 'https://placehold.co/100x100.png', timestamp: '1 hour ago', text: 'I love the focus on user experience. It\'s so often overlooked.' },
];
