import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Truck } from 'lucide-react';
import { CONFIG } from '../config';

const features = [
    {
        icon: Truck,
        title: 'Hızlı Teslimat',
        desc: 'Türkiye genelinde hızlı ve güvenli teslimat ile kapınıza kadar ulaştırıyoruz.',
    },
];

const HomePage: React.FC = () => {
    useEffect(() => {
        document.title = `${CONFIG.COMPANY.name} — Doğal Yem Üretimi ve Satışı`;
    }, []);

    return (
        <>
            {/* Hero */}
            <section className="hero-gradient min-h-screen flex items-center pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text */}
                    <div className="animate-fadeInUp">
                        <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-6 glass">
                            <Leaf size={16} className="text-green-300" />
                            Az Yem İle Çok Verim
                        </div>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            Katkısız ve <span className="text-green-300">Doğal</span> Hayvan Yemi Üretimi
                        </h1>
                        <p className="text-green-100 text-lg leading-relaxed mb-8 max-w-lg">
                            Doğadan özenle seçilen hammaddelerle üretilen, hayvanlarınızın sağlığını ve verimliliğini destekleyen kaliteli yem çözümleri sunuyoruz.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/urunler"
                                className="inline-flex items-center justify-center gap-2 bg-white text-green-800 font-bold py-3.5 px-7 rounded-full hover:bg-green-50 transition-all hover:shadow-xl hover:-translate-y-0.5 text-base"
                            >
                                Ürünleri İncele
                                <ArrowRight size={18} />
                            </Link>
                            <Link
                                to="/iletisim"
                                className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-semibold py-3.5 px-7 rounded-full hover:bg-white/10 transition-all text-base"
                            >
                                Bize Ulaşın
                            </Link>
                        </div>
                    </div>

                    {/* Floating cards */}
                    <div className="hidden lg:flex justify-center">
                        <div className="relative w-96 h-96">
                            {/* Main circle */}
                            <div className="absolute inset-0 rounded-full bg-white/10 border border-white/20 animate-float" />
                            <div className="absolute inset-8 rounded-full bg-white/10 border border-white/20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center text-white">
                                    <div className="text-6xl mb-3">🌾</div>
                                    <div className="font-display text-2xl font-bold">Doğal Yem</div>
                                    <div className="text-green-200 text-sm mt-1">100% Katkısız</div>
                                </div>
                            </div>
                            {/* Floating badges */}
                            {[
                                { emoji: '🐄', label: 'Büyükbaş', pos: 'top-4 -left-4' },
                                { emoji: '🐔', label: 'Kümes', pos: 'top-4 -right-4' },
                                { emoji: '🐑', label: 'Küçükbaş', pos: '-bottom-2 left-8' },
                                { emoji: '🌿', label: 'Organik', pos: '-bottom-2 right-8' },
                            ].map(b => (
                                <div
                                    key={b.label}
                                    className={`absolute ${b.pos} glass rounded-2xl px-3 py-2 text-center shadow-lg`}
                                >
                                    <div className="text-2xl">{b.emoji}</div>
                                    <div className="text-white text-xs font-medium mt-0.5">{b.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 80H1440V40C1200 80 900 0 720 20C540 40 240 80 0 40V80Z" fill="#f8f4e9" />
                    </svg>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="font-display section-title text-3xl sm:text-4xl font-bold text-green-900 mb-4">
                            Neden Bizi Seçmelisiniz?
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto mt-6">
                            Yılların birikimi ve doğaya duyduğumuz saygıyla, hayvanlarınız için en iyi besi yemlerini üretiyoruz.
                        </p>
                    </div>

                    <div className="max-w-sm mx-auto">
                        {features.map(f => (
                            <div
                                key={f.title}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-green-50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4">
                                    <f.icon size={28} className="text-green-600" />
                                </div>
                                <h3 className="font-semibold text-green-900 text-base mb-2">{f.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-16 bg-green-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
                        Hayvanlarınız İçin En İyisini Seçin
                    </h2>
                    <p className="text-green-200 text-lg mb-8">
                        Geniş ürün yelpazemizi inceleyin, en uygun yemi bulun ve WhatsApp üzerinden hemen sipariş verin.
                    </p>
                    <Link
                        to="/urunler"
                        className="inline-flex items-center gap-2 bg-white text-green-800 font-bold py-4 px-8 rounded-full hover:bg-green-50 transition-all hover:shadow-xl text-base"
                    >
                        Ürün Kataloğumuzu Gör
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </>
    );
};

export default HomePage;
