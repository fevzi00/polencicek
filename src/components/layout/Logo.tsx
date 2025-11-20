import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="cursor-pointer group">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-85 transition-transform">
        Polen Çiçek
        </h1>
        <p className="text-xs text-slate-600 font-medium tracking-wide">
          Şehrin Çiçekçisi
        </p>
      </div>
    </Link>
  );
}