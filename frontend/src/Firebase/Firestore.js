import { db } from "./Firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Save a note in Firestore
export async function addNote(title, content) {
  await addDoc(collection(db, "notes"), {
    title: title,
    content: content,
    timestamp: new Date(),
  });
}

// Fetch all notes from Firestore
export async function fetchNotes() {
  const querySnapshot = await getDocs(collection(db, "notes"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
