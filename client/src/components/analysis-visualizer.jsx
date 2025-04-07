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

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


const AIResponse = ({ summary }) => {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {summary}
      </ReactMarkdown>
    </div>
  );
};

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
  let parseError = null;
  let data = analysisText;

  // Handle string input if that's what's being passed
  if (typeof analysisText === 'string') {
    try {
      data = JSON.parse(analysisText);
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      parseError = 'Failed to parse the analysis data. Please try again.';
    }
  }

  if (!data) {
    return <ErrorMessage message={parseError || 'No data available'} />;
  }

  let summary = data.summary || 'No summary available';
  const visualizationData = data.visualization_data || {};

  // Safely extract post type distribution data
  const postTypeData = visualizationData.post_type_distribution || {};
  const pieData = {
    labels: ['Carousel Posts', 'Reel Posts', 'Static Posts'],
    datasets: [{
      data: [
        postTypeData.carousel || 0,
        postTypeData.reel || 0,
        postTypeData.static || 0
      ],
      backgroundColor: [
        'rgba(147, 51, 234, 0.8)',
        'rgba(99, 102, 241, 0.8)',
        'rgba(59, 130, 246, 0.8)',
      ],
      borderColor: [
        'rgb(147, 51, 234)',
        'rgb(99, 102, 241)',
        'rgb(59, 130, 246)',
      ],
      borderWidth: 1,
    }],
  };

  // Safely extract weekly engagement data
  const weeklyEngagementData = visualizationData.weekly_engagement_trend || [];
  const performanceData = {
    labels: weeklyEngagementData.map(item => item.week || ''),
    datasets: [
      {
        label: 'Likes',
        data: weeklyEngagementData.map(item => item.total_likes || 0),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Comments',
        data: weeklyEngagementData.map(item => item.total_comments || 0),
        borderColor: 'rgb(236, 72, 153)',
        backgroundColor: 'rgba(236, 72, 153, 0.5)',
        tension: 0.4,
      }
    ],
  };

  // Safely extract monthly trend data
  const monthlyTrendData = visualizationData.monthly_performance_trend || [];
  const monthlyTrendsData = {
    labels: monthlyTrendData.map(item => item.month || ''),
    datasets: [
      {
        label: 'Likes',
        data: monthlyTrendData.map(item => item.total_likes || 0),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
      {
        label: 'Comments',
        data: monthlyTrendData.map(item => item.total_comments || 0),
        borderColor: 'rgb(236, 72, 153)',
        backgroundColor: 'rgba(236, 72, 153, 0.5)',
      }
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
       // summary = `
// ### Posting Patterns Analysis

// * **Content Types:** The data shows a strong preference for "static" posts, with 4 out of 10 posts being of this type. "reel" content is popular too, with 5 posts, but "carousel" only has 1 post.

// * **Posting Frequency:** Some analysis text goes here.
// `;

  const pieOptions = {
    ...options,
    aspectRatio: 1,
  };

  // Safely extract top performing content
  const topPerformingContent = visualizationData.top_performing_content || [];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white/90 mb-4">Summary</h3>
        <div className="prose prose-invert max-w-none">
      {/*
          {summary.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
          */}
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {summary}
        </ReactMarkdown>
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
          {Array.isArray(topPerformingContent) ? (
            topPerformingContent.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-white/80">{item.post_type} ({item.source})</span>
                <span className="text-white/80">{item.likes} Likes, {item.comments} Comments</span>
              </div>
            ))
          ) : (
            <p className="text-white/80">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};
