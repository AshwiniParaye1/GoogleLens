
import { Home, Moon, Bell, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  
  return (
    <nav className="nav-tabs">
      <Link to="/" className={`google-tab ${location.pathname === '/' ? 'text-google-blue' : ''}`}>
        <Home size={24} />
      </Link>
      <div className="google-tab">
        <Moon size={24} />
      </div>
      <div className="google-tab">
        <Bell size={24} />
      </div>
      <div className="google-tab">
        <Menu size={24} />
      </div>
    </nav>
  );
};

export default BottomNav;
