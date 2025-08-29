
import React from 'react';
import type { NewsCategory } from '../types';

interface CategoryTabsProps {
  categories: NewsCategory[];
  selectedCategory: NewsCategory | null;
  onSelectCategory: (category: NewsCategory) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ease-in-out
              ${selectedCategory?.name === category.name 
                ? 'bg-blue-600 text-white shadow' 
                : 'bg-white text-gray-600 hover:bg-gray-200'
              }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
