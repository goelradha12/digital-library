import React, { useState } from "react";
import { Menu, X, Search } from "lucide-react";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-950 via-purple-950 to-black shadow-lg border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-100 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
           Top Books
          </h1>


          <div className="hidden md:flex items-center bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-white/200">
            <Search size={18} className="text-gray-300" />
            <input
              type="text"
              placeholder="Search books..."
              className="ml-2 bg-transparent text-white outline-none placeholder-gray-400"
            />
          </div>

  
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>


      {isOpen && (
        <div className="flex items-center bg-white px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
            <Search size={18} className="text-white" />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 bg-transparent text-white outline-none placeholder-gray-400 w-full"
            />
          </div>
      )}
    </header>
  );
}

export default NavBar;
