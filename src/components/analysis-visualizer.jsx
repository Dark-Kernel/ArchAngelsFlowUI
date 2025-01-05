import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

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

export const AnalysisVisualizer = ({ analysisText }) => {
  // Parse the analysis text to extract data
  const parseAnalysisData = (text) => {
    // Example parsing logic - adjust based on your AI output format
    const lines = text.split('\n');
    const data = {
      postTypes: {
        reels: 0,
        carousel: 0,
        static: 0
      },
      performance: [],
      trends: []
    };

    lines.forEach(line => {
      if (line.includes('Reels')) {
        const percentage = line.match(/(\d+)%/);
        if (percentage) data.postTypes.reels = parseInt(percentage[1]);
      }
      if (line.includes('Carousel')) {
        const percentage = line.match(/(\d+)%/);
        if (percentage) data.postTypes.carousel = parseInt(percentage[1]);
      }
      if (line.includes('static')) {
        const percentage = line.match(/(\d+)%/);
        if (percentage) data.postTypes.static = parseInt(percentage[1]);
      }
    });

    return data;
  };

  const data = parseAnalysisData(analysisText);

  const pieData = {
    labels: ['Reels', 'Carousel Posts', 'Static Posts'],
    datasets: [{
      data: [data.postTypes.reels || 35, data.postTypes.carousel || 40, data.postTypes.static || 25],
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
        data: [65, 59, 80, 81],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.4,
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

  const pieOptions = {
    ...options,
    aspectRatio: 1,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white/90 mb-4">Post Distribution</h3>
          <div className="h-[300px]">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white/90 mb-4">Performance Trends</h3>
          <div className="h-[300px]">
            <Line data={performanceData} options={options} />
          </div>
        </div>
      </div>
      
      <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white/90 mb-4">Key Insights</h3>
        <div className="prose prose-invert prose-sm max-w-none">
          {analysisText.split('\n').map((line, index) => (
            <p key={index} className="text-white/80">{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
