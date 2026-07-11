import type { ReactNode } from "react";
import TopNavBar from "./navigation/TopNavBar";
import Footer from "./layout/Footer";

interface Props {
  children: ReactNode;
  currentPage?: "home" | "library";
}

export default function Layout({ children, currentPage = "home" }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <TopNavBar currentPage={currentPage} />
      <main className="flex-1 pt-24 px-4 md:px-48 pb-16 max-w-[1440px] mx-auto w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
