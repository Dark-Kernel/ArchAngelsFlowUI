import React, { useState, useEffect } from 'react';
import { Users, Target, Award, Github, Linkedin, Mail, Sparkles, Code, Binary } from 'lucide-react';

const AboutPage = ({ onNavigate = () => {} }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const developers = [
    {
      name: "Anas Khan",
      github: "anaskhan28",
      linkedin: "https://www.linkedin.com/in/anaskhan28/",
      role: "Full Stack Developer",
      description: "Focused on creating beautiful and intuitive user experiences",
      icon: Code
    },
    {
      name: "Sumit Patel",
      github: "Dark-Kernel",
      linkedin: "https://www.linkedin.com/in/sumit-patel-dev/",
      role: "Backend Developer",
      description: "Specialized in system architecture and API development",
      icon: Binary
    },
    {
      name: "Naufil",
      github: "Z-xus",
      linkedin: "https://www.linkedin.com/in/naufil-asar/",
      role: "AI Engineer",
      description: "Expert in AI/ML integration and LangChain implementation",
      icon: Target
    },
    {
      name: "Manjiri C",
      github: "Codex108",
      linkedin: "https://www.linkedin.com/in/manjiri-chavande/",
      role: "Full Stack Developer",
      description: "Passionate about building scalable applications and AI integration",
      icon: Code
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-violet-950 text-white font-sans relative overflow-hidden">
      {/* Enhanced Grid Pattern with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]"
        style={{ 
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          transform: 'translateZ(0)',
        }}
      />

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatParticle ${5 + Math.random() * 5}s linear infinite ${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className={`container mx-auto px-4 py-16 relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* About Section with Enhanced Animation */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <div className="mb-8 relative">
            <Sparkles className="h-12 w-12 mx-auto text-blue-400 animate-spin-slow" />
            <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full scale-150" />
          </div>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent animate-gradient">
            About ArchInsights
          </h1>
          
          <div className="group bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
            <p className="text-lg text-white/80 leading-relaxed transform transition-all">
              ArchInsights is a cutting-edge social media analysis platform that leverages the power of AI to provide 
              deep insights into your social media strategy. Built with modern technologies including React, 
              Langflow, and advanced AI models, our platform helps businesses and individuals make data-driven 
              decisions about their social media presence.
            </p>
          </div>
        </div>

        {/* Enhanced Team Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent animate-gradient">
            Meet Our Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {developers.map((dev, index) => (
              <div 
                key={index} 
                className="group relative bg-slate-900/80 backdrop-blur-lg rounded-xl p-6 border border-white/10 transition-all duration-300 hover:border-white/20"
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Animated Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-violet-600/0 to-blue-600/0 opacity-0 group-hover:opacity-20 transform group-hover:scale-105 transition-all duration-500 rounded-xl blur-xl" />
                
                <div className="relative">
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-600/20 to-violet-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <dev.icon className="w-10 h-10 text-blue-400 group-hover:animate-pulse" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-1 transform transition-all group-hover:scale-105">{dev.name}</h3>
                    <p className="text-blue-400/80 text-sm transform transition-all">{dev.role}</p>
                  </div>
                  <p className="text-white/70 text-sm mb-4 text-center transition-all duration-300 group-hover:text-white/90">
                    {dev.description}
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a 
                      href={`https://github.com/${dev.github}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors transform hover:scale-110 duration-300"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a 
                      href={dev.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors transform hover:scale-110 duration-300"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0) scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
            transform: translateY(-50vh) translateX(20vw) scale(1);
          }
          100% {
            transform: translateY(-100vh) translateX(40vw) scale(0);
            opacity: 0;
          }
        }
        @keyframes animate-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: animate-gradient 4s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;