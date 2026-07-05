"use client";

import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFirebaseConfig } from "@/lib/firebase/config";

let analyticsInstance: Analytics | null = null;

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

export async function getClientAnalytics() {
  if (analyticsInstance) return analyticsInstance;
  if (typeof window === "undefined") return null;

  const supported = await isSupported();
  if (!supported) return null;

  analyticsInstance = getAnalytics(getFirebaseApp());
  return analyticsInstance;
}
