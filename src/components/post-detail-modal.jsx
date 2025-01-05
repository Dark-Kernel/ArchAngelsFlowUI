import { Line } from 'react-chartjs-2';

export const PostDetailModal = ({ post, onClose }) => {
  if (!post) return null;

  const detailData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Engagement Over Time',
        data: [post.engagement * 0.7, post.engagement * 0.9, post.engagement * 1.2, 
               post.engagement * 1.0, post.engagement * 0.8, post.engagement * 0.75, 
               post.engagement * 0.6],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.4,
      }
    ]
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

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-base-200 w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg mb-4">{post.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="stat bg-base-300">
            <div className="stat-title">Engagement Rate</div>
            <div className="stat-value">{post.engagement}%</div>
          </div>
          <div className="stat bg-base-300">
            <div className="stat-title">Total Reach</div>
            <div className="stat-value">{post.reach.toLocaleString()}</div>
          </div>
          <div className="stat bg-base-300">
            <div className="stat-title">Likes</div>
            <div className="stat-value">{post.likes.toLocaleString()}</div>
          </div>
          <div className="stat bg-base-300">
            <div className="stat-title">Shares</div>
            <div className="stat-value">{post.shares.toLocaleString()}</div>
          </div>
        </div>
        <div className="mb-4">
          <Line data={detailData} options={options} />
        </div>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

