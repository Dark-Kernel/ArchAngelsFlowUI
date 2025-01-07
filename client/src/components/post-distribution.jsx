import { Pie } from 'react-chartjs-2';

export const PostDistribution = ({ data }) => {
  const chartData = {
    labels: ['Reel', 'Carousel', 'Static'],
    datasets: [
      {
        data: data,
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(45, 212, 191, 0.8)',
          'rgba(71, 85, 105, 0.8)',
        ],
        borderColor: [
          'rgb(99, 102, 241)',
          'rgb(45, 212, 191)',
          'rgb(71, 85, 105)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div className="h-[300px]">
      <Pie data={chartData} options={options} />
    </div>
  );
};
