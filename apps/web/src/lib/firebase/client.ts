"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFirebaseConfig } from "@/lib/firebase/config";

function getFirebaseApp() {
  if (getApps().length) return getApp();
  return initializeApp(getFirebaseConfig());
}

export function getClientAuth() {
  return getAuth(getFirebaseApp());
}

export function getClientFirestore() {
  return getFirestore(getFirebaseApp());
}
