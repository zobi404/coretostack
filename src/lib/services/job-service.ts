import { db } from "@/lib/firebase";
import type { JobOpening } from "@/lib/types";
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, orderBy, query } from "firebase/firestore";

const jobsCollection = collection(db, "jobs");

// CREATE
export async function addJobOpening(job: Omit<JobOpening, 'id'>) {
    const docRef = await addDoc(jobsCollection, job);
    return { ...job, id: docRef.id };
}

// READ (all)
export async function getJobOpenings(): Promise<JobOpening[]> {
    if (!db) {
        console.error("Firestore is not initialized.");
        return [];
    }
    const q = query(jobsCollection, orderBy("title"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as JobOpening));
}

// READ (one)
export async function getJobOpening(id: string): Promise<JobOpening | null> {
    const docRef = doc(db, "jobs", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as JobOpening;
    }
    return null;
}

// UPDATE
export async function updateJobOpening(id: string, job: Partial<JobOpening>) {
    const docRef = doc(db, "jobs", id);
    await updateDoc(docRef, job);
}

// DELETE
export async function deleteJobOpening(id: string) {
    const docRef = doc(db, "jobs", id);
    await deleteDoc(docRef);
}
