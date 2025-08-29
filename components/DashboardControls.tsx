
import React from 'react';

type SortOrder = 'newest' | 'oldest' | 'source';

interface DashboardControlsProps {
  sortOrder: SortOrder;
  onSortOrderChange: (order: SortOrder) => void;
  itemCount: number;
}

const DashboardControls: React.FC<DashboardControlsProps> = ({ sortOrder, onSortOrderChange, itemCount }) => {
  const sortOptions: { key: SortOrder; label: string }[] = [
    { key: 'newest', label: 'Newest' },
    { key: 'oldest', label: 'Oldest' },
    { key: 'source', label: 'Source' },
  ];

  return (
    <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <p className="text-sm font-medium text-gray-600">
        Showing <span className="font-bold text-gray-800">{itemCount}</span> articles
      </p>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-600">Sort by:</span>
        <div className="flex flex-wrap gap-2">
            {sortOptions.map(option => (
                 <button
                 key={option.key}
                 onClick={() => onSortOrderChange(option.key)}
                 className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ease-in-out ${
                   sortOrder === option.key
                     ? 'bg-indigo-600 text-white shadow'
                     : 'bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
                 }`}
               >
                 {option.label}
               </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardControls;
