import { Calendar } from 'lucide-react';

export const DateRangeSelector = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="input input-bordered w-40"
        />
        <span className="text-white">to</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="input input-bordered w-40"
        />
      </div>
      <select className="select select-bordered w-32 ml-auto">
        <option>All Types</option>
        <option>Reels</option>
        <option>Carousel</option>
        <option>Static</option>
      </select>
      <button className="btn btn-circle btn-ghost">
        <Calendar className="w-5 h-5" />
      </button>
    </div>
  );
};
