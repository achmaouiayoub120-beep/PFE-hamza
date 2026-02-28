import Image from 'next/image';
import Link from 'next/link';
import { LogOut, Settings, User } from 'lucide-react';
import { getSession } from '@/lib/auth';

export async function Header() {
  const user = await getSession();

  const handleLogout = async () => {
    'use server';
    const response = await fetch('/api/auth/logout', { method: 'POST' });
    if (response.ok) {
      // Logout successful
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="School Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              UniNetwork
            </span>
          </Link>

          {/* User Menu */}
          {user && (
            <div className="flex items-center gap-4">
              <span className="hidden sm:block text-sm text-gray-600">
                {user.name}
              </span>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center text-white font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
