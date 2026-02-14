import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { newsArticles, newsCategories, newsAllTags } from "../data/newsData";

function News() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const featuredArticles = useMemo(() => {
    return newsArticles.filter((article) => article.featured);
  }, []);

  const filteredArticles = useMemo(() => {
    let filtered = newsArticles.filter((article) => {
      const categoryMatch = selectedCategory === 'All' || article.category === selectedCategory;
      const tagMatch = selectedTag === 'All' || article.tags.includes(selectedTag);
      const searchMatch = searchQuery === '' || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && tagMatch && searchMatch;
    });

    // Sort articles
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'popular') {
      // Sort by view count (stored in localStorage)
      filtered.sort((a, b) => {
        const viewsA = parseInt(localStorage.getItem(`articleViews_${a.id}`) || '0', 10);
        const viewsB = parseInt(localStorage.getItem(`articleViews_${b.id}`) || '0', 10);
        return viewsB - viewsA;
      });
    }

    return filtered;
  }, [selectedCategory, selectedTag, searchQuery, sortBy]);

  useEffect(() => {
    if (!isPlaying || featuredArticles.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, featuredArticles.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length);
  };

  return (
    <div className="stack" style={{ padding: 0 }}>
      {/* Featured Carousel */}
      {featuredArticles.length > 0 && (
        <section className="news-carousel-container">
          {featuredArticles.map((article, index) => (
            <div
              key={article.id}
              className={`news-carousel-slide ${index === currentSlide ? 'active' : ''} ${index === (currentSlide - 1 + featuredArticles.length) % featuredArticles.length ? 'prev' : ''}`}
            >
              <div className="news-carousel-background" style={{ backgroundImage: `url(${article.imageUrl})` }} />
              <div className="news-carousel-overlay" />
              <div className="news-carousel-content">
                <Link to={`/news/${article.id}`} className="news-carousel-title-link">
                  <h1 className="news-carousel-title">{article.title}</h1>
                </Link>
              </div>
            </div>
          ))}
          
          <div className="news-carousel-controls">
            <button className="news-carousel-nav" onClick={prevSlide} aria-label="Previous slide">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="news-carousel-nav" onClick={nextSlide} aria-label="Next slide">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          <div className="news-carousel-indicators">
            {featuredArticles.map((_, index) => (
              <button
                key={index}
                className={`news-carousel-indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button 
            className="news-carousel-playpause"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <span className="material-symbols-outlined">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
        </section>
      )}

      <section className="section soft" style={{ paddingTop: '2rem' }}>
        <div className="news-header">
          <div className="news-search-container">
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }}>search</span>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="news-search-input"
            />
          </div>
          
          <div className="news-sort-container">
            <label htmlFor="sort-select" style={{ marginRight: '8px', fontSize: '14px', fontWeight: '500' }}>Sort by:</label>
            <select 
              id="sort-select"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="news-sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title (A-Z)</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          <div className="news-article-count">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
          </div>
        </div>

        <div className="filters">
          <div className="filter-group">
            <span className="filter-label">Category</span>
            <div className="filter-row">
              {newsCategories.map((category) => (
                <button
                  key={category}
                  className={selectedCategory === category ? 'filter active' : 'filter'}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <span className="filter-label">Tag</span>
            <div className="filter-row">
              {newsAllTags.map((tag) => (
                <button
                  key={tag}
                  className={selectedTag === tag ? 'filter active' : 'filter'}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid news-grid">
        {filteredArticles.map((article) => (
          <Link key={article.id} to={`/news/${article.id}`} className="news-card">
            <div className="news-card-image">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="news-card-img"
                loading="lazy"
              />
            </div>
            <div className="news-card-content">
              <div className="news-meta">
                <span>{article.category}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <div className="news-tags">
                {article.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="button button-secondary" style={{ marginTop: '12px', display: 'inline-block' }}>
                Read Article →
              </span>
            </div>
          </Link>
        ))}
      </section>

      {filteredArticles.length === 0 && (
        <section className="section" style={{ textAlign: 'center' }}>
          <p>No articles found. Try a different category or tag.</p>
        </section>
      )}
    </div>
  );
}

export default News;
