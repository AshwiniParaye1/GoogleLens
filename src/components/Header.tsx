//src/components/Header.tsx

import { PiFlaskFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const GoogleSearchButton = () => (
  <div className="bg-google-card rounded-md text-white px-2 py-2 flex items-center gap-2">
    <div className="bg-gray-900 rounded-md flex flex-row p-2">
      <div className="mr-2 self-center">
        <img src="/public/google.png" width={18} height={18} alt="star" />
      </div>
      Search
    </div>
    <img src="/public/star.png" width={18} height={18} alt="star" />
  </div>
);

const Header = ({
  variant = "home"
}: {
  variant?: "home" | "lens" | "results";
}) => {
  return (
    <header className="flex justify-between items-center p-4">
      {variant === "home" ? (
        <>
          <div className="flex items-center justify-center w-10 h-10">
            <PiFlaskFill className="text-blue-400" size={35} />
          </div>

          <GoogleSearchButton />

          <div className="bg-gray-400 px-4 py-2 rounded-full">
            <div className="text-lg">A</div>
          </div>
        </>
      ) : (
        <>
          <Link to="/">
            <PiFlaskFill className="text-blue-200" size={30} />
          </Link>
          <div className=""></div>
          <div className="bg-gray-400 px-4 py-2 rounded-full">
            <div className="text-lg">A</div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
