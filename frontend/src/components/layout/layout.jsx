import { Outlet } from "react-router-dom"; 
import heroImg from "../../assets/welcome.jpg"; 

export default function Layout() { 
  return ( 
    <div 
      dir="rtl"
      className="fixed inset-0 w-screen h-screen overflow-hidden flex flex-col bg-cover bg-center bg-no-repeat isolate"
      style={{ 
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent), linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${heroImg})` 
      }}
    >
      {/* Page Content Container */}
      <div className="flex flex-col h-full w-full justify-center items-center px-6"> 
        {/* <Navbar /> */} 
        
        <main className="w-full max-w-lg flex items-center justify-center"> 
          <Outlet /> 
        </main> 
      </div> 
    </div> 
  ); 
}
