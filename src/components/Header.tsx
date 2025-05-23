//src/components/Header.tsx

import { PiFlaskFill } from "react-icons/pi";
import AccountMenu from "./AccountMenu";

const GoogleSearchButton = () => (
  <div className="bg-google-card rounded-md text-white px-2 py-2 flex items-center gap-2">
    <div className="bg-gray-900 rounded-md flex flex-row px-2 py-1.5 mr-1">
      <div className="mr-2 self-center">
        <img src="/google.png" width={18} height={18} alt="Google logo" />
      </div>
      Search
    </div>
    <img src="/star.png" width={18} height={18} alt="Favorites" />
  </div>
);

interface HeaderProps {
  variant?: "home" | "lens" | "results";
}

const Header = ({ variant = "home" }: HeaderProps) => {
  const username = "Guest User";
  const email = "guest@example.com";

  return (
    <header className="flex justify-between items-center p-4">
      {variant === "home" && (
        <>
          <div className="flex items-center justify-center w-10 h-10">
            <PiFlaskFill
              className="text-blue-400"
              size={28}
              aria-hidden="true"
            />
          </div>

          <GoogleSearchButton />

          <AccountMenu username={username} email={email} />
        </>
      )}
    </header>
  );
};

export default Header;
