import React, { useState } from 'react';
import type { Product } from '../types';
import { buildWhatsAppUrl } from '../config';
import { ShoppingCart, Tag, ImageOff, Eye } from 'lucide-react';

interface Props {
    product: Product;
    onEdit?: (product: Product) => void;
    onDelete?: (id: string) => void;
    onView?: (product: Product) => void;
    isAdmin?: boolean;
}

const ProductCard: React.FC<Props> = ({ product, onEdit, onDelete, onView, isAdmin = false }) => {
    const [imgError, setImgError] = useState(false);

    const handleBuy = (e: React.MouseEvent) => {
        e.stopPropagation(); // kart tıklamasını tetiklemesin
        const url = buildWhatsAppUrl(
            product.name,
            product.description,
            product.price,
            product.imageUrl
        );
        window.open(url, '_blank');
    };

    const handleCardClick = () => {
        if (!isAdmin && onView) {
            onView(product);
        }
    };

    return (
        <div
            className={`product-card bg-white rounded-2xl overflow-hidden shadow-md border border-green-50 flex flex-col ${!isAdmin ? 'cursor-pointer' : ''
                }`}
            onClick={handleCardClick}
        >
            {/* Image */}
            <div className="relative h-52 bg-green-50 overflow-hidden">
                {product.imageUrl && !imgError ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        loading="lazy"
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-green-300 gap-2">
                        <ImageOff size={40} />
                        <span className="text-xs text-green-400">Görsel yok</span>
                    </div>
                )}

                {/* Detay göster rozeti — sadece normal modda */}
                {!isAdmin && (
                    <div className="absolute inset-0 bg-green-900/0 hover:bg-green-900/20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                        <div className="bg-white text-green-800 font-semibold text-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                            <Eye size={15} />
                            Detayları Gör
                        </div>
                    </div>
                )}

                {/* Price badge */}
                {product.price && (
                    <div className="absolute top-3 right-3 bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow flex items-center gap-1">
                        <Tag size={11} />
                        {product.price}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-green-900 text-lg mb-1.5 leading-snug">{product.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">
                    {product.description}
                </p>

                {/* Buttons */}
                <div className={`mt-4 ${isAdmin ? 'flex gap-2' : 'flex gap-2'}`}>
                    {!isAdmin && (
                        <>
                            <button
                                onClick={e => { e.stopPropagation(); onView?.(product); }}
                                className="flex-1 flex items-center justify-center gap-1.5 border border-green-600 text-green-700 hover:bg-green-50 font-semibold py-2.5 px-3 rounded-xl transition-all text-sm"
                            >
                                <Eye size={15} />
                                Detay
                            </button>
                            <button
                                onClick={handleBuy}
                                className="flex-1 flex items-center justify-center gap-1.5 bg-green-700 hover:bg-green-800 text-white font-semibold py-2.5 px-3 rounded-xl transition-all hover:shadow-md active:scale-95 text-sm"
                            >
                                <ShoppingCart size={15} />
                                Satın Al
                            </button>
                        </>
                    )}

                    {isAdmin && (
                        <>
                            <button
                                onClick={handleBuy}
                                className="flex-1 flex items-center justify-center gap-1.5 border border-green-600 text-green-700 hover:bg-green-50 font-medium py-2 px-3 rounded-xl transition-colors text-sm"
                            >
                                <ShoppingCart size={14} />
                                WhatsApp
                            </button>
                            <button
                                onClick={e => { e.stopPropagation(); onEdit?.(product); }}
                                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-3 rounded-xl transition-colors text-sm"
                            >
                                Düzenle
                            </button>
                            <button
                                onClick={e => { e.stopPropagation(); onDelete?.(product.id); }}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded-xl transition-colors text-sm"
                            >
                                Sil
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
