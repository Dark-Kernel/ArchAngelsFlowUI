export const ChartCard = ({ title, children }) => {
    return (
      <div className="card bg-base-200 bg-opacity-50 backdrop-blur-sm hover:bg-opacity-70 transition-all">
        <div className="card-body">
          <h2 className="card-title text-xl font-semibold text-white mb-4">{title}</h2>
          {children}
        </div>
      </div>
    );
  };
  
  