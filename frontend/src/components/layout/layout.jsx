//import Navbar from "../navbar/navbar";
import { Outlet } from "react-router-dom";
import heroImg from "../../assets/welcome.jpg";

export default function Layout() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-zinc-950" dir="rtl">
      {/* Background Image */}
      <img
        src={heroImg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/40 z-10">
        {/* <Navbar /> */}
      </div>

      {/* Main Content Area - Locked Center */}
      <main className="absolute inset-0 z-20 w-full min-h-screen flex items-center justify-center p-4">
        {/* React Router mounts your Login component here */}
        <Outlet />
      </main>
    </div>
  );
}
