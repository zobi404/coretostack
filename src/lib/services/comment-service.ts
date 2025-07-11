import { db } from "@/lib/firebase";
import type { Comment } from "@/lib/types";
import { collection, addDoc, query, where, getDocs, orderBy, serverTimestamp, Timestamp } from "firebase/firestore";

const commentsCollection = collection(db, "comments");

// CREATE
export async function addComment(comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
    const newCommentData = {
        ...comment,
        createdAt: serverTimestamp()
    };
    const docRef = await addDoc(commentsCollection, newCommentData);
    
    // We can't get the server timestamp back immediately, so we'll use the client's time for the return value
    return {
        ...comment,
        id: docRef.id,
        createdAt: new Date().toISOString()
    };
}

// READ (for a specific post)
export async function getComments(postId: string): Promise<Comment[]> {
    if (!db) {
        console.error("Firestore is not initialized.");
        return [];
    }
    const q = query(
        commentsCollection,
        where("postId", "==", postId),
        orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => {
        const data = doc.data();
        const createdAt = data.createdAt as Timestamp;
        return {
            id: doc.id,
            ...data,
            createdAt: createdAt ? createdAt.toDate().toISOString() : new Date().toISOString()
        } as Comment;
    });
}
