import { db } from "@/lib/firebase";
import type { PricingPlan } from "@/lib/types";
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";

const pricingCollection = collection(db, "pricingPlans");

// CREATE
export async function addPricingPlan(plan: Omit<PricingPlan, 'id'>) {
    const docRef = await addDoc(pricingCollection, plan);
    return { ...plan, id: docRef.id };
}

// READ (all)
export async function getPricingPlans(): Promise<PricingPlan[]> {
    if (!db) {
        console.error("Firestore is not initialized.");
        return [];
    }
    const snapshot = await getDocs(pricingCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PricingPlan));
}

// READ (one by title)
export async function getPricingPlanByTitle(title: string): Promise<PricingPlan | null> {
    const q = query(pricingCollection, where("title", "==", title));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return null;
    }
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as PricingPlan;
}

// READ (one by ID)
export async function getPricingPlan(id: string): Promise<PricingPlan | null> {
    const docRef = doc(db, "pricingPlans", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as PricingPlan;
    }
    return null;
}

// UPDATE
export async function updatePricingPlan(id: string, plan: Partial<PricingPlan>) {
    const docRef = doc(db, "pricingPlans", id);
    await updateDoc(docRef, plan);
}

// DELETE
export async function deletePricingPlan(id: string) {
    const docRef = doc(db, "pricingPlans", id);
    await deleteDoc(docRef);
}