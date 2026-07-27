const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">
        <p>© {year} Meu Site Pessoal. Feito com ❤️ e React.</p>
      </div>
    </footer>
  );
};

export default Footer;
