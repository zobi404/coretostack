"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Comment } from "@/lib/types";

interface CommentSectionProps {
  initialComments: Comment[];
  postId: string;
}

export default function CommentSection({ initialComments, postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    // In a real app, you would send this to a Firebase Firestore backend
    // and listen for real-time updates.
    // For now, we'll simulate the update locally.
    await new Promise(res => setTimeout(res, 500));
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: "Guest User",
      authorImage: "https://placehold.co/100x100.png",
      timestamp: "Just now",
      text: newComment,
    };

    setComments([comment, ...comments]);
    setNewComment("");
    setIsSubmitting(false);
  };

  return (
    <Card className="mt-12">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{comments.length} Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid w-full gap-2">
            <Textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
            />
            <Button type="submit" disabled={isSubmitting || !newComment.trim()} className="w-fit">
              {isSubmitting ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </form>
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={comment.authorImage} alt={comment.author} />
                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{comment.author}</p>
                  <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                </div>
                <p className="text-muted-foreground mt-1">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
