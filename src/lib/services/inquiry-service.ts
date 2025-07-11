import { db } from "@/lib/firebase";
import type { Inquiry } from "@/lib/types";
import { collection, doc, getDocs, getDoc, addDoc, deleteDoc, serverTimestamp, query, orderBy } from "firebase/firestore";

const inquiriesCollection = collection(db, "inquiries");

// CREATE
export async function addInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt'>) {
    const docRef = await addDoc(inquiriesCollection, {
        ...inquiry,
        createdAt: serverTimestamp()
    });
    return { ...inquiry, id: docRef.id };
}

// READ (all)
export async function getInquiries(): Promise<Inquiry[]> {
    if (!db) {
        console.error("Firestore is not initialized.");
        return [];
    }
    const q = query(inquiriesCollection, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return { 
            id: doc.id, 
            ...data,
            // Convert Firestore Timestamp to ISO string
            createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
        } as Inquiry
    });
}

// READ (one)
export async function getInquiry(id: string): Promise<Inquiry | null> {
    const docRef = doc(db, "inquiries", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        return { 
            id: docSnap.id, 
            ...data,
            createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
        } as Inquiry;
    }
    return null;
}

// DELETE
export async function deleteInquiry(id: string) {
    const docRef = doc(db, "inquiries", id);
    await deleteDoc(docRef);
}
