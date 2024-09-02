import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Footer Text */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-lg font-bold mb-1">E-com</h2>
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
        
        {/* Links Section */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-center md:text-left">
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact Us</a>
        </div>
        
        {/* Social Icons */}
        <div className="mt-4 md:mt-0 flex justify-center md:justify-start space-x-4">
          <a href="#" className="text-gray-400 hover:text-blue-600 transition duration-300">
            <FaFacebookF size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
            <FaXTwitter size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-pink-500 transition duration-300">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-700 transition duration-300">
            <FaLinkedinIn size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
