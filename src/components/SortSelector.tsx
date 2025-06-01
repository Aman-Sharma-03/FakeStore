import React from 'react';
import { SortOrder } from '../types';
import { ArrowDownUp } from 'lucide-react';

interface SortSelectorProps {
  onSortChange: (order: SortOrder) => void;
  currentSort: SortOrder;
}

const SortSelector: React.FC<SortSelectorProps> = ({ 
  onSortChange, 
  currentSort 
}) => {
  return (
    <div className="relative inline-block">
      <button
        onClick={() => onSortChange(currentSort === 'asc' ? 'desc' : 'asc')}
        className="flex items-center space-x-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={`Sort by price: ${currentSort === 'asc' ? 'low to high' : 'high to low'}`}
      >
        <ArrowDownUp size={16} />
        <span>Price: {currentSort === 'asc' ? 'Low to High' : 'High to Low'}</span>
      </button>
    </div>
  );
};

export default SortSelector;