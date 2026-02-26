import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MapPin, } from 'lucide-react';
import { CONFIG } from '../config';

const Footer: React.FC = () => {
    return (
        <footer className="bg-green-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                                <Leaf size={20} className="text-white" />
                            </div>
                            <span className="font-display font-bold text-2xl">{CONFIG.COMPANY.name}</span>
                        </div>
                        <p className="text-green-200 text-sm leading-relaxed mb-5">
                         — Doğal ve katkısız yem üretiminde güvenilir çözüm ortağınız.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-green-300">Hızlı Bağlantılar</h3>
                        <ul className="space-y-2.5">
                            {[
                                { to: '/', label: 'Ana Sayfa' },
                                { to: '/urunler', label: 'Ürünlerimiz' },
                                { to: '/hakkimizda', label: 'Hakkımızda' },
                                { to: '/iletisim', label: 'İletişim' },
                                { to: '/admin', label: 'Admin Paneli' },
                            ].map(link => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-green-200 hover:text-white text-sm transition-colors hover:pl-1 inline-block"
                                    >
                                        → {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-green-300">İletişim</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <Phone size={16} className="text-green-400 mt-0.5 shrink-0" />
                                <span className="text-green-200 text-sm">{CONFIG.COMPANY.phone}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail size={16} className="text-green-400 mt-0.5 shrink-0" />
                                <span className="text-green-200 text-sm">{CONFIG.COMPANY.email}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin size={16} className="text-green-400 mt-0.5 shrink-0" />
                                <span className="text-green-200 text-sm">{CONFIG.COMPANY.address}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-green-700 mt-10 pt-6 text-center">
                    <p className="text-green-400 text-sm">
                        © {new Date().getFullYear()} {CONFIG.COMPANY.name}. Tüm hakları saklıdır.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
