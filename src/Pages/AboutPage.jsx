import React from 'react';
import { Users, Target, Award, Github, Linkedin, Mail } from 'lucide-react';

const AboutPage = ({ onNavigate = () => {} }) => {
  const developers = [
    {
      name: "Anas Khan",
      github: "anaskhan28",
      linkedin: "https://www.linkedin.com/in/anaskhan28/",
      role: "Full Stack Developer",
      description: "Focused on creating beautiful and intuitive user experiences"
    },
    {
      name: "Sumit Patel",
      github: "Dark-Kernel",
      linkedin: "https://www.linkedin.com/in/sumit-patel-dev/",
      role: "Backend Developer",
      description: "Specialized in system architecture and API development"
    },
    {
      name: "Naufil",
      github: "Z-xus",
      linkedin: "https://www.linkedin.com/in/naufil-asar/",
      role: "AI Engineer",
      description: "Expert in AI/ML integration and LangChain implementation"
    },
    {
      name: "Manjiri C",
      github: "Codex108",
      linkedin: "https://www.linkedin.com/in/manjiri-chavande/",
      role: "Full Stack Developer",
      description: "Passionate about building scalable applications and AI integration"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-violet-950 text-white font-sans relative">
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]"
        style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}
      ></div>

      <div className="container mx-auto px-4 py-16 relative">
        {/* About Section */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            About ArchInsights
          </h1>
          <div className="bg-white-900/80 backdrop-blur-lg rounded-2xl p-8 border border-white/10 ">
            <p className="text-lg text-white/80 leading-relaxed">
            ArchInsight is a cutting-edge social media analysis platform that leverages the power of AI to provide 
              deep insights into your social media strategy. Built with modern technologies including React, 
              Langflow, and advanced AI models, our platform helps businesses and individuals make data-driven 
              decisions about their social media presence.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {developers.map((dev, index) => (
              <div key={index} className="bg-slate-900/80 backdrop-blur-lg rounded-xl p-6 border border-white/10 transform hover:scale-105 transition-transform duration-300">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-600/20 to-violet-600/20 flex items-center justify-center">
                    <Users className="w-10 h-10 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">{dev.name}</h3>
                  <p className="text-blue-400/80 text-sm">{dev.role}</p>
                </div>
                <p className="text-white/70 text-sm mb-4 text-center">
                  {dev.description}
                </p>
                <div className="flex justify-center space-x-4">
                  <a href={`https://github.com/${dev.github}`} target="_blank" rel="noopener noreferrer" 
                     className="text-white/60 hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={dev.linkedin} target="_blank" rel="noopener noreferrer"
                     className="text-white/60 hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;