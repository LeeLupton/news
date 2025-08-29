
import React from 'react';
import type { NewsFeed } from '../types';

interface FeedSelectorProps {
  feeds: NewsFeed[];
  selectedFeed: NewsFeed | null;
  onSelectFeed: (feed: NewsFeed) => void;
}

const FeedSelector: React.FC<FeedSelectorProps> = ({ feeds, selectedFeed, onSelectFeed }) => {
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-md font-semibold text-gray-700 mb-3">Select a Feed</h3>
      <div className="flex flex-wrap gap-2">
        {feeds.map((feed) => (
          <button
            key={feed.name}
            onClick={() => onSelectFeed(feed)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ease-in-out
              ${selectedFeed?.url === feed.url
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
              }`}
          >
            {feed.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeedSelector;
