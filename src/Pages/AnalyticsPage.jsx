import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const AnalyticsPage = () => {
  // Line Chart Data
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

  // Pie Chart Data
  const pieData = {
    labels: ['Instagram', 'Twitter', 'LinkedIn', 'Facebook'],
    datasets: [
      {
        data: [40, 25, 20, 15],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(147, 51, 234, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(139, 92, 246, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Bar Chart Data
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
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-violet-950 text-white font-sans">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
          Analytics Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Engagement Overview */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Engagement Overview</h2>
            <Line data={lineData} options={options} />
          </div>



          {/* Weekly Performance */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Weekly Performance</h2>
            <Bar data={barData} options={options} />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-400">Total Followers</h3>
              <p className="text-3xl font-bold">45.2K</p>
              <p className="text-green-400 text-sm">↑ 12% this month</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-400">Engagement Rate</h3>
              <p className="text-3xl font-bold">4.8%</p>
              <p className="text-green-400 text-sm">↑ 2.1% this month</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-lg font-semibold text-indigo-400">Total Posts</h3>
              <p className="text-3xl font-bold">892</p>
              <p className="text-green-400 text-sm">↑ 8% this month</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-lg font-semibold text-violet-400">Avg. Reach</h3>
              <p className="text-3xl font-bold">15.7K</p>
              <p className="text-red-400 text-sm">↓ 3% this month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
