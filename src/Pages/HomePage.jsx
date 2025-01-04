import React from 'react';
import { 
  Rocket, 
  Brain, 
  BarChart2, 
  Target, 
  TrendingUp,
  Users,
  MessageSquare,
  CheckCircle,
  Award
} from 'lucide-react';

const HomePage = ({ onNavigate = () => {} }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-violet-950 text-white font-sans relative">
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]"
        style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}
      ></div>

      {/* Content */}
      <div className="relative">
        {/* Hero Section */}
        <div className="hero min-h-screen relative overflow-hidden">
          <div className="hero-content text-center z-10">
            <div className="max-w-4xl">
              <div className="flex justify-center mb-6">
                <Rocket className="h-16 w-16 text-indigo-400 animate-bounce" />
              </div>
              <h1 className="text-6xl font-extrabold mb-6 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                Elevate Your Social Presence
              </h1>
              <p className="text-xl mb-8 text-indigo-200">
                Harness the power of AI to transform your social media strategy. 
                Get real-time insights, predict trends, and outperform your competition.
              </p>
              <button 
                onClick={() => onNavigate('/signup')}
                className="btn btn-lg bg-gradient-to-r from-indigo-600 to-purple-600 border-none hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:scale-105 transition-all"
              >
                Start Your Journey
                <Brain className="h-5 w-5 ml-2 animate-pulse" />
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="card bg-gradient-to-br from-indigo-900 to-indigo-800 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="card-body">
                <BarChart2 className="h-12 w-12 text-indigo-400 mb-4" />
                <h3 className="card-title text-indigo-300">AI-Powered Analytics</h3>
                <p className="text-indigo-100">
                  Get deep insights into your social media performance with our advanced AI analytics engine.
                </p>
              </div>
            </div>
            <div className="card bg-gradient-to-br from-indigo-900 to-indigo-800 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="card-body">
                <Target className="h-12 w-12 text-indigo-400 mb-4" />
                <h3 className="card-title text-indigo-300">Smart Competitor Analysis</h3>
                <p className="text-indigo-100">
                  Stay ahead with AI-driven competitor insights and strategy recommendations.
                </p>
              </div>
            </div>
            <div className="card bg-gradient-to-br from-indigo-900 to-indigo-800 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="card-body">
                <TrendingUp className="h-12 w-12 text-indigo-400 mb-4" />
                <h3 className="card-title text-indigo-300">Predictive Trends</h3>
                <p className="text-indigo-100">
                  Anticipate market trends with our AI prediction engine and stay ahead of the curve.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="stat bg-gradient-to-r from-indigo-900 to-indigo-800 rounded-lg p-6">
              <div className="stat-figure text-indigo-400">
                <Users className="h-8 w-8" />
              </div>
              <div className="stat-title text-indigo-300">Active Users</div>
              <div className="stat-value text-indigo-400">50K+</div>
              <div className="stat-desc text-indigo-300">↗︎ 40% (30 days)</div>
            </div>
            <div className="stat bg-gradient-to-r from-indigo-900 to-indigo-800 rounded-lg p-6">
              <div className="stat-figure text-indigo-400">
                <MessageSquare className="h-8 w-8" />
              </div>
              <div className="stat-title text-indigo-300">Analyzed Posts</div>
              <div className="stat-value text-indigo-400">10M+</div>
              <div className="stat-desc text-indigo-300">↗︎ 25% (30 days)</div>
            </div>
            <div className="stat bg-gradient-to-r from-indigo-900 to-indigo-800 rounded-lg p-6">
              <div className="stat-figure text-indigo-400">
                <CheckCircle className="h-8 w-8" />
              </div>
              <div className="stat-title text-indigo-300">Success Rate</div>
              <div className="stat-value text-indigo-400">99%</div>
              <div className="stat-desc text-indigo-300">↗︎ 3% (30 days)</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Ready to Transform Your Social Strategy?
            </h2>
            <p className="mb-8 text-lg text-indigo-200">
              Join the next generation of digital leaders using AI-powered analytics to dominate social media.
            </p>
            <button
              onClick={() => onNavigate('/about')}
              className="btn btn-lg bg-gradient-to-r from-indigo-600 to-purple-600 border-none hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:scale-105 transition-all"
            >
              Discover More
              <Brain className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
