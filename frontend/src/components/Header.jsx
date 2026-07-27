import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/portfolio', label: 'Portfólio' },
    { to: '/galeria', label: 'Galeria' },
    { to: '/curriculum', label: 'Currículo' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
          MeuSite
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-medium transition ${
                isActive(link.to)
                  ? 'text-indigo-600'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                to="/admin"
                className="font-medium text-gray-600 hover:text-indigo-600"
              >
                Admin
              </Link>
              <button
                onClick={logout}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/admin/login"
              className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-700 transition"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile button */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`font-medium py-2 ${
                isActive(link.to) ? 'text-indigo-600' : 'text-gray-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/admin" onClick={() => setMobileOpen(false)} className="py-2 text-gray-600">
                Admin
              </Link>
              <button onClick={() => { logout(); setMobileOpen(false); }} className="text-left py-2 text-red-500">
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/admin/login"
              onClick={() => setMobileOpen(false)}
              className="py-2 text-indigo-600 font-medium"
            >
              Login
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
