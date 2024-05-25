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

const ref = collection(db, "tasks");

export async function getById(taskId) {
  const taskRef = doc(ref, taskId);
  const taskSnap = await getDoc(taskRef);
  return taskSnap.exists() ? taskSnap.data() : null;
}

export async function getByTitle(title) {
  const q = query(ref, where("title", "==", title), limit(1));
  const querySnap = await getDocs(q);

  return !querySnap.empty ? querySnap.docs[0].data() : null;
}

export async function getAllUserTasks(userId) {
  const q = query(ref, where("userId", "==", userId));
  const querySnap = await getDocs(q);
  const tasks = querySnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return tasks;
}

export async function createTask(userId, title, description, status) {
  await addDoc(ref, {
    userId,
    title,
    description,
    status,
  });
}

export async function editTask(taskId, title, description) {
  const taskRef = doc(ref, taskId);
  await updateDoc(taskRef, {
    title,
    description,
  });
}

export async function deleteTask(taskId) {
  const taskRef = doc(ref, taskId);
  await deleteDoc(taskRef);
}

export async function updateTaskStatus(taskId, status) {
  const taskRef = doc(ref, taskId);
  await updateDoc(taskRef, {
    status: !status,
  });
}
