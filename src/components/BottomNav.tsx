import { Menu } from "lucide-react";
import { AiOutlineBell } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="nav-tabs p-2">
      <Link
        to="/"
        className={`google-tab ${
          location.pathname === "/" ? "text-google-blue" : ""
        }`}
      >
        <GoHomeFill size={24} />
      </Link>
      <div className="google-tab">
        <BsClockHistory size={20} />
      </div>
      <div className="google-tab">
        <AiOutlineBell size={24} />
      </div>
      <div className="google-tab">
        <Menu size={24} />
      </div>
    </nav>
  );
};

export default BottomNav;
