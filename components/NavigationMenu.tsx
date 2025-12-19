import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import LogoutIcon from "./icons/LogoutIcon";

interface NavMenuProps {
  onLogout?: () => void;
}

const NavigationMenu: React.FC<NavMenuProps> = ({ onLogout }) => {
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;

  return (
    <div className="flex flex-col justify-between p-5 border border-gray-300 rounded-lg w-60 h-[564px]">
      <div>
        <nav className="flex flex-col gap-3 text-sm">
          <Link
            href="/"
            className={`hover:underline text-[13px] ${isActive("/") ? "font-bold" : ""}`}
          >
            Tableau de Bord
          </Link>
          <Link
            href="/orders"
            className={`hover:underline text-[13px] ${isActive("/orders") ? "font-bold" : ""}`}
          >
            Commandes et retours
          </Link>
          <Link
            href="/account"
            className={`hover:underline text-[13px] ${isActive("/account") ? "font-bold" : ""}`}
          >
            Compte
          </Link>
        </nav>
      </div>

      <div>
        <button
          className="flex items-center gap-3 hover:opacity-70 transition-opacity"
          onClick={onLogout}
        >
          <LogoutIcon />
          <span className="font-normal text-sm">Se déconnecter</span>
        </button>
      </div>
    </div>
  );
};

export default NavigationMenu;
