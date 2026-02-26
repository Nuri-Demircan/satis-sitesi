import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: 'AIzaSyBp8lMaLPfcR1WU8hC0NHpiLXsdkuNysF0',
    authDomain: 'yem-satis-sitesi.firebaseapp.com',
    projectId: 'yem-satis-sitesi',
    storageBucket: 'yem-satis-sitesi.firebasestorage.app',
    messagingSenderId: '685195311437',
    appId: '1:685195311437:web:20b66a228e78ccaaea1f04',
    measurementId: 'G-J28NRYMBE3',
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
