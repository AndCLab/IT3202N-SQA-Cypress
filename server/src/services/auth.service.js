import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  limit,
} from "firebase/firestore";
import db from "../utils/firebase.js";
import bcrypt from "bcrypt";

const ref = collection(db, "users");

export async function getByUsername(username) {
  const q = query(ref, where("username", "==", username), limit(1));
  const querySnap = await getDocs(q);

  return !querySnap.empty
    ? {
        id: querySnap.docs[0].id,
        ...querySnap.docs[0].data(),
      }
    : null;
}

export async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await addDoc(ref, {
    username,
    password: hashedPassword,
  });
}

export function comparePassword(password, encryptedPassword) {
  return bcrypt.compareSync(password, encryptedPassword);
}
