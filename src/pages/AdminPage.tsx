import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';
import { LogOut, Plus, X, Package, Save } from 'lucide-react';
import { CONFIG } from '../config';

const EMPTY_FORM = { name: '', description: '', price: '', imageUrl: '' };

const AdminPage: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated, login, logout } = useAdmin();
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();

    // Auth
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    // Modal
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [formError, setFormError] = useState('');
    const [formSaving, setFormSaving] = useState(false);

    useEffect(() => {
        document.title = `Admin Paneli — ${CONFIG.COMPANY.name}`;
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        const ok = await login(email, password);
        setIsLoggingIn(false);
        if (!ok) setAuthError('E-posta veya şifre yanlış! Tekrar deneyin.');
        else setAuthError('');
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const openAdd = () => {
        setEditingId(null);
        setForm(EMPTY_FORM);
        setFormError('');
        setShowModal(true);
    };

    const openEdit = (product: Product) => {
        setEditingId(product.id);
        setForm({
            name: product.name,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
        });
        setFormError('');
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
            try {
                await deleteProduct(id);
            } catch {
                alert('Ürün silinirken bir hata oluştu.');
            }
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) { setFormError('Ürün adı zorunludur.'); return; }
        if (!form.description.trim()) { setFormError('Açıklama zorunludur.'); return; }

        setFormSaving(true);
        try {
            if (editingId) {
                await updateProduct(editingId, form);
            } else {
                await addProduct(form);
            }
            setShowModal(false);
        } catch {
            setFormError('Kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setFormSaving(false);
        }
    };

    // ─── LOGIN SCREEN ───────────────────────────────────────────────
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen hero-gradient flex items-center justify-center px-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                            <Package size={32} className="text-green-700" />
                        </div>
                        <h1 className="font-display text-2xl font-bold text-green-900">Admin Girişi</h1>
                        <p className="text-gray-400 text-sm mt-1">Devam etmek için şifrenizi girin</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">E-posta</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="ornek@domain.com"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm transition-all"
                                autoFocus
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Şifre</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm transition-all"
                                required
                            />
                            {authError && (
                                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">⚠ {authError}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="w-full bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white font-bold py-3 rounded-xl transition-colors"
                        >
                            {isLoggingIn ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // ─── ADMIN DASHBOARD ─────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            {/* Top bar */}
            <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="font-display text-xl font-bold text-green-900">Admin Paneli</h1>
                        <p className="text-gray-400 text-sm">{products.length} ürün mevcut</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={openAdd}
                            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
                        >
                            <Plus size={17} />
                            Ürün Ekle
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 border border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600 font-medium px-4 py-2.5 rounded-xl text-sm transition-colors"
                        >
                            <LogOut size={16} />
                            Çıkış
                        </button>
                    </div>
                </div>
            </div>

            {/* Products */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {products.length === 0 ? (
                    <div className="text-center py-24">
                        <Package size={56} className="text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-400 mb-1">Henüz ürün yok</h3>
                        <p className="text-gray-400 text-sm mb-6">İlk ürününüzü ekleyerek başlayın.</p>
                        <button
                            onClick={openAdd}
                            className="inline-flex items-center gap-2 bg-green-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-800 transition-colors"
                        >
                            <Plus size={18} />
                            Ürün Ekle
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                isAdmin
                                onEdit={openEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}
                >
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="font-display text-xl font-bold text-green-900">
                                {editingId ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            {formError && (
                                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                                    ⚠ {formError}
                                </div>
                            )}

                            {[
                                { field: 'name', label: 'Ürün Adı *', placeholder: 'Örn: Tavuk Yemi Büyütme', tag: 'input' },
                                { field: 'price', label: 'Fiyat', placeholder: 'Örn: ₺850 / 50 kg', tag: 'input' },
                                { field: 'imageUrl', label: 'Görsel URL', placeholder: 'https://...', tag: 'input' },
                            ].map(({ field, label, placeholder }) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                                    <input
                                        type="text"
                                        value={form[field as keyof typeof form]}
                                        onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                                        placeholder={placeholder}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm transition-all"
                                    />
                                </div>
                            ))}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Açıklama *</label>
                                <textarea
                                    value={form.description}
                                    onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Ürün hakkında kısa bir açıklama..."
                                    rows={3}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm resize-none transition-all"
                                />
                            </div>

                            {/* Image preview */}
                            {form.imageUrl && (
                                <div className="rounded-xl overflow-hidden border border-gray-100 h-40">
                                    <img
                                        src={form.imageUrl}
                                        alt="Önizleme"
                                        className="w-full h-full object-cover"
                                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                    />
                                </div>
                            )}

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 border border-gray-200 text-gray-600 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    disabled={formSaving}
                                    className="flex-1 flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white font-bold py-3 rounded-xl transition-colors"
                                >
                                    {formSaving ? (
                                        <>
                                            <svg className="animate-spin" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                            </svg>
                                            Kaydediliyor...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={17} />
                                            {editingId ? 'Güncelle' : 'Ekle'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
