
import React from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchQueryChange }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Global News Hub
          </h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">Your dashboard for world events</p>
        </div>
        <div className="relative w-full sm:w-auto">
          <input
            type="search"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="w-full sm:w-64 pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search news articles"
          />
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
