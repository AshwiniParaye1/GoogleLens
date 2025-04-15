import { GraduationCap, Languages } from "lucide-react";
import { MdImageSearch, MdOutlineMusicNote } from "react-icons/md";

const QuickAccess = () => {
  return (
    <div className="flex justify-center gap-1.5 mt-2 py-2 border-b border-gray-600 px-4">
      <div className="flex flex-col items-center">
        <div className="bg-amber-800/50 w-[5.5rem] h-16 rounded-full flex items-center justify-center mb-2">
          <MdImageSearch size={24} className="text-amber-200" />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-blue-700/50 w-[5.5rem] h-16 rounded-full flex items-center justify-center mb-2">
          <Languages size={24} className="text-blue-200" />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-green-800/50 w-[5.5rem] h-16 rounded-full flex items-center justify-center mb-2">
          <GraduationCap size={24} className="text-green-200" />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-red-800/50 w-[5.5rem] h-16 rounded-full flex items-center justify-center mb-2">
          <MdOutlineMusicNote size={24} className="text-red-200" />
        </div>
      </div>
    </div>
  );
};

export default QuickAccess;
