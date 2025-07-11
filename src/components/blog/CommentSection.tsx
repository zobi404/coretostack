"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import type { Comment } from "@/lib/types";
import { addComment, getComments } from "@/lib/services/comment-service";

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasCommented, setHasCommented] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Client-side check to see if user has already commented on this post
    const commented = localStorage.getItem(`commented_on_${postId}`);
    if (commented) {
      setHasCommented(true);
    }

    async function fetchComments() {
      try {
        setLoading(true);
        const fetchedComments = await getComments(postId);
        setComments(fetchedComments);
      } catch (error) {
        console.error("Failed to load comments:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load comments for this post.",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, [postId, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || hasCommented) return;

    setIsSubmitting(true);
    
    try {
      const commentToAdd: Omit<Comment, 'id' | 'createdAt'> = {
        postId,
        author: "Guest User", // In a real app, this would come from an auth context
        authorImage: "https://placehold.co/100x100.png",
        text: newComment,
      };

      const addedComment = await addComment(commentToAdd);
      
      setComments([addedComment, ...comments]);
      setNewComment("");
      
      // Set flag in local storage
      localStorage.setItem(`commented_on_${postId}`, 'true');
      setHasCommented(true);

      toast({
        title: "Success!",
        description: "Your comment has been posted.",
      });

    } catch (error) {
      console.error("Failed to post comment:", error);
       toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to post your comment. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mt-12">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{loading ? 'Comments' : `${comments.length} Comments`}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid w-full gap-2">
            <Textarea
              placeholder={hasCommented ? "You have already commented on this post." : "Write a comment..."}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              disabled={isSubmitting || hasCommented}
            />
            <Button type="submit" disabled={isSubmitting || !newComment.trim() || hasCommented} className="w-fit">
              {isSubmitting ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </form>
        {loading ? (
            <div className="space-y-6">
                {[...Array(2)].map((_, i) => <CommentSkeleton key={i} />)}
            </div>
        ) : (
            <div className="space-y-6">
            {comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-4">
                <Avatar>
                    <AvatarImage src={comment.authorImage} alt={comment.author} data-ai-hint="person avatar" />
                    <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                    <p className="font-semibold">{comment.author}</p>
                    <p className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleString()}
                    </p>
                    </div>
                    <p className="text-muted-foreground mt-1 whitespace-pre-wrap">{comment.text}</p>
                </div>
                </div>
            ))}
            </div>
        )}
      </CardContent>
    </Card>
  );
}

function CommentSkeleton() {
    return (
        <div className="flex items-start space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-5/6" />
            </div>
        </div>
    )
}
