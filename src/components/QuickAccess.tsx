import { GraduationCap, Image, Languages, Music } from "lucide-react";

const QuickAccess = () => {
  return (
    <div className="flex justify-center gap-6 mt-8 px-4">
      <div className="flex flex-col items-center">
        <div className="bg-amber-800/50 w-16 h-16 rounded-full flex items-center justify-center mb-2">
          <Image size={24} className="text-amber-400" />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-blue-800/50 w-16 h-16 rounded-full flex items-center justify-center mb-2">
          <Languages size={24} className="text-blue-400" />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-green-800/50 w-16 h-16 rounded-full flex items-center justify-center mb-2">
          <GraduationCap size={24} className="text-green-400" />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-red-800/50 w-16 h-16 rounded-full flex items-center justify-center mb-2">
          <Music size={24} className="text-red-400" />
        </div>
      </div>
    </div>
  );
};

export default QuickAccess;
