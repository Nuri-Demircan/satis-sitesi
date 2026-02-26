import React, { useEffect, useState } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import type { Product } from '../types';
import { Search, Package } from 'lucide-react';
import { CONFIG } from '../config';

const ProductsPage: React.FC = () => {
    const { products, loading } = useProducts();
    const [query, setQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        document.title = `Ürünlerimiz — ${CONFIG.COMPANY.name}`;
    }, []);

    const filtered = products.filter(
        p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <>
            {/* Page Header */}
            <section className="hero-gradient pt-28 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
                        Ürünlerimiz
                    </h1>
                    <p className="text-green-200 text-lg max-w-xl mx-auto mb-8">
                        Doğal ve katkısız yem çeşitlerimizi keşfedin. Bir ürüne tıklayarak detaylarını görün.
                    </p>

                    {/* Search */}
                    <div className="max-w-md mx-auto relative">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Ürün ara..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white text-gray-700 placeholder-gray-400 shadow-md text-sm border-0 focus:ring-2 focus:ring-green-300"
                        />
                    </div>
                </div>

                {/* Wave */}
                <div className="relative mt-10">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 60H1440V30C1200 60 900 0 720 15C540 30 240 60 0 30V60Z" fill="#f8f4e9" />
                    </svg>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16 bg-cream min-h-[60vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        /* Skeleton loader */
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                                    <div className="h-52 bg-gray-200" />
                                    <div className="p-5 space-y-3">
                                        <div className="h-5 bg-gray-200 rounded w-3/4" />
                                        <div className="h-4 bg-gray-200 rounded w-full" />
                                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                                        <div className="h-10 bg-gray-200 rounded-xl mt-4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-20">
                            <Package size={56} className="text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-500 mb-1">Ürün bulunamadı</h3>
                            <p className="text-gray-400 text-sm">
                                {query ? `"${query}" için sonuç yok.` : 'Henüz ürün eklenmemiş.'}
                            </p>
                        </div>
                    ) : (
                        <>
                            <p className="text-gray-500 text-sm mb-6">
                                {filtered.length} ürün gösteriliyor
                                {query && ` — "${query}" için`}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filtered.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onView={setSelectedProduct}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Product Detail Modal */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </>
    );
};

export default ProductsPage;
