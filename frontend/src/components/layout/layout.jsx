import { Outlet } from "react-router-dom";
import heroImg from "../../assets/welcome.jpg";

export default function Layout() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden" dir="rtl">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Background"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Dark Overlay (better readability) */}
      <div className="absolute inset-0 bg-black/60 -z-10" />

      {/* Optional Gradient Layer (more depth) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent -z-10" />

      {/* Page Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* <Navbar /> */}

        <main className="flex-1 flex items-center justify-center px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
