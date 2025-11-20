'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { Logo } from './Logo';
import { clientSupabase } from '@/lib/supabase/client';

function UserButton() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    checkUser();
  }, []);

  const checkUser = async () => {
    const supabase = clientSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      setUser(user);
      const adminEmails = ["fevziucak4242@gmail.com"];
      setIsAdmin(adminEmails.includes(user.email || ""));
    }
  };

  const handleLogout = async () => {
    const supabase = clientSupabase();
    await supabase.auth.signOut();
    setUser(null);
    setIsOpen(false);
    window.location.href = '/';
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 bg-slate-100 rounded-full animate-pulse"></div>
    );
  }

  if (!user) {
    return (
      <Link href="/auth/login" className="cursor-pointer">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Giriş
        </button>
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-slate-200 rounded-full font-semibold hover:border-purple-400 transition-all cursor-pointer"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
          {user.email?.[0].toUpperCase()}
        </div>
        <span className="hidden sm:block text-slate-900">{user.email?.split('@')[0]}</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-slate-200">
              <p className="text-sm text-slate-600">Hoş geldiniz</p>
              <p className="font-semibold text-slate-900 truncate">{user.email}</p>
            </div>
            <div className="py-2">
              {isAdmin && (
                <Link href="/admin" onClick={() => setIsOpen(false)}>
                < button className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer">
               <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
               </svg>
               <span className="font-bold text-slate-900">Admin Panel</span>
               </button>
               </Link>
              )}

              <Link href="/account/orders" onClick={() => setIsOpen(false)}>
  <button className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer">
    <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
    <span className="font-bold text-slate-900">Siparişlerim</span>
  </button>
</Link>

              <Link href="/account" onClick={() => setIsOpen(false)}>
  <button className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer">
    <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
    <span className="font-bold text-slate-900">Hesabım</span>
  </button>
</Link>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Çıkış Yap</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '/', label: 'Ana Sayfa', icon: '🏠' },
    { href: '/products', label: 'Ürünler', icon: '🌸' },
    { href: '/about', label: 'Hakkımızda', icon: 'ℹ️' },
    { href: '/contact', label: 'İletişim', icon: '📞' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="cursor-pointer">
                  <div className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
                    pathname === link.href
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}>
                    {link.label}
                  </div>
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <Link href="/search" className="cursor-pointer">
                <button className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
                  <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </Link>

              {/* Cart Button */}
              <Link href="/cart" className="cursor-pointer">
                <button className="relative p-3 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
                  <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {mounted && totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              </Link>

              {/* User Button */}
              <div className="hidden lg:block">
                <UserButton />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-3 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-20 right-0 bottom-0 w-80 bg-white z-40 lg:hidden transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } overflow-y-auto`}
      >
        <nav className="p-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="cursor-pointer"
            >
              <div className={`flex items-center gap-3 px-4 py-4 rounded-xl font-semibold transition-all ${
                pathname === link.href
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-slate-900 hover:bg-slate-100'
              }`}>
                <span className="text-2xl">{link.icon}</span>
                <span>{link.label}</span>
              </div>
            </Link>
          ))}

          <div className="pt-4 border-t border-slate-200 mt-4">
            <UserButton />
          </div>

          <div className="pt-6 border-t border-slate-200 mt-6">
            <p className="text-sm text-slate-600 mb-2">İletişim</p>
            <a href="tel:05456726317" className="text-lg font-semibold text-purple-600 hover:text-purple-700 cursor-pointer">
              0545 672 63 17
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}