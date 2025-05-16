import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 fixed top-0 left-0 w-full z-50 px-4 py-3">
      <nav className="flex justify-center space-x-6">
        <NavLink 
          to="/"
          className={({ isActive }) =>
            "px-3 py-2 border-b-2 " + 
            (isActive 
              ? "border-white text-white font-semibold"
              : "border-transparent text-white hover:text-gray-300"
            )
          }
        >
          Home
        </NavLink>
        <NavLink 
          to="/results"
          className={({ isActive }) =>
            "px-3 py-2 border-b-2 " +
            (isActive 
              ? "border-white text-white font-semibold"
              : "border-transparent text-white hover:text-gray-300"
            )
          }
        >
          Results
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
