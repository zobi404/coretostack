import { db } from "@/lib/firebase";
import type { PortfolioItem } from "@/lib/types";
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

const portfolioCollection = collection(db, "portfolioItems");

// CREATE
export async function addPortfolioItem(item: Omit<PortfolioItem, 'id'>) {
    const docRef = await addDoc(portfolioCollection, item);
    return { ...item, id: docRef.id };
}

// READ (all)
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
    if (!db) {
        console.error("Firestore is not initialized.");
        return [];
    }
    const snapshot = await getDocs(portfolioCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PortfolioItem));
}

// READ (one)
export async function getPortfolioItem(id: string): Promise<PortfolioItem | null> {
    const docRef = doc(db, "portfolioItems", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as PortfolioItem;
    }
    return null;
}

// UPDATE
export async function updatePortfolioItem(id: string, item: Partial<PortfolioItem>) {
    const docRef = doc(db, "portfolioItems", id);
    await updateDoc(docRef, item);
}

// DELETE
export async function deletePortfolioItem(id: string) {
    const docRef = doc(db, "portfolioItems", id);
    await deleteDoc(docRef);
}