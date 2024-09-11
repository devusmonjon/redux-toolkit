import { Link } from "react-router-dom";
import { ModeToggle } from "../mode-toggle/mode-toggle";

const Navbar = (): JSX.Element => {
  return (
    <nav className="dark:bg-gray-900 bg-gray-100 sticky top-0 h-[10vh] flex items-center">
      <div className="container">
        <div className="py-4 flex items-center justify-between">
          <Link to="/" className="font-bold text-2xl">
            LOGO
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
