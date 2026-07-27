import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-140px)] bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-4 tracking-tight">
          João Silva
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 mb-8">
          Desenvolvedor Full Stack · Apaixonado por tecnologia
        </p>

        <div className="flex justify-center gap-5 mb-12">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 transition"
            aria-label="GitHub"
          >
            <FaGithub size={28} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-700 transition"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={28} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-sky-500 transition"
            aria-label="Twitter"
          >
            <FaTwitter size={28} />
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/portfolio"
            className="px-7 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
          >
            Portfólio
          </Link>
          <Link
            to="/galeria"
            className="px-7 py-3 bg-white text-indigo-600 border border-indigo-200 rounded-full font-medium hover:bg-indigo-50 transition"
          >
            Galeria
          </Link>
          <Link
            to="/curriculum"
            className="px-7 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition"
          >
            Currículo
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
