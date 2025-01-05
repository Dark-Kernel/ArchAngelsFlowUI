export const EngagementMetrics = ({ metrics }) => {
  return (
    <div className="grid grid-cols-3 gap-4 bg-base-200 bg-opacity-50 backdrop-blur-sm rounded-lg p-6">
      {metrics.map((metric, index) => (
        <div key={index} className="text-center">
          <h3 className="text-lg font-semibold text-white">{metric.label}</h3>
          <p className="text-3xl font-bold text-blue-400">{metric.value.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};
