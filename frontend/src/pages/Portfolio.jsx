import { useEffect, useState } from 'react';
import api from '../services/api';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get('/projects')
      .then((res) => setProjects(res.data))
      .catch((err) => setError('Erro ao carregar projetos'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Portfólio</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Alguns dos projetos que desenvolvi ao longo da minha trajetória.
        </p>
      </motion.div>

      {error && (
        <p className="text-center text-red-500 mb-8">{error}</p>
      )}

      {projects.length === 0 ? (
        <p className="text-center text-gray-500 py-16">Nenhum projeto cadastrado ainda.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={project._id} project={project} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Portfolio;
