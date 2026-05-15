"use client";

import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut 
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";

export async function loginWithEmail(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "/dashboard";
  } catch (error: any) {
    window.location.href = `/login?error=${encodeURIComponent(error.message)}`;
  }
}

export async function signupWithEmail(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = "/dashboard";
  } catch (error: any) {
    window.location.href = `/login?error=${encodeURIComponent(error.message)}`;
  }
}

export async function logout() {
  await firebaseSignOut(auth);
  window.location.href = "/";
}
