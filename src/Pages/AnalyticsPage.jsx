import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { ChartCard } from '../components/chart-card';
import { MetricCard } from '../components/metric-card';
import { PostAnalyticsTable } from '../components/post-analytics-table';
import { PostDetailModal } from '../components/post-detail-modal';
import { Calendar, Download, RefreshCcw } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Sample data for the posts table
const samplePosts = [
  {
    id: '1',
    title: 'New Product Launch',
    platform: 'Instagram',
    engagement: 4.8,
    reach: 15700,
    likes: 1200,
    shares: 300,
    comments: 150,
    date: '2024-01-15'
  },
  {
    id: '2',
    title: 'Customer Success Story',
    platform: 'LinkedIn',
    engagement: 5.2,
    reach: 12500,
    likes: 980,
    shares: 245,
    comments: 89,
    date: '2024-01-14'
  },
  {
    id: '3',
    title: 'Behind the Scenes',
    platform: 'Instagram',
    engagement: 6.1,
    reach: 18900,
    likes: 1500,
    shares: 420,
    comments: 230,
    date: '2024-01-13'
  }
];

const AnalyticsPage = () =>  {
  const [selectedPost, setSelectedPost] = useState(null);
  const [dateRange] = useState({ start: '2024-01-01', end: '2024-03-31' });

  const pieData = {
    labels: ['Reel', 'Carousel', 'Static'],
    datasets: [{
      data: [35, 40, 25],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(147, 51, 234, 0.8)',
        'rgba(59, 130, 246, 0.8)',
      ],
      borderColor: [
        'rgb(99, 102, 241)',
        'rgb(147, 51, 234)',
        'rgb(59, 130, 246)',
      ],
      borderWidth: 1,
    }],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Engagement Rate',
        data: [65, 59, 80, 81, 56, 90],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Follower Growth',
        data: [28, 48, 40, 59, 86, 77],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const performanceData = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'Reel',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 4000) + 1000),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Carousel',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000) + 500),
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Static',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 800) + 200),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Post Performance',
        data: [12, 19, 3, 5, 2, 3, 9],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      },
    ],
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

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'white',
        },
      },
    },
  };

  const engagementMetrics = [
    {
      title: 'Total Likes',
      value: '206,084',
      change: { value: '12%', trend: 'up' },
      color: 'text-blue-400'
    },
    {
      title: 'Total Shares',
      value: '41,417',
      change: { value: '8.5%', trend: 'up' },
      color: 'text-purple-400'
    },
    {
      title: 'Total Comments',
      value: '24,770',
      change: { value: '5.2%', trend: 'up' },
      color: 'text-indigo-400'
    }
  ];

  const postTypeMetrics = [
    {
      title: 'Reel',
      value: '62.8%',
      change: { value: '5.2%', trend: 'up' },
      color: 'text-blue-400'
    },
    {
      title: 'Carousel',
      value: '45.7%',
      change: { value: '3.1%', trend: 'up' },
      color: 'text-purple-400'
    },
    {
      title: 'Static',
      value: '29.5%',
      change: { value: '2.1%', trend: 'down' },
      color: 'text-indigo-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-violet-950">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
            Analytics Dashboard
          </h1>
          {/* <div className="flex items-center gap-4">
            <div className="flex items-center bg-base-200 rounded-lg p-2">
              <Calendar className="w-5 h-5 text-white mr-2" />
              <span className="text-white">
                {dateRange.start} to {dateRange.end}
              </span>
            </div>
            <button className="btn btn-ghost btn-circle">
              <RefreshCcw className="w-5 h-5 text-white" />
            </button>
            <button className="btn btn-ghost btn-circle">
              <Download className="w-5 h-5 text-white" />
            </button>
          </div> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {engagementMetrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ChartCard title="Post Distribution">
            <div className="h-[300px]">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </ChartCard>

          <ChartCard title="Engagement Summary">
            <div className="grid grid-cols-1 gap-4">
              {postTypeMetrics.map((metric, index) => (
                <div key={index} className="flex justify-between items-center p-2 rounded bg-base-300/50">
                  <span className="text-white">{metric.title}</span>
                  <div className="flex items-center gap-2">
                    <span className={metric.color}>{metric.value}</span>
                    <span className={`text-sm ${metric.change.trend === 'up' ? 'text-success' : 'text-error'}`}>
                      {metric.change.trend === 'up' ? '↑' : '↓'} {metric.change.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6">
          <ChartCard title="Post Performance Over Time">
            <div className="h-[400px]">
              <Line data={performanceData} options={options} />
            </div>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <ChartCard title="Recent Posts">
            <PostAnalyticsTable 
              posts={samplePosts} 
              onRowClick={(post) => setSelectedPost(post)} 
            />
          </ChartCard>
        </div>
      </div>

      <PostDetailModal 
        post={selectedPost} 
        onClose={() => setSelectedPost(null)} 
      />
    </div>
  );
}

export default AnalyticsPage;

