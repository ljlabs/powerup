import { Link } from "react-router-dom";
import Logo from "./Logo";
import ButtonIcon from "../ui/ButtonIcon";

interface Props {
  currentPage?: "home" | "library";
}

export default function TopNavBar({ currentPage = "home" }: Props) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-48 py-4 max-w-full bg-background border-b-2 border-on-background shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
      <Link to="/" className="flex items-center gap-2">
        <Logo size="md" />
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        <Link
          to="/"
          className={`font-label-bold hover:-translate-y-0.5 transition-all border-b-4 ${
            currentPage === "home"
              ? "text-on-background border-tertiary-fixed-dim"
              : "text-secondary border-transparent"
          }`}
        >
          Home
        </Link>
        <Link
          to="/skills"
          className={`font-label-bold hover:-translate-y-0.5 transition-all border-b-4 ${
            currentPage === "library"
              ? "text-on-background border-tertiary-fixed-dim"
              : "text-secondary border-transparent"
          }`}
        >
          Library
        </Link>
        <div className="flex items-center gap-2">
          <ButtonIcon icon="dark_mode" size="sm" />
          <button className="bg-brand-yellow font-label-bold px-4 py-2 border-2 border-on-background rounded-xl shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all">
            Sign In
          </button>
        </div>
      </nav>

      <button className="md:hidden material-symbols-outlined p-2 border-2 border-on-background rounded-xl bg-surface-container-high shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
        menu
      </button>
    </header>
  );
}
