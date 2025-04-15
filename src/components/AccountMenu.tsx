//src/components/AccountMenu.tsx

import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ChevronDown,
  Clock,
  Glasses,
  HelpCircle,
  Key,
  Package,
  Search,
  Settings,
  Shield,
  User
} from "lucide-react";

interface AccountMenuProps {
  username: string;
  email: string;
}

const AccountMenu = ({ username, email }: AccountMenuProps) => {
  const initial = username.charAt(0).toUpperCase();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="w-8 h-8 rounded-full bg-gray-400 text-white font-bold text-sm flex items-center justify-center cursor-pointer">
          {initial}
        </div>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="bg-google-card text-white rounded-t-xl p-0 max-w-md mx-auto border-none h-auto overflow-hidden"
      >
        <div className="p-3 space-y-3">
          <div className="flex items-center justify-center">
            <h2 className="text-xl font-bold">Google</h2>
          </div>

          <div className="flex items-center justify-between px-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-400 text-white font-bold text-sm flex items-center justify-center">
                {initial}
              </div>
              <div className="text-left">
                <div className="font-medium text-sm">{username}</div>
                <div className="text-gray-400 text-xs">{email}</div>
              </div>
            </div>
            <ChevronDown className="text-gray-400" size={16} />
          </div>

          <div className="flex justify-center mt-1 mb-1">
            <button className="border border-gray-600 text-white rounded-full py-1 px-4 text-xs">
              Manage your Google Account
            </button>
          </div>
        </div>

        <Separator className="bg-gray-700" />

        <div className="py-1">
          <MenuItem icon={<Glasses size={16} />} label="Turn on Incognito" />
          <Separator className="bg-gray-700" />
          <MenuItem
            icon={<Clock size={16} />}
            label="Search history"
            rightLabel="Saving"
          />
          <MenuItem icon={null} label="Delete last 15 mins" indent />
          <Separator className="bg-gray-700" />
          <MenuItem icon={<Shield size={16} />} label="SafeSearch" />
          <MenuItem icon={<Package size={16} />} label="Interests" />
          <MenuItem icon={<Key size={16} />} label="Passwords" />
          <MenuItem icon={<User size={16} />} label="Your profile" />
          <MenuItem
            icon={<Search size={16} />}
            label="Search personalisation"
          />
          <Separator className="bg-gray-700" />
          <MenuItem icon={<Settings size={16} />} label="Settings" />
          <MenuItem icon={<HelpCircle size={16} />} label="Help and feedback" />
        </div>

        <Separator className="bg-gray-700" />

        <div className="p-3 flex justify-center items-center gap-2 text-xs text-gray-400">
          <span>Privacy Policy</span>
          <span className="text-gray-600">•</span>
          <span>Terms of Service</span>
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  rightLabel?: string;
  indent?: boolean;
}

const MenuItem = ({
  icon,
  label,
  rightLabel,
  indent = false
}: MenuItemProps) => {
  return (
    <div
      className={`flex items-center justify-between px-5 py-2 hover:bg-gray-700 cursor-pointer ${
        indent ? "pl-14" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        {icon && <div className="text-gray-400">{icon}</div>}
        <span className="text-sm">{label}</span>
      </div>
      {rightLabel && (
        <span className="text-gray-400 text-xs">{rightLabel}</span>
      )}
    </div>
  );
};

export default AccountMenu;
