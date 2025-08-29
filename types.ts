
export interface NewsItem {
  title: string;
  link: string;
  description: string;
  pubDate: Date | null;
  imageUrl?: string;
  source: string;
  category?: string;
}

export interface NewsFeed {
  name: string;
  url: string;
  type?: 'api';
}

export interface NewsCategory {
  name: string;
  feeds: NewsFeed[];
}
