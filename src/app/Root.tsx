import { Outlet, ScrollRestoration, useLocation } from "react-router";
import { MessageCircle } from "lucide-react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export default function Root() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <ScrollRestoration />
      {!isDashboard && <Nav />}
      <Outlet />
      {!isDashboard && <Footer />}
      {!isDashboard && (
        <a
          href="https://wa.me/971569358629"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact EHRay Photography via WhatsApp"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-foreground text-background flex items-center justify-center rounded-full shadow-xl hover:scale-110 active:scale-95 transition-transform duration-500"
        >
          <MessageCircle size={24} />
        </a>
      )}
    </div>
  );
}
