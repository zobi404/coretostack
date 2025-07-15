"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getPosts } from "@/lib/services/blog-service";
import type { Post } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export function BlogList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadPosts() {
            try {
                setError(null);
                const fetchedPosts = await getPosts();
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
                setError("Failed to load blog posts. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        loadPosts();
    }, []);

    if (loading) {
        return <BlogListSkeleton />;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Failed to load posts</h3>
                    <p className="text-muted-foreground">{error}</p>
                </div>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">No blog posts yet</h3>
                    <p className="text-muted-foreground">Check back later for new content!</p>
                </div>
            </div>
        );
    }

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {posts.map((post) => (
                <Link key={post.slug || post.id} href={`/blog/${post.slug || post.id}`} className="group">
                    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-card border-2 border-primary hover:shadow-primary">
                        <CardHeader className="p-0">
                            <div className="aspect-video relative overflow-hidden rounded-t-lg">
                                {post.imageUrl ? (
                                    <Image
                                        src={post.imageUrl}
                                        alt={post.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                            const img = e.target as HTMLImageElement;
                                            img.src = '/images/placeholder-blog.jpg'; // Fallback image
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-muted flex items-center justify-center">
                                        <span className="text-muted-foreground">No image</span>
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow p-6">
                            <div className="mb-3 flex flex-wrap gap-2">
                                {post.tags?.map(tag => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                            <CardTitle className="font-headline text-xl md:text-2xl leading-tight mb-3 group-hover:text-primary transition-colors duration-300">
                                {post.title}
                            </CardTitle>
                            <CardDescription className="text-sm text-muted-foreground line-clamp-3">
                                {post.excerpt}
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="p-6 pt-0">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage 
                                        src={post.authorImage} 
                                        alt={post.author}
                                        onError={(e) => {
                                            const img = e.target as HTMLImageElement;
                                            img.style.display = 'none';
                                        }}
                                    />
                                    <AvatarFallback className="text-sm font-semibold">
                                        {post.author?.charAt(0)?.toUpperCase() || 'A'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold truncate">{post.author}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {post.date ? new Date(post.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        }) : 'No date'}
                                    </p>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </Link>
            ))}
        </section>
    );
}

export function BlogListSkeleton() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {[...Array(6)].map((_, i) => (
                <Card key={i} className="h-full flex flex-col bg-card border-none">
                    <CardHeader className="p-0">
                        <Skeleton className="aspect-video w-full rounded-t-lg" />
                    </CardHeader>
                    <CardContent className="flex-grow p-6 space-y-4">
                        <div className="flex gap-2">
                           <Skeleton className="h-5 w-16" />
                           <Skeleton className="h-5 w-20" />
                        </div>
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                             <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </section>
    )
}