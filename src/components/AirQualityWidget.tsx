
import { Wind } from "lucide-react";

const AirQualityWidget = () => {
  return (
    <div className="google-card flex justify-between items-center">
      <div>
        <div className="text-sm text-gray-300 mb-1">Air quality · 170</div>
        <div className="text-2xl font-semibold">Moderate</div>
      </div>
      <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
        <Wind size={18} className="text-black" />
      </div>
    </div>
  );
};

export default AirQualityWidget;
