import React, { useEffect } from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { CONFIG } from '../config';

const ContactPage: React.FC = () => {
    useEffect(() => {
        document.title = `İletişim — ${CONFIG.COMPANY.name}`;
    }, []);

    const waUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}`;

    return (
        <>
            {/* Header */}
            <section className="hero-gradient pt-28 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">İletişim</h1>
                    <p className="text-green-200 text-lg max-w-xl mx-auto">
                        Sorularınız için bizimle iletişime geçin. En kısa sürede geri döneceğiz.
                    </p>
                </div>
                <div className="relative mt-10">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 60H1440V30C1200 60 900 0 720 15C540 30 240 60 0 30V60Z" fill="#f8f4e9" />
                    </svg>
                </div>
            </section>

            <section className="py-20 bg-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Contact Cards */}
                        <div className="space-y-5">
                            <h2 className="font-display text-2xl font-bold text-green-900 mb-8">
                                Bize Ulaşın
                            </h2>

                            {/* Phone */}
                            <a
                                href={`tel:${CONFIG.COMPANY.phone.replace(/\s/g, '')}`}
                                className="flex items-center gap-5 bg-white rounded-2xl p-6 shadow-sm border border-green-50 hover:shadow-md hover:-translate-y-0.5 transition-all group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-green-50 group-hover:bg-green-100 flex items-center justify-center shrink-0 transition-colors">
                                    <Phone size={26} className="text-green-600" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Telefon</div>
                                    <div className="text-green-900 font-semibold text-lg">{CONFIG.COMPANY.phone}</div>
                                    <div className="text-gray-400 text-sm">Hafta içi 08:00 – 18:00</div>
                                </div>
                            </a>

                            {/* WhatsApp */}
                            <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-5 bg-white rounded-2xl p-6 shadow-sm border border-green-50 hover:shadow-md hover:-translate-y-0.5 transition-all group"
                            >
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors" style={{ backgroundColor: '#e8f9f0' }}>
                                    <MessageCircle size={26} style={{ color: '#25D366' }} />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">WhatsApp</div>
                                    <div className="text-green-900 font-semibold text-lg">{CONFIG.COMPANY.phone}</div>
                                    <div className="text-gray-400 text-sm">Hızlı sipariş & destek için</div>
                                </div>
                            </a>

                            {/* Email */}
                            <a
                                href={`mailto:${CONFIG.COMPANY.email}`}
                                className="flex items-center gap-5 bg-white rounded-2xl p-6 shadow-sm border border-green-50 hover:shadow-md hover:-translate-y-0.5 transition-all group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-green-50 group-hover:bg-green-100 flex items-center justify-center shrink-0 transition-colors">
                                    <Mail size={26} className="text-green-600" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">E-posta</div>
                                    <div className="text-green-900 font-semibold text-lg">{CONFIG.COMPANY.email}</div>
                                    <div className="text-gray-400 text-sm">24 saat içinde yanıt</div>
                                </div>
                            </a>

                            {/* Address */}
                            <div className="flex items-center gap-5 bg-white rounded-2xl p-6 shadow-sm border border-green-50">
                                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center shrink-0">
                                    <MapPin size={26} className="text-green-600" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Adres</div>
                                    <div className="text-green-900 font-semibold">{CONFIG.COMPANY.address}</div>
                                </div>
                            </div>

                            {/* WA Button */}
                            <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                                style={{ backgroundColor: '#25D366' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="22" height="22">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                WhatsApp ile Sipariş Ver
                            </a>
                        </div>

                        {/* Map */}
                        <div className="rounded-3xl overflow-hidden shadow-lg border border-green-100 min-h-[420px]">
                            <iframe
                                src={CONFIG.COMPANY.mapEmbedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: '420px' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Konum Haritası"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactPage;
