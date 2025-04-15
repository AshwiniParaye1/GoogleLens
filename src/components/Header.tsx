import { FlaskConical, Star } from "lucide-react";
import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";

const GoogleSearchButton = () => (
  <div className="bg-google-card text-white rounded-full px-4 py-2 flex items-center gap-2">
    <div className="bg-[#4285F4] text-white rounded-full w-5 h-5 flex items-center justify-center mr-1 text-xs font-bold">
      G
    </div>
    Search
    <Star className="text-google-yellow" size={16} />
  </div>
);

const Header = ({
  variant = "home"
}: {
  variant?: "home" | "lens" | "results";
}) => {
  const username = "Guest User";
  const email = "guest@example.com";

  return (
    <header className="flex justify-between items-center p-4">
      {variant === "home" ? (
        <>
          <div className="flex items-center justify-center w-10 h-10">
            <FlaskConical className="text-blue-400" size={28} />
          </div>

          <GoogleSearchButton />

          <AccountMenu username={username} email={email} />
        </>
      ) : (
        <>
          <Link to="/">
            <FlaskConical className="text-blue-400" size={28} />
          </Link>
          <div></div>
          <AccountMenu username={username} email={email} />
        </>
      )}
    </header>
  );
};

export default Header;
