import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white font-sans">
      <div className="container mx-auto flex items-center justify-between">
        {/* App Name */}
        <Link href="/" className="text-2xl font-bold hover:text-gray-200 transition duration-300">
          E-com
        </Link>

        {/* Profile Icon */}
        <div className="relative">
          <FaUserCircle size={30} className="cursor-pointer hover:text-gray-300 transition duration-300" />
          <span className="absolute right-0 top-1 text-sm text-gray-200 hidden hover:block">User</span>
        </div>
      </div>
    </nav>
  );
}
