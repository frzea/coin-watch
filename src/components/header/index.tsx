import { ArrowLeftIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useThemeStore } from "@/store/themeStore";

export function Header() {
  const { isDark, toggleMode } = useThemeStore();
  const location = useLocation();
  const isCoinPage = location.pathname.includes("/coin/");

  return (
    <div className="flex items-center gap-2 pt-3 md:px-3">
      {isCoinPage && (
        <Button variant="outline" size="sm" className="md:hidden">
          <Link to="/">
            <ArrowLeftIcon />
          </Link>
        </Button>
      )}

      <Link to="/" className="text-lg font-semibold truncate">
        HOLDNote
      </Link>
      <Switch onClick={toggleMode} checked={isDark} className={`ml-auto ${isCoinPage ? "hidden md:flex" : ""}`} />
    </div>
  );
}