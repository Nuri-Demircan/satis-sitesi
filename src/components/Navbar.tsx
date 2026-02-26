import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import { CONFIG } from '../config';

const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false);

    const links = [
        { to: '/', label: 'Ana Sayfa' },
        { to: '/urunler', label: 'Ürünlerimiz' },
        { to: '/hakkimizda', label: 'Hakkımızda' },
        { to: '/iletisim', label: 'İletişim' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                            <Leaf size={18} className="text-white" />
                        </div>
                        <span className="font-display font-bold text-xl text-green-800">
                            {CONFIG.COMPANY.name}
                        </span>
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map(link => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                end={link.to === '/'}
                                className={({ isActive }) =>
                                    `nav-link text-sm font-medium transition-colors pb-1 ${isActive ? 'text-green-700 active' : 'text-gray-700 hover:text-green-700'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* CTA + Mobile toggle */}
                    <div className="flex items-center gap-3">
                        <Link
                            to="/urunler"
                            className="hidden sm:inline-flex items-center gap-2 bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-green-800 transition-all hover:shadow-md"
                        >
                            Ürünleri Gör
                        </Link>
                        <button
                            onClick={() => setOpen(!open)}
                            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-green-50 transition-colors"
                            aria-label="Menüyü aç"
                        >
                            {open ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-2">
                    {links.map(link => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.to === '/'}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? 'bg-green-50 text-green-700'
                                    : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                    <Link
                        to="/urunler"
                        onClick={() => setOpen(false)}
                        className="block w-full text-center bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-green-800 transition-colors mt-2"
                    >
                        Ürünleri Gör
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
