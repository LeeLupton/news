
import React from 'react';
import type { NewsCategory } from '../types';

interface SidebarProps {
  categories: NewsCategory[];
  activeCategories: Set<string>;
  onToggleCategory: (categoryName: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, activeCategories, onToggleCategory }) => {
  return (
    <aside className="w-full lg:w-64 bg-white p-4 rounded-lg shadow-sm border border-gray-200 self-start lg:sticky lg:top-24">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Categories</h2>
      <div className="space-y-2">
        {categories.map(category => (
          <label key={category.name} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              checked={activeCategories.has(category.name)}
              onChange={() => onToggleCategory(category.name)}
            />
            <span className="text-gray-700 font-medium">{category.name}</span>
          </label>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
