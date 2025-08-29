import type { NewsCategory } from './types';

export const NEWS_CATEGORIES: NewsCategory[] = [
  {
    name: 'General & Politics',
    feeds: [
      { name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/rss.xml' },
      { name: 'CNN', url: 'http://rss.cnn.com/rss/edition.rss' },
      { name: 'Reuters', url: 'https://www.reuters.com/world/index.xml' },
      { name: 'The Guardian', url: 'https://www.theguardian.com/world/rss' },
      { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml' },
      { name: 'Associated Press', url: 'https://apnews.com/apf-topnews/rss.xml' },
      { name: 'NPR', url: 'https://feeds.npr.org/1001/rss.xml' },
      { name: 'New York Times', url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml' },
    ],
  },
  {
    name: 'Technology',
    feeds: [
      { name: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
      { name: 'Wired', url: 'https://www.wired.com/feed/rss' },
      { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml' },
      { name: 'Ars Technica', url: 'http://feeds.arstechnica.com/arstechnica/index' },
      { name: 'Mashable', url: 'http://feeds.mashable.com/Mashable' },
      { name: 'Hacker News', url: 'https://news.ycombinator.com/rss' },
      { name: 'Engadget', url: 'https://www.engadget.com/rss.xml' },
      { name: 'VentureBeat', url: 'https://venturebeat.com/feed/' },
    ],
  },
  {
    name: 'Business & Finance',
    feeds: [
      { name: 'Bloomberg', url: 'https://feeds.bloomberg.com/markets/news.rss' },
      { name: 'Forbes', url: 'https://www.forbes.com/business/feed/' },
      { name: 'CNBC', url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html' },
      { name: 'Financial Times', url: 'https://www.ft.com/?format=rss' },
      { name: 'The Economist', url: 'https://www.economist.com/latest/rss.xml' },
      { name: 'MarketWatch', url: 'https://www.marketwatch.com/rss/topstories' },
      { name: 'Wall Street Journal', url: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml' },
      { name: 'Business Insider', url: 'https://www.businessinsider.com/rss' },
    ],
  },
 //{
 //  name: 'Sports',
 //  feeds: [
 //    { name: 'ESPN', url: 'https://www.espn.com/espn/rss/news' },
 //    { name: 'BBC Sport', url: 'https://feeds.bbci.co.uk/sport/rss.xml' },
 //    { name: 'Sky Sports', url: 'https://www.skysports.com/rss/12040' },
 //    { name: 'NFL', url: 'https://www.nfl.com/rss/rsslanding?searchString=home' },
 //  ],
 //},
  {
    name: 'Entertainment',
    feeds: [
      { name: 'Variety', url: 'https://variety.com/feed/' },
      { name: 'Rolling Stone', url: 'https://www.rollingstone.com/music/music-news/feed/' },
      { name: 'Billboard', url: 'https://www.billboard.com/feed/' },
      { name: 'E! Online', url: 'https://www.eonline.com/syndication/feeds/rssfeeds/topstories' },
      { name: 'Pitchfork', url: 'https://pitchfork.com/feed/rss' },
      { name: 'Deadline', url: 'https://deadline.com/feed/' },
      { name: 'Hollywood Reporter', url: 'https://www.hollywoodreporter.com/feed/' },
    ],
  },
  {
    name: 'Science & Education',
    feeds: [
        { name: 'NASA', url: 'https://www.nasa.gov/rss/dyn/breaking_news.rss' },
        { name: 'Nature', url: 'https://www.nature.com/nature.rss' },
        { name: 'Scientific American', url: 'https://www.scientificamerican.com/feed/' },
        { name: 'Smithsonian', url: 'https://www.smithsonianmag.com/rss/smart-news/' },
        { name: 'TED Talks Daily', url: 'https://feeds.feedburner.com/tedtalks_video' },
        { name: 'Science Magazine', url: 'https://www.sciencemag.org/rss/current.xml' },
        { name: 'Live Science', url: 'https://www.livescience.com/feeds/all' },
        { name: 'Popular Science', url: 'https://www.popsci.com/feed/' },
    ],
  },
];