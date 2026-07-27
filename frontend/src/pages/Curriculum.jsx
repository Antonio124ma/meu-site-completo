import { useEffect, useState } from 'react';
import api from '../services/api';
import { FaShareAlt, FaGithub, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Curriculum = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/curriculum')
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Currículo de ${data?.name || 'Profissional'}`,
          text: `Confira o currículo de ${data?.name}`,
          url: window.location.href,
        });
      } catch (e) {
        // usuário cancelou
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!data || (!data.name && !data.title)) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center text-gray-500">
        Currículo ainda não foi preenchido.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex justify-between items-start mb-8">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold text-gray-900"
        >
          Currículo
        </motion.h1>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
        >
          <FaShareAlt size={14} /> Compartilhar
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-gray-900">{data.name}</h2>
        <p className="text-xl text-indigo-600 mt-1">{data.title}</p>

        {data.about && (
          <p className="mt-5 text-gray-700 leading-relaxed">{data.about}</p>
        )}

        {/* Links sociais */}
        {(data.socialLinks?.github || data.socialLinks?.linkedin || data.socialLinks?.twitter || data.socialLinks?.website) && (
          <div className="flex gap-4 mt-5">
            {data.socialLinks.github && (
              <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
                <FaGithub size={22} />
              </a>
            )}
            {data.socialLinks.linkedin && (
              <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700">
                <FaLinkedin size={22} />
              </a>
            )}
            {data.socialLinks.twitter && (
              <a href={data.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-sky-500">
                <FaTwitter size={22} />
              </a>
            )}
            {data.socialLinks.website && (
              <a href={data.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600">
                <FaGlobe size={22} />
              </a>
            )}
          </div>
        )}

        {/* Experiência */}
        {data.experience?.length > 0 && (
          <section className="mt-10">
            <h3 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">Experiência</h3>
            <div className="space-y-6">
              {data.experience.map((exp, i) => (
                <div key={i} className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-gray-800">
                    {exp.position} · {exp.company}
                  </h4>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {exp.startDate} — {exp.endDate || 'Atual'}
                  </p>
                  {exp.description && (
                    <p className="text-gray-600 mt-2 text-sm leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Educação */}
        {data.education?.length > 0 && (
          <section className="mt-10">
            <h3 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">Educação</h3>
            <div className="space-y-3">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <p className="font-medium text-gray-800">
                    {edu.degree} — {edu.institution}
                  </p>
                  {edu.year && <p className="text-sm text-gray-500">{edu.year}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && (
          <section className="mt-10">
            <h3 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">Habilidades</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </motion.div>
    </div>
  );
};

export default Curriculum;
