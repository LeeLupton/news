
import React from 'react';

const WelcomeMessage: React.FC = () => {
  return (
    <div className="text-center py-20 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6m-1-5h.01" />
      </svg>
      <h2 className="mt-4 text-2xl font-bold text-gray-800">Welcome to Global News Hub</h2>
      <p className="mt-2 text-md text-gray-600">Please select a category and then a news feed to get started.</p>
    </div>
  );
};

export default WelcomeMessage;
