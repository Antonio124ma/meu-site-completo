import { useEffect, useState } from 'react';
import api from '../../services/api';
import { FiTrash2, FiPlus } from 'react-icons/fi';

const PhotosManager = () => {
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const loadPhotos = async () => {
    try {
      const res = await api.get('/photos');
      setPhotos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setMessage('Selecione uma imagem');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const data = new FormData();
      data.append('title', title);
      data.append('image', image);

      await api.post('/photos', data);
      setTitle('');
      setImage(null);
      // limpa o input file
      e.target.reset();
      setMessage('Foto adicionada com sucesso!');
      loadPhotos();
    } catch (err) {
      setMessage(err.response?.data?.error || err.response?.data?.msg || 'Erro ao enviar foto');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir esta foto?')) return;
    try {
      await api.delete(`/photos/${id}`);
      loadPhotos();
      setMessage('Foto removida.');
    } catch (err) {
      setMessage('Erro ao excluir foto');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Gerenciar Galeria</h1>

      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${message.includes('Erro') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-8 space-y-4">
        <h2 className="font-semibold text-lg">Nova Foto</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título (opcional)</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Ex: Viagem para a praia"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Imagem *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-60"
        >
          <FiPlus size={18} />
          {loading ? 'Enviando...' : 'Adicionar Foto'}
        </button>
      </form>

      {/* Grid de fotos */}
      {photos.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Nenhuma foto cadastrada.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo._id} className="relative group rounded-xl overflow-hidden shadow">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2">
                {photo.title && (
                  <p className="text-white text-sm font-medium px-2 text-center">{photo.title}</p>
                )}
                <button
                  onClick={() => handleDelete(photo._id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                  title="Excluir"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotosManager;
