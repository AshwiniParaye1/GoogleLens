import { Wind } from "lucide-react";

const AirQualityWidget = () => {
  return (
    <div className="google-card flex justify-between items-center">
      <div>
        <div className="text-sm font-medium text-gray-300 mb-2">
          Air quality · 170
        </div>
        <div className="text-xl font-medium">Moderate</div>
      </div>
      <div className="w-8 h-8 self-end rounded-full bg-yellow-400 flex items-center justify-center">
        <Wind size={18} className="text-black" />
      </div>
    </div>
  );
};

export default AirQualityWidget;
