import { useEffect, useState } from 'react';
import api from '../../services/api';

const emptyExperience = { company: '', position: '', startDate: '', endDate: '', description: '' };
const emptyEducation = { institution: '', degree: '', year: '' };

const CurriculumEditor = () => {
  const [form, setForm] = useState({
    name: '',
    title: '',
    about: '',
    experience: [emptyExperience],
    education: [emptyEducation],
    skills: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      website: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/curriculum').then((res) => {
      const data = res.data;
      setForm({
        name: data.name || '',
        title: data.title || '',
        about: data.about || '',
        experience: data.experience?.length ? data.experience : [emptyExperience],
        education: data.education?.length ? data.education : [emptyEducation],
        skills: data.skills?.join(', ') || '',
        socialLinks: {
          github: data.socialLinks?.github || '',
          linkedin: data.socialLinks?.linkedin || '',
          twitter: data.socialLinks?.twitter || '',
          website: data.socialLinks?.website || '',
        },
      });
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value },
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...form.experience];
    updated[index] = { ...updated[index], [field]: value };
    setForm((prev) => ({ ...prev, experience: updated }));
  };

  const addExperience = () => {
    setForm((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...emptyExperience }],
    }));
  };

  const removeExperience = (index) => {
    setForm((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...form.education];
    updated[index] = { ...updated[index], [field]: value };
    setForm((prev) => ({ ...prev, education: updated }));
  };

  const addEducation = () => {
    setForm((prev) => ({
      ...prev,
      education: [...prev.education, { ...emptyEducation }],
    }));
  };

  const removeEducation = (index) => {
    setForm((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const payload = {
        ...form,
        skills: form.skills
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        experience: form.experience.filter((exp) => exp.company || exp.position),
        education: form.education.filter((edu) => edu.institution || edu.degree),
      };

      await api.put('/curriculum', payload);
      setMessage('Currículo atualizado com sucesso!');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Erro ao salvar currículo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Editar Currículo</h1>

      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${message.includes('Erro') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Dados básicos */}
        <section className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="font-semibold text-lg">Informações Básicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título / Cargo</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Desenvolvedor Full Stack"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sobre</label>
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </section>

        {/* Redes sociais */}
        <section className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="font-semibold text-lg">Redes Sociais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['github', 'linkedin', 'twitter', 'website'].map((net) => (
              <div key={net}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {net}
                </label>
                <input
                  name={net}
                  value={form.socialLinks[net]}
                  onChange={handleSocialChange}
                  placeholder={`https://${net}.com/...`}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Experiência */}
        <section className="bg-white rounded-xl shadow p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg">Experiência</h2>
            <button
              type="button"
              onClick={addExperience}
              className="text-sm text-indigo-600 hover:underline"
            >
              + Adicionar
            </button>
          </div>
          {form.experience.map((exp, idx) => (
            <div key={idx} className="border rounded-lg p-4 space-y-3 relative">
              {form.experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(idx)}
                  className="absolute top-2 right-2 text-red-500 text-sm"
                >
                  Remover
                </button>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  placeholder="Empresa"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(idx, 'company', e.target.value)}
                  className="px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  placeholder="Cargo"
                  value={exp.position}
                  onChange={(e) => handleExperienceChange(idx, 'position', e.target.value)}
                  className="px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  placeholder="Início (ex: Jan 2022)"
                  value={exp.startDate}
                  onChange={(e) => handleExperienceChange(idx, 'startDate', e.target.value)}
                  className="px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  placeholder="Fim (ex: Atual)"
                  value={exp.endDate}
                  onChange={(e) => handleExperienceChange(idx, 'endDate', e.target.value)}
                  className="px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <textarea
                placeholder="Descrição das atividades"
                value={exp.description}
                onChange={(e) => handleExperienceChange(idx, 'description', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}
        </section>

        {/* Educação */}
        <section className="bg-white rounded-xl shadow p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg">Educação</h2>
            <button
              type="button"
              onClick={addEducation}
              className="text-sm text-indigo-600 hover:underline"
            >
              + Adicionar
            </button>
          </div>
          {form.education.map((edu, idx) => (
            <div key={idx} className="border rounded-lg p-4 space-y-3 relative">
              {form.education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(idx)}
                  className="absolute top-2 right-2 text-red-500 text-sm"
                >
                  Remover
                </button>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  placeholder="Instituição"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(idx, 'institution', e.target.value)}
                  className="px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  placeholder="Curso / Grau"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(idx, 'degree', e.target.value)}
                  className="px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  placeholder="Ano"
                  type="number"
                  value={edu.year}
                  onChange={(e) => handleEducationChange(idx, 'year', e.target.value)}
                  className="px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="font-semibold text-lg">Habilidades</h2>
          <input
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB, TypeScript, ..."
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <p className="text-xs text-gray-500">Separe as habilidades por vírgula</p>
        </section>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? 'Salvando...' : 'Salvar Currículo'}
        </button>
      </form>
    </div>
  );
};

export default CurriculumEditor;
