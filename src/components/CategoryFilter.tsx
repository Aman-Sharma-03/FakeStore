import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/api';

interface CategoryFilterProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  onSelectCategory,
  selectedCategory
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCategories();
        setCategories(['all', ...data]);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load categories');
        setIsLoading(false);
      }
    };

    getCategories();
  }, []);

  if (isLoading) {
    return <div className="flex space-x-2 overflow-x-auto py-2">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
      ))}
    </div>;
  }

  if (error) {
    return <div className="text-red-500 text-sm">{error}</div>;
  }

  return (
    <div className="flex space-x-2 overflow-x-auto py-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors duration-200 ${
            selectedCategory === category
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;