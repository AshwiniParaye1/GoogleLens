//src/components/WeatherWidget.tsx

import { IoMdMoon } from "react-icons/io";

const WeatherWidget = () => {
  return (
    <div className="google-card flex justify-between items-center">
      <div>
        <div className="text-sm font-medium text-gray-300 mb-2">Gurugram</div>
        <div className="text-xl font-medium">30°</div>
      </div>
      <IoMdMoon size={28} className="text-gray-300 self-end" />
    </div>
  );
};

export default WeatherWidget;
