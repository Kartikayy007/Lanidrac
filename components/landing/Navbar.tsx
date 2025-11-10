import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.avif"
              alt="Cardinal Logo"
              width={130}
              height={130}
              className="object-contain"
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
            <Link href="/pricing" className="text-gray-500 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            <Link href="/blog" className="text-gray-500 hover:text-gray-900 transition-colors">
              Blog
            </Link>
            <Link href="/docs" className="text-gray-500 hover:text-gray-900 transition-colors">
              API Docs
            </Link>
            <Link href="/community" className="text-gray-500 hover:text-gray-900 transition-colors">
              Community
            </Link>
          </div>

        <div className="flex items-center gap-4">
          <Link
            href="/signup"
            className="px-6 py-2 bg-[#8C2221] text-white hover:bg-[#6d2421] transition-colors"
          >
            Try it now
          </Link>
          <Link
            href="/demo"
            className="px-6 py-2 bg-white text-gray-900 border-2 border-gray-300 hover:border-gray-400 transition-colors"
          >
            Book Demo
          </Link>
        </div>
      </div>
    </nav>
  );
}
