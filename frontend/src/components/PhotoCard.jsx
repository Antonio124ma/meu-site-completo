import { motion } from 'framer-motion';

const PhotoCard = ({ photo, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow"
    >
      <img
        src={photo.url}
        alt={photo.title || 'Foto'}
        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />
      {photo.title && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
          <p className="text-white p-3 text-sm font-medium">{photo.title}</p>
        </div>
      )}
    </motion.div>
  );
};

export default PhotoCard;
