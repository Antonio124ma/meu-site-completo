import { useEffect, useState } from 'react';
import api from '../services/api';
import PhotoCard from '../components/PhotoCard';
import { motion } from 'framer-motion';

const Galeria = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/photos')
      .then((res) => setPhotos(res.data))
      .catch(() => {})
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
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Galeria</h1>
        <p className="text-gray-600">Momentos e imagens que fazem parte da minha jornada.</p>
      </motion.div>

      {photos.length === 0 ? (
        <p className="text-center text-gray-500 py-16">Nenhuma foto cadastrada ainda.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {photos.map((photo, idx) => (
            <PhotoCard key={photo._id} photo={photo} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Galeria;
