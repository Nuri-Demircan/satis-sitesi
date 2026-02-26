import React, { useEffect } from 'react';
import { Sprout } from 'lucide-react';
import { CONFIG } from '../config';

const AboutPage: React.FC = () => {
    useEffect(() => {
        document.title = `Hakkımızda — ${CONFIG.COMPANY.name}`;
    }, []);

    return (
        <>
            {/* Header */}
            <section className="hero-gradient pt-28 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Hakkımızda</h1>
                    <p className="text-green-200 text-lg max-w-2xl mx-auto">
                        Doğal yem üretiminde onlarca yıllık tecrübe ve güven
                    </p>
                </div>
                <div className="relative mt-10">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 60H1440V30C1200 60 900 0 720 15C540 30 240 60 0 30V60Z" fill="#f8f4e9" />
                    </svg>
                </div>
            </section>

            {/* Story */}
            <section className="py-20 bg-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto mb-20">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 text-green-700 font-semibold text-sm mb-4 bg-green-50 px-4 py-2 rounded-full justify-center">
                                <Sprout size={16} />
                                Rota Yem
                            </div>
                            <h2 className="font-display text-3xl sm:text-4xl font-bold text-green-900">
                                Doğadan İlham Alan Bir Yolculuk
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <p className="text-gray-600 leading-relaxed text-center sm:text-left">
                                {CONFIG.COMPANY.name} olarak, çiftçilerimizin ve hayvan yetiştiricilerimizin ihtiyaçlarına cevap vermek amacıyla yola çıktık. Bu yolculukta, doğanın sunduğu tüm bereketleri en iyi şekilde kullanmayı hedefledik.
                            </p>
                            <p className="text-gray-600 leading-relaxed text-center sm:text-left">
                                Güçlü ekibimizle, her hayvan türü için optimize edilmiş yem formülasyonları geliştiriyoruz. Amacımız; sağlıklı, yüksek verimli hayvancılık için en doğal çözümü sunmak.
                            </p>
                            <p className="text-gray-600 leading-relaxed text-center sm:text-left">
                                Bugün Türkiye'nin dört bir yanında binlerce çiftçi ve işletme, güvenle {CONFIG.COMPANY.name} ürünlerini tercih etmektedir. Bu güveni her geçen gün pekiştirmek için çalışmaya devam ediyoruz.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutPage;
