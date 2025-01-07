import React, { useState, useEffect } from 'react';
import { 
  Rocket, Brain, BarChart2, Target, TrendingUp,
  Users, MessageSquare, CheckCircle, Sparkles,
  ArrowRight
} from 'lucide-react';

const HomePage = ({ onNavigate = () => {} }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s linear infinite ${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section with Enhanced Animations */}
      <div className={`relative min-h-screen flex items-center justify-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-4xl px-4 text-center">
          <div className="relative mb-6 group">
            <Rocket className="h-16 w-16 text-indigo-400 mx-auto transform transition-transform group-hover:scale-110 group-hover:rotate-12" />
            <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full scale-150 animate-pulse" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 animate-gradient">
            Elevate Your Social Presence
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-indigo-200 transform transition-all hover:scale-105">
            Harness the power of AI to transform your social media strategy. 
            Get real-time insights, predict trends, and outperform your competition.
          </p>

          <button 
            onClick={() => onNavigate('/analytics')}
            className="group relative btn btn-lg bg-gradient-to-r from-indigo-600 to-purple-600 border-none hover:from-indigo-700 hover:to-purple-700 shadow-lg transition-all duration-300 hover:scale-105"
          >
            Start Your Journey
            <Brain className="h-5 w-5 ml-2 group-hover:animate-bounce" />
            <span className="absolute inset-0 rounded-lg bg-white/20 animate-ping opacity-0 group-hover:opacity-100" />
          </button>
        </div>
      </div>

      {/* Features Section with Hover Effects */}
      <div className="py-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { icon: BarChart2, title: "AI-Powered Analytics", desc: "Get deep insights into your social media performance with our advanced AI analytics engine." },
            { icon: Target, title: "Smart Competitor Analysis", desc: "Stay ahead with AI-driven competitor insights and strategy recommendations." },
            { icon: TrendingUp, title: "Predictive Trends", desc: "Anticipate market trends with our AI prediction engine and stay ahead of the curve." }
          ].map((feature, i) => (
            <div 
              key={i}
              className="group card bg-gradient-to-br from-indigo-900 to-indigo-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            >
              <div className="card-body">
                <feature.icon className="h-12 w-12 text-indigo-400 mb-4 transform transition-transform group-hover:scale-110 group-hover:rotate-12" />
                <h3 className="card-title text-indigo-300 group-hover:text-indigo-200">{feature.title}</h3>
                <p className="text-indigo-100">{feature.desc}</p>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section with Counter Animation */}
      <div className="py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Users, title: "Active Users", value: "50K+", growth: "↗︎ 40% (30 days)" },
            { icon: MessageSquare, title: "Analyzed Posts", value: "10M+", growth: "↗︎ 25% (30 days)" },
            { icon: CheckCircle, title: "Success Rate", value: "99%", growth: "↗︎ 3% (30 days)" }
          ].map((stat, i) => (
            <div 
              key={i}
              className="stat bg-gradient-to-r from-indigo-900 to-indigo-800 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="stat-figure text-indigo-400">
                <stat.icon className="h-8 w-8 animate-pulse" />
              </div>
              <div className="stat-title text-indigo-300">{stat.title}</div>
              <div className="stat-value text-indigo-400">{stat.value}</div>
              <div className="stat-desc text-indigo-300">{stat.growth}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="py-16 px-4 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Sparkles className="h-12 w-12 mx-auto mb-6 text-indigo-400 animate-spin-slow" />
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Ready to Transform Your Social Strategy?
          </h2>
          <p className="mb-8 text-lg text-indigo-200">
            Join the next generation of digital leaders using AI-powered analytics to dominate social media.
          </p>
          <button
            onClick={() => onNavigate('/about')}
            className="group btn btn-lg bg-gradient-to-r from-indigo-600 to-purple-600 border-none hover:from-indigo-700 hover:to-purple-700 shadow-lg transition-all duration-300 hover:scale-105"
          >
            Discover More
            <ArrowRight className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/50 to-transparent" />
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
            transform: translateY(-100vh) scale(1);
          }
          100% {
            transform: translateY(-200vh) scale(0);
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

export default HomePage;