import { Link, useParams } from "react-router-dom";
import { newsArticles } from "../data/newsData";
import { useMemo, useState, useEffect } from "react";

function NewsArticle() {
  const { id } = useParams();
  const article = newsArticles.find((item) => item.id === parseInt(id));
  const [readProgress, setReadProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Calculate reading progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check bookmark status
  useEffect(() => {
    if (article) {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
      setIsBookmarked(bookmarks.includes(article.id));
    }
  }, [article]);

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return newsArticles
      .filter((item) => 
        item.id !== article.id && 
        (item.category === article.category || 
         item.tags.some(tag => article.tags.includes(tag)))
      )
      .slice(0, 3);
  }, [article]);

  // Previous and next articles
  const prevArticle = useMemo(() => {
    if (!article) return null;
    const currentIndex = newsArticles.findIndex(a => a.id === article.id);
    return currentIndex > 0 ? newsArticles[currentIndex - 1] : null;
  }, [article]);

  const nextArticle = useMemo(() => {
    if (!article) return null;
    const currentIndex = newsArticles.findIndex(a => a.id === article.id);
    return currentIndex < newsArticles.length - 1 ? newsArticles[currentIndex + 1] : null;
  }, [article]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
    if (isBookmarked) {
      const updated = bookmarks.filter(id => id !== article.id);
      localStorage.setItem('bookmarkedArticles', JSON.stringify(updated));
      setIsBookmarked(false);
    } else {
      bookmarks.push(article.id);
      localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarks));
      setIsBookmarked(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tableOfContents = article.id === 1 ? [
    { id: 'highlights', title: 'Our K3s Architecture' },
    { id: 'implementation', title: 'From VPS to K3s' },
    { id: 'conclusion', title: 'The Result' }
  ] : [
    { id: 'highlights', title: 'Key Highlights' },
    { id: 'implementation', title: 'Technical Implementation' },
    { id: 'conclusion', title: 'Conclusion' }
  ];

  const shareArticle = (platform) => {
    const url = window.location.href;
    const title = article.title;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  if (!article) {
    return (
      <div className="section" style={{ textAlign: 'center' }}>
        <h2>Article not found</h2>
        <p>The article you're looking for doesn't exist. Return to the news list.</p>
        <Link className="link" to="/news">Back to News</Link>
      </div>
    );
  }

  return (
    <div className="stack">
      {/* Reading Progress Bar */}
      <div className="reading-progress-bar" style={{ width: `${readProgress}%` }} />

      <section className="news-article-hero" style={{ backgroundImage: `url(${article.imageUrl})` }}>
        <div className="news-article-hero-overlay" />
        <div className="news-article-hero-content">
          <span className="news-article-category-badge">{article.category}</span>
          <h1>{article.title}</h1>
          <div className="news-article-meta">
            <span>{article.readTime}</span>
            <span>•</span>
            <span>{article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '3rem' }}>
        <div style={{ display: 'flex', gap: '3rem', maxWidth: '1200px', margin: '0 auto', alignItems: 'flex-start' }}>
          {/* Table of Contents - Sidebar */}
          <aside className="article-toc">
            <div className="article-toc-sticky">
              <h4>Table of Contents</h4>
              <ul>
                {tableOfContents.map((item) => (
                  <li key={item.id}>
                    <button onClick={() => scrollToSection(item.id)}>{item.title}</button>
                  </li>
                ))}
              </ul>
              
              <div className="article-actions">
                <button 
                  className="article-action-btn" 
                  onClick={toggleBookmark}
                  title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
                >
                  <span className="material-symbols-outlined">
                    {isBookmarked ? 'bookmark' : 'bookmark_border'}
                  </span>
                </button>
                <button 
                  className="article-action-btn" 
                  onClick={handlePrint}
                  title="Print article"
                >
                  <span className="material-symbols-outlined">print</span>
                </button>
              </div>
              
              <div className="article-stats">
                <div className="stat-item">
                  <span className="material-symbols-outlined">visibility</span>
                  <span>1.2K views</span>
                </div>
                <div className="stat-item">
                  <span className="material-symbols-outlined">schedule</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="news-article-content">
            <div style={{ maxWidth: '850px' }}>
              <p style={{ fontSize: '1.25rem', lineHeight: 1.8, fontWeight: 500, marginBottom: '2rem', color: '#475569' }} className="news-article-excerpt">
                {article.excerpt}
              </p>
              
              <div className="news-article-body">{article.id === 1 ? (
                // Specific content for Platform 2.0 article
                <>
                  <p>
                    Today marks a significant milestone in our journey as we unveil Citricloud Platform 2.0, built on a cutting-edge 
                    Kubernetes architecture that revolutionizes how we deliver cloud services. At the heart of this transformation is 
                    <strong> k3s</strong>, a lightweight yet powerful Kubernetes distribution that forms the foundation of our infrastructure.
                  </p>
                  
                  <h2 id="highlights">Our K3s Architecture</h2>
                  <p>
                    Our platform is built on a robust <strong>k3s cluster</strong> consisting of multiple nodes that work together to provide 
                    high availability and seamless scaling. K3s gives us the power of full Kubernetes with a fraction of the resource overhead, 
                    making it perfect for our multi-cloud and edge deployment strategy.
                  </p>
                  <p>
                    The cluster architecture includes:
                  </p>
                  <ul>
                    <li><strong>Control Plane Nodes</strong>: Managing the cluster state, scheduling workloads, and maintaining system health</li>
                    <li><strong>Worker Nodes</strong>: Running containerized applications with automatic load distribution</li>
                    <li><strong>MetalLB Load Balancer</strong>: Providing native load balancing capabilities for bare-metal Kubernetes clusters</li>
                  </ul>

                  <h3 id="implementation">From VPS to K3s: A Transformation Story</h3>
                  <p>
                    To truly appreciate the power of our new architecture, let's compare our old Virtual Private Server (VPS) setup 
                    with the new k3s-based infrastructure:
                  </p>
                  
                  <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '2rem', margin: '2rem 0' }}>
                    <h4 style={{ marginTop: 0 }}>Old VPS Setup</h4>
                    <ul>
                      <li>Single server or manually managed multiple servers</li>
                      <li>Manual deployment processes and configuration</li>
                      <li>Limited scalability requiring manual intervention</li>
                      <li>No automatic failover or self-healing capabilities</li>
                      <li>Complex load balancing setup with additional tools</li>
                      <li>Difficult to replicate environments consistently</li>
                    </ul>
                  </div>

                  <div style={{ background: '#f0f9ff', borderRadius: '12px', padding: '2rem', margin: '2rem 0', border: '2px solid #0ea5e9' }}>
                    <h4 style={{ marginTop: 0, color: '#0ea5e9' }}>New K3s Setup ✓</h4>
                    <ul>
                      <li><strong>Distributed cluster</strong> with automatic workload orchestration</li>
                      <li><strong>Declarative deployments</strong> via YAML manifests and GitOps</li>
                      <li><strong>Horizontal auto-scaling</strong> based on demand</li>
                      <li><strong>Self-healing infrastructure</strong> that automatically restarts failed containers</li>
                      <li><strong>MetalLB integration</strong> for native load balancing without external dependencies</li>
                      <li><strong>Consistent environments</strong> from development to production</li>
                    </ul>
                  </div>

                  <h3>Powered by Docker, Managed by Portainer</h3>
                  <p>
                    Every service on the Citricloud platform runs in <strong>Docker containers</strong>, ensuring consistency, portability, 
                    and isolation. This containerization strategy allows us to:
                  </p>
                  <ul>
                    <li>Package applications with all their dependencies</li>
                    <li>Deploy identical containers across development, staging, and production</li>
                    <li>Scale services independently based on demand</li>
                    <li>Roll back deployments instantly if issues arise</li>
                  </ul>
                  <p>
                    To manage our containerized infrastructure, we use <strong>Portainer</strong>, a powerful container management platform 
                    that provides a user-friendly interface for monitoring and managing our Docker and Kubernetes environments. Portainer 
                    gives our team real-time visibility into cluster health, resource usage, and application status.
                  </p>

                  <h3>Continuous Deployment with GitHub Actions</h3>
                  <p>
                    Our entire deployment pipeline is automated through <strong>GitHub Actions</strong>, implementing true GitOps principles. 
                    Every code change goes through:
                  </p>
                  <ol>
                    <li><strong>Automated Testing</strong>: Unit tests, integration tests, and security scans run on every commit</li>
                    <li><strong>Container Building</strong>: Docker images are built and tagged automatically</li>
                    <li><strong>Registry Push</strong>: Images are pushed to GitHub Container Registry (ghcr.io)</li>
                    <li><strong>Kubernetes Deployment</strong>: K3s cluster pulls new images and performs rolling updates</li>
                    <li><strong>Health Checks</strong>: Automated verification ensures deployments succeed before routing traffic</li>
                  </ol>
                  <p>
                    This pipeline means we can deploy updates multiple times per day with confidence, knowing that every change 
                    is tested, versioned, and can be rolled back instantly if needed.
                  </p>

                  <h3>MetalLB: Load Balancing for Bare Metal</h3>
                  <p>
                    One of the key challenges with running Kubernetes on bare metal infrastructure is providing load balancing 
                    capabilities. In cloud environments, this is typically handled by the provider's load balancer service. 
                    We solved this with <strong>MetalLB</strong>, a load-balancer implementation for bare metal Kubernetes clusters.
                  </p>
                  <p>
                    MetalLB provides:
                  </p>
                  <ul>
                    <li><strong>Layer 2 and BGP modes</strong> for different networking scenarios</li>
                    <li><strong>External IP allocation</strong> from a configured address pool</li>
                    <li><strong>Automatic failover</strong> and high availability</li>
                    <li><strong>Native Kubernetes integration</strong> using standard Service resources</li>
                  </ul>
                  <p>
                    This means our services get the same load balancing capabilities you'd expect from major cloud providers, 
                    but running on our own infrastructure with complete control and no vendor lock-in.
                  </p>

                  <h3 id="conclusion">The Result: Enterprise-Grade Infrastructure</h3>
                  <p>
                    The combination of k3s, Docker, Portainer, GitHub Actions, and MetalLB has transformed Citricloud into 
                    an enterprise-grade platform that delivers:
                  </p>
                  <ul>
                    <li>99.9% uptime with automatic failover and self-healing</li>
                    <li>Sub-second deployment times with rolling updates</li>
                    <li>Horizontal scaling that automatically adjusts to demand</li>
                    <li>Complete infrastructure-as-code with GitOps workflows</li>
                    <li>Enhanced security with isolated containers and automated patching</li>
                  </ul>
                  <p>
                    Platform 2.0 isn't just an upgrade—it's a complete reimagining of how we deliver cloud services. 
                    By embracing modern cloud-native technologies and best practices, we've built an infrastructure that's 
                    ready for the next decade of innovation.
                  </p>
                </>
              ) : (
                // Generic content for other articles
                <>
                  <p>
                    In today's rapidly evolving cloud landscape, organizations face unprecedented challenges 
                    in managing their infrastructure efficiently while maintaining security and cost-effectiveness. 
                    This article explores the latest developments and best practices in cloud engineering.
                  </p>
                  <h2 id="highlights">Key Highlights</h2>
                  <p>
                    Our team has been working tirelessly to deliver innovative solutions that address the most 
                    pressing needs of modern cloud operations. Through extensive research and collaboration with 
                    industry leaders, we've identified several critical areas for improvement.
                  </p>
                  <h3 id="implementation">Technical Implementation</h3>
                  <p>
                    The implementation of these new features required careful consideration of multiple factors, 
                    including scalability, reliability, and user experience. Our engineering team has developed 
                    a robust architecture that can handle enterprise-scale workloads while maintaining optimal performance.
                  </p>
                  <h3 id="conclusion">Conclusion</h3>
                  <p>
                    As the cloud landscape continues to evolve, staying ahead requires continuous learning and adaptation. 
                    We're committed to sharing our insights and helping teams navigate the complexities of modern cloud infrastructure.
                  </p>
                </>
              )}
              </div>

            <div className="news-tags" style={{ marginTop: '2rem' }}>
              {article.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            {/* Author Profile */}
            <div className="author-profile">
              <div className="author-avatar">
                <span className="material-symbols-outlined">account_circle</span>
              </div>
              <div className="author-info">
                <h4>About {article.author}</h4>
                <p>
                  {article.author} is a member of the Citricloud team, specializing in cloud infrastructure, 
                  DevOps practices, and modern software architecture. With years of experience in enterprise 
                  cloud solutions, they regularly share insights on building scalable and reliable systems.
                </p>
              </div>
            </div>

            {/* Share Article */}
            <div className="news-article-share">
              <h3>Share this article</h3>
              <div className="news-article-share-buttons">
                <button className="share-button" onClick={() => shareArticle('twitter')} title="Share on Twitter">
                  <span className="material-symbols-outlined">share</span>
                </button>
                <button className="share-button" onClick={() => shareArticle('linkedin')} title="Share on LinkedIn">
                  <span className="material-symbols-outlined">share</span>
                </button>
                <button className="share-button" onClick={() => shareArticle('facebook')} title="Share on Facebook">
                  <span className="material-symbols-outlined">share</span>
                </button>
                <button className="share-button" onClick={() => shareArticle('email')} title="Share via Email">
                  <span className="material-symbols-outlined">email</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* Previous/Next Navigation */}
      <section className="article-navigation">
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '2rem' }}>
          {prevArticle ? (
            <Link to={`/news/${prevArticle.id}`} className="article-nav-card prev">
              <span className="article-nav-label">
                <span className="material-symbols-outlined">arrow_back</span>
                Previous Article
              </span>
              <h4>{prevArticle.title}</h4>
              <span className="article-nav-meta">{prevArticle.category} • {prevArticle.readTime}</span>
            </Link>
          ) : (
            <div className="article-nav-card disabled" />
          )}
          
          {nextArticle ? (
            <Link to={`/news/${nextArticle.id}`} className="article-nav-card next">
              <span className="article-nav-label">
                Next Article
                <span className="material-symbols-outlined">arrow_forward</span>
              </span>
              <h4>{nextArticle.title}</h4>
              <span className="article-nav-meta">{nextArticle.category} • {nextArticle.readTime}</span>
            </Link>
          ) : (
            <div className="article-nav-card disabled" />
          )}
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="section soft">
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Related Articles</h2>
            <div className="news-related-grid">
              {relatedArticles.map((related) => (
                <Link key={related.id} to={`/news/${related.id}`} className="news-card">
                  <div className="news-card-image">
                    <img 
                      src={related.imageUrl} 
                      alt={related.title}
                      className="news-card-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="news-card-content">
                    <div className="news-meta">
                      <span>{related.category}</span>
                      <span>•</span>
                      <span>{related.readTime}</span>
                    </div>
                    <h3>{related.title}</h3>
                    <p>{related.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2>Continue exploring</h2>
          <p>Catch more insights from the Citricloud team.</p>
          <Link className="link" to="/news">Browse all articles →</Link>
        </div>
      </section>
    </div>
  );
}

export default NewsArticle;
