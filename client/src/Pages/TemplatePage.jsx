import React, { useState, useEffect } from 'react';
import { 
  Sparkles,
  ArrowRight,
  BarChart2,
  PieChart,
  Clock,
  Star,
  TrendingUp,
  Award,
  BarChart,
  Hash,
  Calendar,
  AlignLeft,
  Image,
  MessageCircle,
  Heart,
  Eye,
  Database,
  Layers,
  Brain,
  LineChart
} from 'lucide-react';

const TemplatePage = ({ onNavigate = () => {} }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //FETCH FROM DIRECTORY
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('/data/instagramAnalytics.json');
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     const jsonData = await response.json();
    //     setLoading(false);
    //   } catch (err) {
    //     console.error("Error fetching data:", err);
    //     setError(err.message);
    //     setLoading(false);
    //   }
    // };

    //FETCH FROM LOCAL STORAGE
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem("instagramData");
        if (!storedData) {
          throw new Error("No data found in localStorage");
        }
        const response = await fetch('https://instalytics-ml.fly.dev', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(storedData),
      });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        // const jsonData = JSON.parse(storedData);
        setData(jsonData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      }
    };    

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-violet-950 text-white font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-indigo-400"></div>
          <p className="mt-4 text-indigo-200">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-violet-950 text-white font-sans flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-red-900/30 rounded-lg">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Data</h2>
          <p className="text-white mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

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

      {/* Header Section */}
      <div className="relative py-6 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-6 text-indigo-400 animate-spin-slow" />
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 animate-gradient">
            Instagram Analytics Dashboard
          </h1>
          <p className="text-xl text-indigo-200">
            Comprehensive analysis and AI-powered insights for your Instagram content strategy
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative px-4 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Dataset Overview Card */}
          <div className="card bg-gradient-to-br from-indigo-900/80 to-indigo-800/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-6 w-6 text-indigo-400" />
                <h2 className="card-title text-2xl text-indigo-300">Dataset Overview</h2>
              </div>
              <div className="stats stats-vertical bg-black/20 text-primary-content">
                <div className="stat">
                  <div className="stat-title text-indigo-300">Total Posts</div>
                  <div className="stat-value text-3xl text-white">{data.datasetOverview.totalPosts}</div>
                </div>
                
                <div className="stat">
                  <div className="stat-title text-indigo-300">Media Types</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="badge badge-lg bg-purple-700 text-white p-4">Carousel: {data.datasetOverview.mediaTypes.carousel}</div>
                    <div className="badge badge-lg bg-blue-700 text-white p-4">Reel: {data.datasetOverview.mediaTypes.reel}</div>
                    <div className="badge badge-lg bg-indigo-700 text-white p-4">Static: {data.datasetOverview.mediaTypes.static}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Engagement Statistics Card */}
          <div className="card bg-gradient-to-br from-indigo-900/80 to-indigo-800/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <BarChart2 className="h-6 w-6 text-indigo-400" />
                <h2 className="card-title text-2xl text-indigo-300">Engagement Statistics by Media Type</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="table table-zebra bg-black/20">
                  <thead>
                    <tr className="text-indigo-300">
                      <th>Media Type</th>
                      <th><Eye className="h-4 w-4 inline mr-1" /> Engagement</th>
                      <th><Heart className="h-4 w-4 inline mr-1" /> Likes</th>
                      <th><MessageCircle className="h-4 w-4 inline mr-1" /> Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.engagementStatistics.map((stat, index) => (
                      <tr key={index}>
                        <td className="font-medium">{stat.mediaType.charAt(0).toUpperCase() + stat.mediaType.slice(1)}</td>
                        <td className={`font-bold ${
                          stat.mediaType === 'carousel' ? 'text-purple-400' : 
                          stat.mediaType === 'reel' ? 'text-blue-400' : 'text-indigo-400'
                        }`}>
                          {stat.engagement.toFixed(2)}
                        </td>
                        <td>{stat.likeCount.toFixed(2)}</td>
                        <td>{stat.commentCount.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Cluster Analysis Card */}
          {/* <div className="card bg-gradient-to-br from-indigo-900/80 to-indigo-800/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="h-6 w-6 text-indigo-400" />
                <h2 className="card-title text-2xl text-indigo-300">Cluster Analysis</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="table table-zebra bg-black/20">
                  <thead>
                    <tr className="text-indigo-300">
                      <th>Cluster</th>
                      <th><Eye className="h-4 w-4 inline mr-1" /> Engagement</th>
                      <th><Heart className="h-4 w-4 inline mr-1" /> Likes</th>
                      <th><Hash className="h-4 w-4 inline mr-1" /> Hashtags</th>
                      <th>Media Types</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.clusterAnalysis.map((cluster, index) => (
                      <tr key={index}>
                        <td className="font-medium">Cluster {cluster.cluster}</td>
                        <td className={cluster.engagement > 100 ? "font-bold text-green-400" : ""}>
                          {cluster.engagement.toFixed(1)}
                        </td>
                        <td>{cluster.likeCount.toFixed(2)}</td>
                        <td className={cluster.hashtags > 10 ? "font-bold text-green-400" : ""}>
                          {cluster.hashtags.toFixed(2)}
                        </td>
                        <td>
                          <div className="flex flex-wrap gap-1">
                            {Object.entries(cluster.mediaTypes).map(([type, count], i) => (
                              <span key={i} className={`badge badge-xs ${
                                type === 'carousel' ? 'bg-purple-700' : 
                                type === 'reel' ? 'bg-blue-700' : 'bg-indigo-700'
                              }`}>
                                {type.charAt(0).toUpperCase()}: {count}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div> */}

          {/* Prediction Model Card */}
          <div className="card bg-gradient-to-br from-indigo-900/80 to-indigo-800/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="h-6 w-6 text-indigo-400" />
                <h2 className="card-title text-2xl text-indigo-300">Engagement Prediction Model</h2>
              </div>
              <div className="stats bg-black/20 text-primary-content">
                <div className="stat flex items-center gap-3">
                  <LineChart className="h-10 w-10 text-indigo-400 flex-shrink-0" />
                  <div>
                    <div className="stat-title text-indigo-300">Mean Squared Error</div>
                    <div className="stat-value text-2xl text-white">{data.predictionModel.meanSquaredError.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Keywords Card */}
          <div className="card bg-gradient-to-br from-indigo-900/80 to-indigo-800/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <Hash className="h-6 w-6 text-indigo-400" />
                <h2 className="card-title text-2xl text-indigo-300">Top Keywords in Captions</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.topKeywords.map((keyword, index) => {
                  // Calculate background color based on count (higher count = more vibrant)
                  const bgColorClass = index < 3 ? 'bg-purple-700/80 p-4' : 
                                       index < 5 ? 'bg-purple-600/80 p-4' :
                                       index < 7 ? 'bg-indigo-700/80 p-4' : 'bg-indigo-600/80 p-4';
                  return (
                    <div key={index} className={`badge badge-lg ${bgColorClass} text-white`}>
                      {keyword.word} ({keyword.count})
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Feature Importance Card */}
          <div className="card bg-gradient-to-br from-indigo-900/80 to-indigo-800/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-6 w-6 text-indigo-400" />
                <h2 className="card-title text-2xl text-indigo-300">Feature Importance</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="table table-zebra bg-black/20">
                  <thead>
                    <tr className="text-indigo-300">
                      <th>Feature</th>
                      <th>Importance (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.featureImportance.map((feature, index) => {
                      const featureDisplayName = feature.feature.replace('media_', 'Media: ')
                        .replace('caption_length', 'Caption Length')
                        .replace('hashtag_count', 'Hashtag Count')
                        .replace('emoji_count', 'Emoji Count');
                      
                      const isHighImportance = feature.importance > 30;
                      
                      return (
                        <tr key={index}>
                          <td>
                            {feature.feature.includes('media') && <Image className="h-4 w-4 inline mr-1" />}
                            {feature.feature.includes('hashtag') && <Hash className="h-4 w-4 inline mr-1" />}
                            {feature.feature.includes('caption') && <AlignLeft className="h-4 w-4 inline mr-1" />}
                            {featureDisplayName.charAt(0).toUpperCase() + featureDisplayName.slice(1)}
                          </td>
                          <td className={isHighImportance ? "font-bold text-green-400" : ""}>
                            {feature.importance.toFixed(2)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Best Times to Post Card */}
          <div className="card bg-gradient-to-br from-indigo-900/80 to-indigo-800/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-indigo-400" />
                <h2 className="card-title text-2xl text-indigo-300">Best Times to Post</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="table table-zebra bg-black/20">
                  <thead>
                    <tr className="text-indigo-300">
                      <th><Calendar className="h-4 w-4 inline mr-1" /> Day</th>
                      <th><Clock className="h-4 w-4 inline mr-1" /> Hour</th>
                      <th><Eye className="h-4 w-4 inline mr-1" /> Engagement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.bestTimesToPost.map((time, index) => (
                      <tr key={index}>
                        <td className="font-medium">{time.dayName}</td>
                        <td>{time.hourOfDay}:00</td>
                        <td className={index < 2 ? "font-bold text-green-400" : ""}>
                          {time.engagement.toFixed(1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Image Showcase Section - Full Width */}
        <div className="max-w-6xl mx-auto mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* First Image Card */}
            <div className="card bg-gradient-to-br from-indigo-900/80 to-indigo-800/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <figure className="px-6 pt-6">
                <img 
                  src={data.visualizations[0].imageUrl} 
                  alt={data.visualizations[0].title} 
                  className="rounded-xl object-cover w-full h-64 shadow-lg" 
                  loading="lazy" 
                />
              </figure>
              <div className="card-body">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart className="h-6 w-6 text-indigo-400" />
                  <h2 className="card-title text-2xl text-indigo-300">{data.visualizations[0].title}</h2>
                </div>
                <p className="text-indigo-200">
                  {data.visualizations[0].description}
                </p>
              </div>
            </div>
            
            {/* Second Image Card */}
            <div className="card bg-gradient-to-br from-indigo-900/80 to-indigo-800/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <figure className="px-6 pt-6">
                <img 
                  src={data.visualizations[1].imageUrl} 
                  alt={data.visualizations[1].title} 
                  className="rounded-xl object-cover w-full h-64 shadow-lg" 
                  loading="lazy" 
                />
              </figure>
              <div className="card-body">
                <div className="flex items-center gap-3 mb-2">
                  <PieChart className="h-6 w-6 text-indigo-400" />
                  <h2 className="card-title text-2xl text-indigo-300">{data.visualizations[1].title}</h2>
                </div>
                <p className="text-indigo-200">
                  {data.visualizations[1].description}
                </p>
              </div>
            </div>
            
          </div>
        </div>
        
        {/* Recommendations Section - Full Width */}
        <div className="max-w-6xl mx-auto mt-8">
          <div className="card bg-gradient-to-br from-purple-900/80 to-indigo-800/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-8 w-8 text-purple-400" />
                <h2 className="card-title text-3xl text-purple-300">Instagram Content Strategy Recommendations</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Image className="h-6 w-6 text-purple-400 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-indigo-300">Best performing media type</h3>
                      <p className="text-white">
                        {data.recommendations.bestPerformingMediaType.type.charAt(0).toUpperCase() + 
                         data.recommendations.bestPerformingMediaType.type.slice(1)} 
                        (avg. engagement: {data.recommendations.bestPerformingMediaType.avgEngagement.toFixed(2)})
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <AlignLeft className="h-6 w-6 text-purple-400 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-indigo-300">Caption strategy</h3>
                      <p className="text-white">{data.recommendations.captionStrategy}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Hash className="h-6 w-6 text-purple-400 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-indigo-300">Hashtag strategy</h3>
                      <p className="text-white">{data.recommendations.hashtagStrategy}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-6 w-6 text-purple-400 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-indigo-300">Best times to post</h3>
                      <ul className="list-disc list-inside text-white">
                        {data.recommendations.bestTimes.map((time, index) => (
                          <li key={index}>{time}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Hash className="h-6 w-6 text-purple-400 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-indigo-300">Popular topics in your successful posts</h3>
                      <ul className="list-disc list-inside text-white">
                        {data.recommendations.popularTopics.map((topic, index) => (
                          <li key={index}>"{topic}"</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="divider text-indigo-300">Top Performing Posts</div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.topPerformingPosts.map((post, index) => (
                  <div key={index} className="stat bg-black/30 rounded-box">
                    <div className={`stat-figure ${
                      post.mediaType === 'carousel' ? 'text-purple-400' : 
                      post.mediaType === 'reel' ? 'text-blue-400' : 'text-indigo-400'
                    }`}>
                      <Image className="h-8 w-8" />
                    </div>
                    <div className="stat-title text-indigo-300">Post {post.id}</div>
                    <div className="stat-value text-xl text-white">
                      {post.mediaType.charAt(0).toUpperCase() + post.mediaType.slice(1)}
                    </div>
                    <div className="stat-desc text-green-400">Engagement: {post.engagement}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Back Button */}
        {/* <div className="max-w-6xl mx-auto mt-8 flex justify-end">
          <button
            onClick={() => onNavigate('/')}
            className="group btn btn-lg bg-gradient-to-r from-indigo-600 to-purple-600 border-none hover:from-indigo-700 hover:to-purple-700 shadow-lg transition-all duration-300 hover:scale-105"
          >
            Back to Home
            <ArrowRight className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" />
          </button>
        </div> */}
      </div>

      {/* Animation Keyframes */}
      <style>{`
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

export default TemplatePage;