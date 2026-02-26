import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    collection,
    onSnapshot,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
    query,
    orderBy,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Product, ProductContextType } from '../types';

const ProductContext = createContext<ProductContextType | null>(null);

const COLLECTION = 'products';

// Demo ürünler — Firestore boşsa ilk yüklemede kullanılır
const DEFAULT_PRODUCTS: Omit<Product, 'id'>[] = [
    {
        name: 'Tavuk Yemi (Büyütme)',
        description:
            'Doğal hammaddelerden üretilmiş, katkısız tavuk büyütme yemi. Sağlıklı büyüme için gerekli tüm besin maddeleri içerir.',
        price: '₺850 / 50 kg',
        imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&q=80',
        createdAt: Date.now() - 6000,
    },
    {
        name: 'Dana Besi Yemi',
        description:
            'Yüksek protein ve enerji içeriğiyle dana besiciliği için özel formüle edilmiş doğal karma yem.',
        price: '₺1.200 / 50 kg',
        imageUrl: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&q=80',
        createdAt: Date.now() - 5000,
    },
    {
        name: 'Koyun & Kuzu Yemi',
        description:
            'Koyun ve kuzu beslenmesi için mineral ve vitamin açısından zengin, tamamen doğal içerikli özel karma yem.',
        price: '₺950 / 50 kg',
        imageUrl: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=600&q=80',
        createdAt: Date.now() - 4000,
    },
    {
        name: 'Süt İneği Yemi',
        description:
            'Süt verimini artırmak için özel olarak geliştirilmiş, yüksek enerji ve protein içerikli doğal karma yem.',
        price: '₺1.100 / 50 kg',
        imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=600&q=80',
        createdAt: Date.now() - 3000,
    },
    {
        name: 'Hindi Yemi',
        description:
            'Hindi yetiştiriciliği için özel üretilmiş, doğal tahıl ve protein kaynaklarından oluşan karma yem.',
        price: '₺800 / 50 kg',
        imageUrl: 'https://images.unsplash.com/photo-1501523460185-2aa5d2a0f981?w=600&q=80',
        createdAt: Date.now() - 2000,
    },
    {
        name: 'Balık Unu Katkılı Yem',
        description:
            'Yüksek biyolojik değere sahip balık unu ile zenginleştirilmiş, kümes hayvanları için premium karma yem.',
        price: '₺1.350 / 50 kg',
        imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&q=80',
        createdAt: Date.now() - 1000,
    },
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [seeded, setSeeded] = useState(false);

    // Firestore'dan gerçek zamanlı veri dinle
    useEffect(() => {
        const q = query(collection(db, COLLECTION), orderBy('createdAt', 'asc'));

        const unsubscribe = onSnapshot(
            q,
            async snapshot => {
                const docs = snapshot.docs.map(d => ({
                    id: d.id,
                    ...(d.data() as Omit<Product, 'id'>),
                }));

                // Firestore boşsa demo verileri ekle (sadece bir kez)
                if (docs.length === 0 && !seeded) {
                    setSeeded(true);
                    for (const p of DEFAULT_PRODUCTS) {
                        await addDoc(collection(db, COLLECTION), {
                            ...p,
                            createdAt: serverTimestamp(),
                        });
                    }
                    return; // snapshot tekrar tetiklenecek
                }

                setProducts(docs);
                setLoading(false);
            },
            error => {
                console.error('Firestore bağlantı hatası:', error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [seeded]);

    const addProduct = async (data: Omit<Product, 'id' | 'createdAt'>) => {
        await addDoc(collection(db, COLLECTION), {
            ...data,
            createdAt: serverTimestamp(),
        });
    };

    const updateProduct = async (id: string, data: Omit<Product, 'id' | 'createdAt'>) => {
        await updateDoc(doc(db, COLLECTION, id), { ...data });
    };

    const deleteProduct = async (id: string) => {
        await deleteDoc(doc(db, COLLECTION, id));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, loading }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const ctx = useContext(ProductContext);
    if (!ctx) throw new Error('useProducts, ProductProvider içinde kullanılmalıdır');
    return ctx;
};
