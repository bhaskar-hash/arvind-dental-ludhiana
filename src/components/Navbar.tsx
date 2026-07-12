'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Calendar, HeartPulse } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Treatments Offered', href: '/services' },
    { name: 'Oral Scanner', href: '/dental-monitor' },
    { name: 'Clinical Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-305 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <HeartPulse className="h-8 w-8 text-gold-400 group-hover:rotate-12 transition-transform duration-300" />
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block font-display">
                Red City <span className="text-gold-455">Dental Care</span>
              </span>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest block -mt-1 font-semibold">
                Ludhiana • Best Speciality Care
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs uppercase tracking-widest font-semibold transition-colors font-display ${
                  isActive(link.href)
                    ? 'text-gold-400 font-bold border-b-2 border-gold-400 pb-1'
                    : 'text-slate-655 hover:text-slate-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-5">
            <a
              href="tel:+918847651364"
              className="flex items-center text-xs font-semibold text-slate-655 hover:text-slate-900 transition-colors tracking-widest uppercase font-display"
            >
              <Phone className="h-4 w-4 text-gold-455 mr-2" />
              +91 88476-51364
            </a>
            <button
              onClick={onBookClick}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 uppercase tracking-wider font-display"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <a
              href="tel:+918847651364"
              className="p-2 bg-slate-50 border border-slate-200 rounded-full text-gold-455 hover:text-slate-900 transition-colors"
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-1"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden fixed inset-x-0 top-[60px] bg-white border-b border-slate-205 shadow-2xl transition-all duration-300 ease-in-out transform ${
          isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3 bg-white/95 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-widest font-display transition-colors ${
                isActive(link.href)
                  ? 'bg-gold-55 text-gold-500 font-bold border border-gold-455/10'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 px-4 flex flex-col space-y-4">
            <a
              href="tel:+918847651364"
              className="flex items-center justify-center text-slate-655 hover:text-slate-900 py-2 text-xs font-semibold uppercase tracking-widest font-display"
            >
              <Phone className="h-4 w-4 text-gold-400 mr-2" />
              +91 88476-51364
            </a>
            <button
              onClick={() => {
                setIsOpen(false);
                onBookClick();
              }}
              className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider font-display transition-all"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
