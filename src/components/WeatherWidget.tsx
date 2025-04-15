
import { Moon } from "lucide-react";

const WeatherWidget = () => {
  return (
    <div className="google-card flex justify-between items-center">
      <div>
        <div className="text-sm text-gray-300 mb-1">Gurugram</div>
        <div className="text-2xl font-semibold">30°</div>
      </div>
      <Moon size={32} className="text-gray-300" />
    </div>
  );
};

export default WeatherWidget;
