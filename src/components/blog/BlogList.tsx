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

    useEffect(() => {
        async function loadPosts() {
            try {
                const fetchedPosts = await getPosts();
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        }
        loadPosts();
    }, []);

    if (loading) {
        return <BlogListSkeleton />;
    }

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Card className="h-full flex flex-col transition-shadow hover:shadow-2xl bg-card border-none">
                <CardHeader className="p-0">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        data-ai-hint={post.imageHint}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    </div>
                </CardHeader>
                <CardContent className="flex-grow p-6">
                    <div className="mb-3">
                    {post.tags.map(tag => <Badge key={tag} variant="secondary" className="mr-2">{tag}</Badge>)}
                    </div>
                    <CardTitle className="font-headline text-2xl leading-tight mb-3">{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                    <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={post.authorImage} alt={post.author} />
                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-semibold">{post.author}</p>
                        <p className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString()}</p>
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
            {[...Array(3)].map((_, i) => (
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
