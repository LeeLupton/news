
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { NEWS_CATEGORIES } from './constants';
import type { NewsItem, NewsCategory } from './types';
import { fetchAllNews } from './services/rssService';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Sidebar from './components/Sidebar';
import NewsGrid from './components/NewsGrid';
import DashboardControls from './components/DashboardControls';

type SortOrder = 'newest' | 'oldest' | 'source';

const App: React.FC = () => {
  const [allNewsItems, setAllNewsItems] = useState<NewsItem[]>([]);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  // Control states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  useEffect(() => {
    const fetchNews = async () => {
      setStatus('loading');
      try {
        const items = await fetchAllNews(NEWS_CATEGORIES);
        setAllNewsItems(items);
        setStatus('success');
      } catch (err) {
        setError('Failed to fetch news feeds. Some sources might be unavailable. Please try again later.');
        setStatus('error');
        console.error(err);
      }
    };
    fetchNews();
  }, []);

  const handleToggleCategory = useCallback((categoryName: string) => {
    setActiveCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  }, []);

  const filteredAndSortedItems = useMemo(() => {
    let items = allNewsItems;

    // Search filter
    if (searchQuery.trim() !== '') {
      const lowercasedQuery = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.title.toLowerCase().includes(lowercasedQuery) ||
        item.description.toLowerCase().includes(lowercasedQuery)
      );
    }

    // Category filter
    if (activeCategories.size > 0) {
      items = items.filter(item => item.category && activeCategories.has(item.category));
    }

    // Sorting
    return [...items].sort((a, b) => {
      switch (sortOrder) {
        case 'oldest':
          if (!a.pubDate) return 1;
          if (!b.pubDate) return -1;
          return a.pubDate.getTime() - b.pubDate.getTime();
        case 'source':
          return a.source.localeCompare(b.source);
        case 'newest':
        default:
          if (!a.pubDate) return 1;
          if (!b.pubDate) return -1;
          return b.pubDate.getTime() - a.pubDate.getTime();
      }
    });
  }, [allNewsItems, searchQuery, activeCategories, sortOrder]);

  const renderContent = () => {
    if (status === 'loading') {
      return <LoadingSpinner />;
    }
    if (status === 'error') {
      return <ErrorMessage message={error || 'An unknown error occurred.'} />;
    }
    if (status === 'success') {
      return (
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar
            categories={NEWS_CATEGORIES}
            activeCategories={activeCategories}
            onToggleCategory={handleToggleCategory}
          />
          <div className="flex-1">
            <DashboardControls
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
              itemCount={filteredAndSortedItems.length}
            />
            <NewsGrid items={filteredAndSortedItems} />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
      <main className="container mx-auto p-4 md:p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
