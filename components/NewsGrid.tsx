
import React, { useState, useRef, useEffect } from 'react';
import type { NewsItem } from '../types';
import NewsCard from './NewsCard';

interface NewsGridProps {
  items: NewsItem[];
}

const ITEMS_PER_PAGE = 20;

const NewsGrid: React.FC<NewsGridProps> = ({ items }) => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset visible count when items change (e.g., due to filtering)
    setVisibleCount(ITEMS_PER_PAGE);
  }, [items]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, items.length));
        }
      },
      { rootMargin: '200px' } // Load next batch before user reaches the end
    );

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [items.length]);

  const visibleItems = items.slice(0, visibleCount);

  if (items.length === 0) {
    return <p className="text-center text-gray-500 text-lg mt-12">No articles match your criteria.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {visibleItems.map((item, index) => (
          <NewsCard key={`${item.link}-${index}`} item={item} />
        ))}
      </div>
      {visibleCount < items.length && (
        <div ref={loader} className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
    </>
  );
};

export default NewsGrid;
