const Navbar = () => {
  const links = {
    Gmail: "https://mail.google.com/",
    
  };

  return (
    <nav className="w-full flex items-center justify-end px-8 py-4 text-sm text-gray-700">
      <ul className="flex items-center gap-6">
        {Object.entries(links).map(([label, url]) => (
          <li
            key={label}
            className="cursor-pointer hover:underline transition"
            onClick={() => window.open(url, "_blank")}
          >
            {label}
          </li>
        ))}

        {/* Google Apps Icons */}
        <li>
          <button className="p-2 hover:bg-gray-100 rounded-full transition outline-none">
            <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24">
              <circle cx="4" cy="4" r="2" />
              <circle cx="12" cy="4" r="2" />
              <circle cx="20" cy="4" r="2" />
              <circle cx="4" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="20" cy="12" r="2" />
              <circle cx="4" cy="20" r="2" />
              <circle cx="12" cy="20" r="2" />
              <circle cx="20" cy="20" r="2" />
            </svg>
          </button>
        </li>

        {/* Avatar */}
        <li>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white cursor-pointer hover:opacity-90 font-medium">
            M
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
