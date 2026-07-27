import { Link, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import ProjectsManager from './ProjectsManager';
import PhotosManager from './PhotosManager';
import CurriculumEditor from './CurriculumEditor';
import { FiFolder, FiImage, FiFileText, FiHome } from 'react-icons/fi';

const Dashboard = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin/projects', label: 'Projetos', icon: FiFolder },
    { path: '/admin/photos', label: 'Galeria', icon: FiImage },
    { path: '/admin/curriculum', label: 'Currículo', icon: FiFileText },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="flex min-h-[calc(100vh-140px)]">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0 hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-1">Painel</h2>
          <p className="text-gray-400 text-sm">Gerenciar conteúdo</p>
        </div>

        <nav className="px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive(item.path)
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm"
          >
            <FiHome size={16} /> Ver site
          </Link>
        </div>
      </aside>

      {/* Mobile menu */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex justify-around py-3 z-40 border-t border-gray-800">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 text-xs ${
                isActive(item.path) ? 'text-indigo-400' : 'text-gray-400'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-auto pb-20 md:pb-6">
        <Routes>
          <Route index element={<Navigate to="projects" replace />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="photos" element={<PhotosManager />} />
          <Route path="curriculum" element={<CurriculumEditor />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
