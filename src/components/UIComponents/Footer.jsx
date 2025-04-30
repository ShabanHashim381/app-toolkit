import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="py-8 text-white"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/colorful-gradient-abstract-background-color-blur-effect-blurred-colors_1170211-5463.jpg?w=740')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black bg-opacity-50">
        <div className="max-w-7xl mx-auto px-0 sm:px-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center text-left py-6">
          <div>
            <motion.h1
              whileHover={{ scale: 1.05 }}
              className="text-xl font-semibold text-white"
            >
              App.Toolkit
            </motion.h1>
            <p className="text-sm text-gray-200 mt-1">
              Powering your productivity
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-4">
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://github.com/ShabanHashim381/app-toolkit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-cyan-300 transition"
            >
              <FaGithub size={20} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="shabantararr381@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-cyan-300 transition text-sm"
            >
              Email: shabantararr381@gmail.com
            </motion.a>
          </div>
        </div>

        <div className="border-t border-gray-500 pt-4 px-6 flex flex-col sm:flex-row justify-between text-sm text-gray-200">
          <span>App.Toolkit. All rights reserved.</span>
          <span className="text-right text-cyan-300">
            Designed by Shaban Hashim 381
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
