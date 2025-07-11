import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, FileText, Briefcase, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getPosts } from "@/lib/services/blog-service";
import { getPortfolioItems } from "@/lib/services/portfolio-service";

export const revalidate = 60; // Revalidate data every 60 seconds

export default async function AdminDashboardPage() {
  const posts = await getPosts();
  const portfolioItems = await getPortfolioItems();

  const recentPosts = posts.slice(0, 3);
  const recentProjects = portfolioItems.slice(0, 3);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6 font-headline">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blog Viewers</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78,921</div>
            <p className="text-xs text-muted-foreground">+15.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.length}</div>
            <p className="text-xs text-muted-foreground">Total published posts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Items</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioItems.length}</div>
            <p className="text-xs text-muted-foreground">Total projects showcased</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline">Recent Blog Posts</CardTitle>
              <CardDescription>A quick look at your latest articles.</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/blog">Manage Blog</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map(post => (
                <div key={post.id} className="flex items-start gap-4">
                  <div className="flex-grow">
                     <Link href={`/blog/${post.slug}`} className="font-semibold hover:underline" target="_blank">
                      {post.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">{post.author} &middot; {new Date(post.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline">Recent Portfolio Projects</CardTitle>
              <CardDescription>Your latest showcased work.</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/portfolio">Manage Portfolio</Link>
            </Button>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
              {recentProjects.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                   <Image
                      alt={item.title}
                      className="aspect-square rounded-md object-cover"
                      height="48"
                      src={item.imageUrl}
                      width="48"
                      data-ai-hint={item.hint}
                    />
                  <div className="flex-grow">
                    <p className="font-semibold">{item.title}</p>
                    <div className="text-sm text-muted-foreground"><Badge variant="outline" className="text-xs">{item.category}</Badge></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
