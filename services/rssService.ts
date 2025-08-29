import type { NewsItem, NewsCategory, NewsFeed } from '../types';

const CORS_PROXY = 'https://corsproxy.io/?';

const stripHtml = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

const getImageUrl = (item: Element, description: string): string | undefined => {
  const mediaContent = item.getElementsByTagNameNS('*', 'content').item(0);
  if (mediaContent && mediaContent.getAttribute('url')) {
    return mediaContent.getAttribute('url')!;
  }
  const enclosure = item.querySelector('enclosure');
  if (enclosure && enclosure.getAttribute('url')) {
    return enclosure.getAttribute('url')!;
  }
  const doc = new DOMParser().parseFromString(description, 'text/html');
  const img = doc.querySelector('img');
  return img?.src;
};

export const fetchRssFeed = async (feedUrl: string, categoryName: string): Promise<NewsItem[]> => {
  const response = await fetch(`${CORS_PROXY}${encodeURIComponent(feedUrl)}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} for URL: ${feedUrl}`);
  }

  const text = await response.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, 'application/xml');

  const parserError = xmlDoc.querySelector('parsererror');
  if (parserError) {
    console.error('XML Parsing Error:', parserError.textContent);
    throw new Error(`Failed to parse RSS feed from ${feedUrl}.`);
  }

  const items = Array.from(xmlDoc.querySelectorAll('item, entry'));
  const sourceTitle = xmlDoc.querySelector('channel > title, feed > title')?.textContent ?? 'Unknown Source';

  return items.map((item): NewsItem => {
    const title = item.querySelector('title')?.textContent ?? 'No title';
    const link = item.querySelector('link')?.getAttribute('href') ?? item.querySelector('link')?.textContent ?? '#';
    const rawDescription = item.querySelector('description, summary, content')?.textContent ?? '';
    const description = stripHtml(rawDescription).substring(0, 150) + (stripHtml(rawDescription).length > 150 ? '...' : '');
    const pubDateStr = item.querySelector('pubDate, published, updated')?.textContent ?? null;
    const imageUrl = getImageUrl(item, rawDescription);
    
    return {
      title,
      link,
      description,
      pubDate: pubDateStr ? new Date(pubDateStr) : null,
      imageUrl,
      source: sourceTitle,
      category: categoryName,
    };
  });
};

const fetchFmpNews = async (apiUrl: string, categoryName: string): Promise<NewsItem[]> => {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} for URL: ${apiUrl}`);
    }
    const data = await response.json();
  
    if (!Array.isArray(data)) {
      console.error('FMP API response is not an array:', data);
      return [];
    }

    if (data.length > 0 && data[0]['Error Message']) {
        console.error('FMP API Error:', data[0]['Error Message']);
        return [];
    }

    return data.map((item: any): NewsItem => ({
      title: item.title ?? 'No title',
      link: item.url ?? '#',
      description: (item.text ?? '').substring(0, 150) + ((item.text?.length ?? 0) > 150 ? '...' : ''),
      pubDate: item.publishedDate ? new Date(item.publishedDate) : null,
      imageUrl: item.image,
      source: item.site ?? 'Financial Modeling Prep',
      category: categoryName,
    }));
};

export const fetchAllNews = async (categories: NewsCategory[]): Promise<NewsItem[]> => {
  const allFeedPromises = categories.flatMap(category => 
    category.feeds.map(feed => {
      if (feed.type === 'api') {
        return fetchFmpNews(feed.url, category.name);
      }
      return fetchRssFeed(feed.url, category.name); // Default to RSS
    })
  );

  const results = await Promise.allSettled(allFeedPromises);
  
  const allItems: NewsItem[] = [];
  results.forEach(result => {
    // FIX: Correctly handle PromiseSettledResult to avoid type errors.
    // By checking status first, we ensure `result.reason` is only accessed
    // on rejected promises, as TypeScript can correctly infer the type in the `else` block.
    if (result.status === 'fulfilled') {
      if (result.value) {
        allItems.push(...result.value);
      }
    } else {
      console.error('A source failed to load:', result.reason);
    }
  });

  // Sort by date descending by default
  allItems.sort((a, b) => {
    if (!a.pubDate) return 1;
    if (!b.pubDate) return -1;
    return b.pubDate.getTime() - a.pubDate.getTime();
  });

  return allItems;
};