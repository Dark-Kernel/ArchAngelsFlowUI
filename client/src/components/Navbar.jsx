import React from 'react';
import { Menu, Rocket } from 'lucide-react';
import logo from '../../public/arch-insght-logo.png'

const Navbar = ({ onNavigate = () => {} }) => {
  return (
    <div className="navbar bg-gradient-to-r from-slate-900 to-indigo-900 text-white sticky top-0 z-50 backdrop-blur-sm bg-opacity-90 rounded-b-4xl">
      {/* Logo Section */}
      <div className="flex-1">
        <button onClick={() => onNavigate('/')} className="btn btn-ghost text-xl font-bold">
          {/* <Rocket className="h-6 w-6 mr-2 animate-bounce" />
          SocialMetrics */}
          <img src={logo} className='w-full h-full'/>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="flex-none lg:hidden">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-indigo-700 transition-colors">
            <Menu className="h-5 w-5" />
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-slate-900 rounded-box w-52">
            <li>
              <button onClick={() => onNavigate('/')} className="hover:bg-indigo-700 transition-colors">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/analytics')} className="hover:bg-indigo-700 transition-colors">
                Analytics
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/about')} className="hover:bg-indigo-700 transition-colors">
                About
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/chat')} className="hover:bg-indigo-700 transition-colors">
                Chat
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex lg:flex-none">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <button onClick={() => onNavigate('/')} className="hover:bg-indigo-700 transition-colors">
              Home
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('/analytics')} className="hover:bg-indigo-700 transition-colors">
              Analytics
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('/about')} className="hover:bg-indigo-700 transition-colors">
              About
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('/chat')} className="hover:bg-indigo-700 transition-colors">
              Chat
            </button>
          </li>
          <li>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;