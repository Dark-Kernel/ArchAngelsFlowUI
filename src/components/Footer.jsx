import React from 'react';
import { 
  Rocket, 
  BarChart2, 
  TrendingUp, 
  Target, 
  FileText,
  Twitter,
  Youtube,
  Facebook,
  Mail,
  Home,
  Info
} from 'lucide-react';

const Footer = ({ onNavigate = () => {} }) => {
  return (
    <footer className="footer p-10 bg-gradient-to-r from-indigo-900 to-indigo-800 text-white">
      <div className="flex flex-col gap-4">
        <button onClick={() => onNavigate('/')} className="flex items-center text-2xl font-bold hover:scale-105 transition-transform">
          <Rocket className="h-8 w-8 mr-2" />
          SocialMetrics
        </button>
        <p className="max-w-xs">Revolutionizing social media analytics with AI-powered insights for tomorrow's digital leaders</p>
      </div> 
      
      <div>
        <span className="footer-title opacity-100 text-indigo-300">Navigate</span> 
        <button onClick={() => onNavigate('/')} className="link link-hover flex items-center gap-2 hover:text-indigo-300 transition-colors">
          <Home className="h-4 w-4" />
          Home
        </button>
        <button onClick={() => onNavigate('/about')} className="link link-hover flex items-center gap-2 hover:text-indigo-300 transition-colors">
          <Info className="h-4 w-4" />
          About us
        </button>
        <button onClick={() => onNavigate('/contact')} className="link link-hover flex items-center gap-2 hover:text-indigo-300 transition-colors">
          <Mail className="h-4 w-4" />
          Contact
        </button>
      </div> 

      <div>
        <span className="footer-title opacity-100 text-indigo-300">Services</span> 
        <a className="link link-hover flex items-center gap-2 hover:text-indigo-300 transition-colors">
          <BarChart2 className="h-4 w-4" />
          Smart Analytics
        </a>
        <a className="link link-hover flex items-center gap-2 hover:text-indigo-300 transition-colors">
          <TrendingUp className="h-4 w-4" />
          Growth Tracking
        </a>
        <a className="link link-hover flex items-center gap-2 hover:text-indigo-300 transition-colors">
          <Target className="h-4 w-4" />
          Competitor Intel
        </a>
        <a className="link link-hover flex items-center gap-2 hover:text-indigo-300 transition-colors">
          <FileText className="h-4 w-4" />
          AI Reports
        </a>
      </div> 

      <div>
        <span className="footer-title opacity-100 text-indigo-300">Social</span> 
        <div className="flex gap-4">
          <a className="hover:text-indigo-300 transition-colors hover:scale-110 transform">
            <Twitter className="h-6 w-6" />
          </a>
          <a className="hover:text-indigo-300 transition-colors hover:scale-110 transform">
            <Youtube className="h-6 w-6" />
          </a>
          <a className="hover:text-indigo-300 transition-colors hover:scale-110 transform">
            <Facebook className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;