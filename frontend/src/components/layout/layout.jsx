//import Navbar from "../navbar/navbar";
import { Outlet } from "react-router-dom";
import heroImg from "../../assets/welcome.jpg";
import Navbar from "../navbar/navbar";

export default function Layout() {
  return (
    <div
      className="relative w-full min-h-screen overflow-x-hidden bg-zinc-950"
      dir="rtl"
    >
      {/* Background */}
      <img
        src={heroImg}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/40 z-10" />

      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className=" relative z-20 w-full min-h-screen overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
