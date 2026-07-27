import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PaginaNaoEncontrada = () => {
  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white px-4">
      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="text-9xl font-bold"
      >
        404
      </motion.h1>
      <p className="text-2xl mt-4 font-medium">Página não encontrada</p>
      <p className="text-white/80 mt-2 text-center max-w-md">
        A página que você procura não existe ou foi movida.
      </p>
      <Link
        to="/"
        className="mt-10 px-8 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg"
      >
        Voltar ao Início
      </Link>
    </div>
  );
};

export default PaginaNaoEncontrada;
