import { db } from "@/lib/firebase";
import type { Post } from "@/lib/types";
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";

function createSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Remove consecutive hyphens
      .trim();
}  

const postsCollection = collection(db, "posts");

// CREATE
export async function addPost(post: Omit<Post, 'slug' | 'id'> & { id?: string }) {
    const slug = createSlug(post.title);
    const newPostData = { ...post, slug };
    const docRef = await addDoc(postsCollection, newPostData);
    return { ...newPostData, id: docRef.id };
}

// READ (all)
export async function getPosts(): Promise<Post[]> {
    if (!db) {
        console.error("Firestore is not initialized.");
        return [];
    }
    const snapshot = await getDocs(postsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
}

// READ (one by slug)
export async function getPost(slug: string): Promise<Post | null> {
    const q = query(postsCollection, where("slug", "==", slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return null;
    }
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Post;
}

// READ (one by ID)
export async function getPostById(id: string): Promise<Post | null> {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Post;
    }
    return null;
}


// UPDATE
export async function updatePost(id: string, post: Partial<Post>) {
    const docRef = doc(db, "posts", id);
    // If title is updated, slug should be too
    if (post.title) {
        post.slug = createSlug(post.title);
    }
    await updateDoc(docRef, post);
}

// DELETE
export async function deletePost(id: string) {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
}