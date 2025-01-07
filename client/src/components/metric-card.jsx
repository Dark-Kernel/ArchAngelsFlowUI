export const MetricCard = ({ title, value, change, color }) => {
    return (
      <div className="card bg-base-200 bg-opacity-50 backdrop-blur-sm hover:bg-opacity-70 transition-all">
        <div className="card-body p-4">
          <h3 className={`text-lg font-semibold ${color}`}>{title}</h3>
          <p className="text-3xl font-bold text-white">{value}</p>
          <p className={`text-sm ${change.trend === 'up' ? 'text-success' : 'text-error'}`}>
            {change.trend === 'up' ? '↑' : '↓'} {change.value} this month
          </p>
        </div>
      </div>
    );
  };
  
  