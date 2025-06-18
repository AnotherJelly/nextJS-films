'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Toggle } from '@/app/ui/buttons/toggle';
import { SkeletonToggle } from '@/app/ui/skeletons';
import Image from 'next/image';
import '@/app/ui/styles/header.css';

const links = [
  { name: 'Main', href: '/' },
  { name: 'Rating', href: '/rating' },
  { name: 'Calendar', href: '/calendar' },
];

export function Header( ) {
  const pathname = usePathname();
  const {theme, setTheme} = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

   return (
    <header className='header'>
      <button className={`burger ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <i></i>
      </button>
      <div className='nav-background' onClick={() => setIsMenuOpen(!isMenuOpen)}></div>
      <nav className='navigation'>
        <Image
          src="/logo.png"
          width={50}
          height={50}
          className=""
          alt="Logo"
        />
        <ul>
          {links.map((link) => {
          const isActive = link.href === pathname;
          return (
            <li key={link.name}>
              <Link
                key={link.name}
                href={link.href}
                className={`link ${isActive ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <p className="">{link.name}</p>
              </Link>
            </li>
          );
        })}
        </ul>
      </nav>
      <div className='toggle-wrapper'>
        {mounted ? (
          <Toggle
            id='change-theme'
            onChange={handleTheme}
            checked={theme === 'dark'}
          />
        ) : (
          <SkeletonToggle />
        )}
      </div>
    </header>
  );
}