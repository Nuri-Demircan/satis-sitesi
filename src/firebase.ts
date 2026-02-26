import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Vercel'de Environment Variables eksikse erken uyarı ver
const requiredEnvVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_APP_ID',
] as const;

for (const key of requiredEnvVars) {
    if (!import.meta.env[key]) {
        throw new Error(
            `❌ Eksik environment variable: ${key}\n` +
            `Vercel panelinden Settings > Environment Variables bölümüne ekleyin.`
        );
    }
}

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Firebase başlatma
const app = initializeApp(firebaseConfig);

// Firestore veritabanı
export const db = getFirestore(app);

// Auth
export const auth = getAuth(app);

// Analytics (sadece tarayıcıda çalışır)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
