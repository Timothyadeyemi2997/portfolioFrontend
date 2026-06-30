import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full py-6 text-center border-t border-gray-200">
      <p className="text-gray-500 text-sm">
        © {new Date().getFullYear()} My Portfolio. All rights reserved.
      </p>
      <Link
        to="/admin/login"
        className="text-gray-600 text-xs"
      >
        Admin
      </Link>
    </footer>
  );
};

export default Footer;