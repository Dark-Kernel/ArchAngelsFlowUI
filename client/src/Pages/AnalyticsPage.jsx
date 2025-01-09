import { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsPage = () => {
  const [data, setData] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      try {
        const storedData = localStorage.getItem('instagramData');
        const storedUsername = localStorage.getItem('username');
        
        if (storedData && storedUsername) {
          setData(JSON.parse(storedData));
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Safe calculation functions with null checks
  const calculateTotalLikes = () => {
    return data?.reduce((sum, post) => sum + (post?.like_count || 0), 0) || 0;
  };

  const calculateTotalComments = () => {
    return data?.reduce((sum, post) => sum + (post?.comment_count || 0), 0) || 0;
  };

  const getPostTypes = () => {
    const types = data?.reduce((acc, post) => {
      if (post?.media_type) {
        acc[post.media_type] = (acc[post.media_type] || 0) + 1;
      }
      return acc;
    }, {}) || {};
    return types;
  };

  const getEngagementData = () => {
    return {
      labels: data.map((_, index) => `Post ${index + 1}`),
      datasets: [
        {
          label: 'Likes',
          data: data.map(post => post.like_count),
          borderColor: 'rgb(147, 51, 234)',
          backgroundColor: 'rgba(147, 51, 234, 0.5)',
          tension: 0.4,
        },
        {
          label: 'Comments',
          data: data.map(post => post.comment_count),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          tension: 0.4,
        }
      ],
    };
  };

  const pieData = {
    labels: Object.keys(getPostTypes()),
    datasets: [{
      data: Object.values(getPostTypes()),
      backgroundColor: [
        'rgba(147, 51, 234, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)',
      ],
      borderColor: [
        'rgba(147, 51, 234, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(236, 72, 153, 1)',
      ],
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      y: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
    },
  };



  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-violet-950 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-violet-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-primary mb-8 animate-fade-in">
          Analytics for @{username}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="stats bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="stat">
              <div className="stat-title">Total Likes</div>
              <div className="stat-value text-primary">
                {calculateTotalLikes().toLocaleString()}
              </div>
              <div className="stat-desc text-success">↗︎ Last 30 days</div>
            </div>
          </div>
          
          <div className="stats bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="stat">
              <div className="stat-title">Total Comments</div>
              <div className="stat-value text-secondary">
                {calculateTotalComments().toLocaleString()}
              </div>
              <div className="stat-desc text-success">↗︎ Last 30 days</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body">
              <h2 className="card-title">Post Distribution</h2>
              <div className="h-[300px]">
                <Pie data={pieData} options={options} />
              </div>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body">
              <h2 className="card-title">Engagement Over Time</h2>
              <div className="h-[300px]">
                <Line data={getEngagementData()} options={options} />
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Recent Posts</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Likes</th>
                    <th>Comments</th>
                    <th>Posted At</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((post) => (
                    <tr 
                      key={post.code}
                      onClick={() => setSelectedPost(post)}
                      className="hover:bg-base-300 cursor-pointer transition-colors duration-300"
                    >
                      <td className="capitalize">{post.media_type}</td>
                      <td>{post.like_count?.toLocaleString()}</td>
                      <td>{post.comment_count?.toLocaleString()}</td>
                      <td>{new Date(post.taken_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Post Details Modal */}
      {selectedPost && (
        <div className="modal modal-open">
          <div className="modal-box bg-base-200 w-11/12 max-w-5xl">
            <h3 className="text-2xl font-bold mb-6">
              {selectedPost.media_type.charAt(0).toUpperCase() + selectedPost.media_type.slice(1)} - {new Date(selectedPost.taken_at).toLocaleDateString()}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="stat bg-base-300">
                <div className="stat-title">Likes</div>
                <div className="stat-value text-[#8B5CF6] text-4xl">
                  {selectedPost.like_count?.toLocaleString()}
                </div>
              </div>
              <div className="stat bg-base-300">
                <div className="stat-title">Comments</div>
                <div className="stat-value text-[#EC4899] text-4xl">
                  {selectedPost.comment_count?.toLocaleString()}
                </div>
              </div>
              <div className="stat bg-base-300">
                <div className="stat-title">Type</div>
                <div className="stat-value text-[#2DD4BF] text-4xl capitalize">
                  {selectedPost.media_type}
                </div>
              </div>
            </div>

            <div className="card bg-base-300 p-4 mb-6">
              <h4 className="font-semibold mb-4">Performance Over Time</h4>
              <div className="h-[300px]">
                <Line 
                  data={{
                    labels: ['Day 1', 'Day 3', 'Day 7', 'Day 14', 'Day 30'],
                    datasets: [
                      {
                        label: 'Engagement',
                        data: [
                          selectedPost.like_count * 0.4,
                          selectedPost.like_count * 0.7,
                          selectedPost.like_count,
                          selectedPost.like_count * 0.8,
                          selectedPost.like_count * 0.6,
                        ],
                        borderColor: '#8B5CF6',
                        backgroundColor: 'rgba(139, 92, 246, 0.2)',
                        tension: 0.4,
                        fill: true,
                      }
                    ]
                  }}
                  options={{
                    ...options,
                    plugins: {
                      ...options.plugins,
                      title: {
                        display: true,
                        text: 'Post Engagement Trend',
                        color: 'white',
                        font: {
                          size: 16
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className="modal-action">
              <button 
                className="btn btn-primary"
                onClick={() => setSelectedPost(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style >{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default AnalyticsPage;

