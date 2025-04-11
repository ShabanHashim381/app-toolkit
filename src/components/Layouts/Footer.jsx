import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-center sm:text-left">
        <div>
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-xl font-semibold text-white"
          >
            App.Toolkit
          </motion.h1>
          <p className="text-sm text-gray-400 mt-1">
            Powering your productivity
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-medium text-white">Quick Links</p>
          <ul className="text-sm space-y-1">
            <li>
              <a href="/" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition">
                About
              </a>
            </li>
          </ul>
        </div>

        <div className="flex justify-center sm:justify-end gap-4">
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            <FaGithub size={20} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            <FaTwitter size={20} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            <FaLinkedin size={20} />
          </motion.a>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} App.Toolkit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
