import React, { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
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

const ErrorMessage = ({ message, type = 'error' }) => {
  const bgColor = type === 'error' ? 'bg-red-500/10' : 'bg-yellow-500/10';
  const borderColor = type === 'error' ? 'border-red-500/20' : 'border-yellow-500/20';
  const textColor = type === 'error' ? 'text-red-500' : 'text-yellow-500';

  return (
    <div className={`${bgColor} border ${borderColor} rounded-lg p-4 ${textColor}`}>
      {message}
    </div>
  );
};

export const AnalysisVisualizer = ({ analysisText }) => {

  // Parse the analysis text
  const summaryMatch = analysisText.match(/---SUMMARY---([\s\S]*?)---VISUALIZATION_DATA---/);
  const summary = summaryMatch ? summaryMatch[1].trim() : '';

  const jsonMatch = analysisText.match(/---VISUALIZATION_DATA---([\s\S]*)/);
  let jsonString = jsonMatch ? jsonMatch[1].trim() : '';

  // Attempt to find and extract only the JSON part
  const jsonStartIndex = jsonString.indexOf('{');
  const jsonEndIndex = jsonString.lastIndexOf('}');
  if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
    jsonString = jsonString.slice(jsonStartIndex, jsonEndIndex + 1);
  }

  let data = null;
  let parseError = null;

  try {
    data = JSON.parse(jsonString);
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    parseError = 'Failed to parse the analysis data. Please try again.';
  }

  if (!data) {
    return <ErrorMessage message={parseError || 'No data available'} />;
  }

  if (!data['Post type distribution'] || !data['Weekly engagement rates (last month)'] || 
      !data['Top performing post types'] || !data['Monthly performance trends']) {
    return <ErrorMessage message="The analysis data is incomplete or in an unexpected format." type="warning" />;
  }

  const pieData = {
    labels: ['Reels', 'Carousel Posts', 'Static Posts'],
    datasets: [{
      data: [
        data['Post type distribution'].Reels,
        data['Post type distribution'].Carousel,
        data['Post type distribution'].Static
      ],
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

  const performanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Engagement Rate',
        data: data['Weekly engagement rates (last month)'],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.4,
      }
    ],
  };

  const monthlyTrendsData = {
    labels: Object.keys(data['Monthly performance trends']),
    datasets: [
      {
        label: 'Reels',
        data: Object.values(data['Monthly performance trends']).map(item => item.Reels),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
      {
        label: 'Carousel',
        data: Object.values(data['Monthly performance trends']).map(item => item.Carousel),
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.5)',
      },
      {
        label: 'Static',
        data: Object.values(data['Monthly performance trends']).map(item => item.Static),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
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
    ...options,
    aspectRatio: 1,
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white/90 mb-4">Summary</h3>
        <div className="prose prose-invert max-w-none">
          {summary.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white/90 mb-4">Post Distribution</h3>
          <div className="h-[300px]">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white/90 mb-4">Weekly Engagement Rates</h3>
          <div className="h-[300px]">
            <Line data={performanceData} options={options} />
          </div>
        </div>
      </div>
      
      <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white/90 mb-4">Monthly Performance Trends</h3>
        <div className="h-[300px]">
          <Line data={monthlyTrendsData} options={options} />
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white/90 mb-4">Top Performing Post Types</h3>
        <div className="space-y-2">
          {Object.entries(data['Top performing post types']).map(([type, rate], index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-white/80">{type}</span>
              <span className="text-white/80">{rate}% Engagement Rate</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

