import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold text-green-400">
        AI Stock Platform
      </h1>

      <div className="space-x-6">
        <Link to="/" className="hover:text-green-400">Dashboard</Link>
        <Link to="/portfolio" className="hover:text-green-400">Portfolio</Link>
        <Link to="/login" className="hover:text-green-400">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;