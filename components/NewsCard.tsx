
import React from 'react';
import type { NewsItem } from '../types';
import ShareButton from './ShareButton';

interface NewsCardProps {
  item: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  const placeholderImage = `https://picsum.photos/seed/${item.link.length}/400/200`;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group flex flex-col">
      <a 
        href={item.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block"
        aria-label={`Read more about ${item.title}`}
      >
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={item.imageUrl || placeholderImage} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            onError={(e) => { e.currentTarget.src = placeholderImage; }}
            loading="lazy"
          />
        </div>
      </a>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-1">{item.source}</p>
        <a 
          href={item.link} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight flex-grow hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
        </a>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
      </div>
      <div className="mt-auto px-4 pb-3 pt-2 border-t border-gray-100 flex justify-between items-center">
        <p className="text-xs text-gray-500">
          {item.pubDate ? item.pubDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'No date'}
        </p>
        <ShareButton title={item.title} url={item.link} />
      </div>
    </div>
  );
};

export default NewsCard;
