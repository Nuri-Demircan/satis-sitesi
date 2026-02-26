import React, { useEffect } from 'react';
import { X, ShoppingCart, Tag, ImageOff } from 'lucide-react';
import type { Product } from '../types';
import { buildWhatsAppUrl } from '../config';

interface Props {
    product: Product | null;
    onClose: () => void;
}

const ProductModal: React.FC<Props> = ({ product, onClose }) => {
    // ESC tuşu ile kapat
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handler);
        // Scroll kilitle
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handler);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    if (!product) return null;

    const handleBuy = () => {
        const url = buildWhatsAppUrl(
            product.name,
            product.description,
            product.price,
            product.imageUrl
        );
        window.open(url, '_blank');
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fadeInUp"
                style={{ animationDuration: '0.25s' }}
            >
                {/* Görsel Alanı */}
                <div className="relative h-64 bg-green-50 rounded-t-3xl overflow-hidden">
                    {product.imageUrl ? (
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            loading="lazy"
                            className="w-full h-full object-cover"
                            onError={e => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-green-200 gap-2">
                            <ImageOff size={48} />
                            <span className="text-sm text-green-300">Görsel bulunamadı</span>
                        </div>
                    )}

                    {/* Kapat butonu */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-600 shadow-md transition-all hover:scale-110"
                        aria-label="Kapat"
                    >
                        <X size={18} />
                    </button>

                    {/* Fiyat rozeti */}
                    {product.price && (
                        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-green-700 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                            <Tag size={13} />
                            {product.price}
                        </div>
                    )}
                </div>

                {/* İçerik */}
                <div className="p-7">
                    {/* Kategori etiketi */}
                    <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                        🌿 Doğal Yem
                    </div>

                    <h2 className="font-display text-2xl font-bold text-green-900 mb-4 leading-snug">
                        {product.name}
                    </h2>

                    <div className="bg-gray-50 rounded-2xl p-5 mb-6">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Ürün Açıklaması
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-base">
                            {product.description}
                        </p>
                    </div>

                    {/* Özellikler */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        {[
                            { emoji: '✅', label: 'Katkısız & Doğal' },
                            { emoji: '🏭', label: 'Sertifikalı Üretim' },
                            { emoji: '🚚', label: 'Hızlı Teslimat' },
                            { emoji: '💬', label: 'WhatsApp Destek' },
                        ].map(f => (
                            <div key={f.label} className="flex items-center gap-2 bg-green-50 rounded-xl px-3 py-2.5">
                                <span className="text-base">{f.emoji}</span>
                                <span className="text-green-800 text-sm font-medium">{f.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Sipariş butonu */}
                    <button
                        onClick={handleBuy}
                        className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-white font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                        style={{ backgroundColor: '#25D366' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="20" height="20">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        WhatsApp ile Sipariş Ver
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full mt-3 py-3 rounded-2xl border border-gray-200 text-gray-500 hover:bg-gray-50 font-medium text-sm transition-colors flex items-center justify-center gap-2"
                    >
                        <ShoppingCart size={15} />
                        Ürünlere Geri Dön
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
