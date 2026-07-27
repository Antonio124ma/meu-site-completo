import { useEffect, useState } from 'react';
import api from '../../services/api';
import { FiTrash2, FiPlus, FiEdit2 } from 'react-icons/fi';

const emptyForm = {
  title: '',
  description: '',
  technologies: '',
  link: '',
  featured: false,
  image: null,
};

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const loadProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const data = new FormData();
      data.append('title', form.title);
      data.append('description', form.description);
      data.append('technologies', form.technologies);
      data.append('link', form.link);
      data.append('featured', form.featured);
      if (form.image) data.append('image', form.image);

      if (editingId) {
        await api.put(`/projects/${editingId}`, data);
        setMessage('Projeto atualizado com sucesso!');
      } else {
        await api.post('/projects', data);
        setMessage('Projeto criado com sucesso!');
      }

      setForm(emptyForm);
      setEditingId(null);
      loadProjects();
    } catch (err) {
      setMessage(err.response?.data?.error || err.response?.data?.msg || 'Erro ao salvar');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setForm({
      title: project.title || '',
      description: project.description || '',
      technologies: project.technologies?.join(', ') || '',
      link: project.link || '',
      featured: project.featured || false,
      image: null,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este projeto?')) return;
    try {
      await api.delete(`/projects/${id}`);
      loadProjects();
      setMessage('Projeto removido.');
    } catch (err) {
      setMessage('Erro ao excluir projeto');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Gerenciar Projetos</h1>

      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${message.includes('Erro') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
          {message}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-8 space-y-4">
        <h2 className="font-semibold text-lg">
          {editingId ? 'Editar Projeto' : 'Novo Projeto'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
            <input
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tecnologias (separadas por vírgula)
          </label>
          <input
            name="technologies"
            value={form.technologies}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Imagem</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="text-sm"
            />
          </div>
          <label className="flex items-center gap-2 mt-6 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="rounded"
            />
            <span className="text-sm text-gray-700">Destaque</span>
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-60"
          >
            <FiPlus size={18} />
            {loading ? 'Salvando...' : editingId ? 'Atualizar' : 'Adicionar'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-5 py-2.5 border rounded-lg text-gray-600 hover:bg-gray-50"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="space-y-3">
        {projects.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Nenhum projeto cadastrado.</p>
        ) : (
          projects.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                {p.imageUrl && (
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{p.title}</h3>
                  <p className="text-sm text-gray-500 truncate">{p.description}</p>
                  {p.technologies?.length > 0 && (
                    <p className="text-xs text-indigo-600 mt-1">
                      {p.technologies.join(' · ')}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(p)}
                  className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                  title="Editar"
                >
                  <FiEdit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  title="Excluir"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectsManager;
