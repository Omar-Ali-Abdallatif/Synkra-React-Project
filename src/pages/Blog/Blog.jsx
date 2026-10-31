import { useMemo, useState } from 'react';
import bookIcon from '../../assets/blog-images/book-icon.svg'
import mainImage from '../../assets/blog-images/Main-image.png';
import cultureImage from '../../assets/blog-images/culture-img.png';
import opsImage from '../../assets/blog-images/ops-strategy-img.png';
import productImage from '../../assets/blog-images/product-update-img.png';
import scalabilityImage from '../../assets/blog-images/scalability-img.png';
import personImage from '../../assets/blog-images/person-img.png';
import headphoneIcon from '../../assets/blog-images/headphone-icon.svg'
import styles from './Blog.module.css';

const categories = [
  'All',
  'Engineering',
  'Product Design',
  'Scalability',
  'Culture',
  'Ops Strategy',
  'User Experience',
  'Quality Assurance',
  'Marketing',
  'Customer Support',
  'Data Analysis',
];

const posts = [
  {
    category: 'Ops Strategy',
    title: 'The 5 workflows every SaaS team should automate first.',
    excerpt: 'The real gains aren’t in the flashy overhauls, but in targeting those repetitive tasks that drain your team’s time. We’re talking about reclaiming those lost hours. Here’s a proven automation sequence to get started.',
    author: 'Elena Marsh',
    date: 'March 28, 2026',
    readTime: '12 min read',
    image: opsImage,
    initials: 'EM',
    tone: 'blue',
  },
  {
    category: 'Product Updates',
    title: 'Synkra AI v2: Event-based triggers & 3x faster runs.',
    excerpt: 'Synkra AI v2 is here, and it’s a game-changer. We’ve completely overhauled our trigger engine based on your feedback. Discover how these changes make Synkra faster and more responsive.',
    author: 'Dev Team',
    date: 'March 28, 2026',
    readTime: '12 min read',
    image: productImage,
    initials: 'DT',
    tone: 'neutral',
  },
  {
    category: 'Scalability',
    title: 'Zapier vs Make vs Synkra: The honest breakdown.',
    excerpt: 'We surveyed 40 teams who migrated from other platforms to understand their reasons for switching to Synkra. Here’s an unedited look at their responses, highlighting the key benefits and improvements they experience.',
    author: 'Sam Okafor',
    date: 'April 5, 2026',
    readTime: '10 min read',
    image: scalabilityImage,
    initials: 'SO',
    tone: 'teal',
  },
  {
    category: 'Culture',
    title: 'Why PMs should own the ops, not just the roadmap.',
    excerpt: 'In the quest for peak efficiency, the chasm between product vision and engineering execution can be surprisingly wide. The famous ‘Ops abyss’ often spells the doom of velocity. We’re diving deep into how a culture of shared ownership over internal tools and infrastructure acts as the bedrock for superior external product experiences.',
    author: 'Sam Okafor',
    date: 'April 5, 2026',
    readTime: '10 min read',
    image: cultureImage,
    initials: 'SO',
    tone: 'teal',
  },
];

function Author({ initials, name, date, tone, avatar, readTime = '12 min read' }) {
  return (
    <div className={styles.author}>
      {avatar ? <img src={avatar} alt="" /> : <span className={`${styles.initials} ${styles[tone]}`}>{initials}</span>}
      <div>
        <strong>{name}</strong>
        <small>{readTime} · {date}</small>
      </div>
    </div>
  );
}

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const visiblePosts = useMemo(
    () => selectedCategory === 'All' ? posts : posts.filter((post) => post.category === selectedCategory),
    [selectedCategory],
  );

  return (
    <main className={styles.blogPage}>
      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>
            <img src={bookIcon} alt="" /> From the Synkra blog</span>
          <h1>The Synkra Blog</h1>
          <div className={styles.heroRule} />
        </div>
        <p>Ops strategy, product thinking, and honest stories<br className={styles.desktopOnly} /> about how SaaS teams actually run.</p>
      </section>

      <div className={styles.categories} aria-label="Blog categories">
        {categories.map((category) => (
          <button
            className={selectedCategory === category ? styles.selected : ''}
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {selectedCategory === 'All' && (
        <article className={styles.featuredPost}>
          <img src={mainImage} alt="Blue glass office building" />
          <div className={styles.featuredContent}>
            <span className={styles.postCategory}>Scalability</span>
            <h2>The Future of Digital Infrastructure is Intentional</h2>
            <p>As we move beyond reactive DevOps, the next era of infrastructure belongs to the architects who build for intent, not just availability.</p>
            <Author name="Marcus Chen" date="March 28, 2026" avatar={personImage} />
          </div>
        </article>
      )}

      <section className={styles.postGrid}>
        {visiblePosts.map((post) => (
          <article className={`${styles.postCard} ${post.category === 'Culture' ? styles.featuredGridCard : ''}`} key={post.title}>
            <img className={styles.postImage} src={post.image} alt="" />
            <div className={styles.postCardContent}>
              <span className={styles.postCategory}>{post.category}</span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <Author {...post} />
            </div>
          </article>
        ))}
        {selectedCategory === 'All' && (
          <aside className={styles.newsletter}>
            <span className={styles.postCategory}>Newsletter</span>
            <h2>Ops thinking, once a week.<br />No noise.</h2>
            <p>Join 4,000+ engineers and product leaders receiving our weekly teardown of the best SaaS ops practices.</p>
            <form>
              <input type="email" placeholder="work@email.com" aria-label="Email address" />
              <button type="submit">Subscribe</button>
            </form>
          </aside>
        )}
      </section>

      <div className={styles.pagination}>
        <span>Showing <strong>1 to {visiblePosts.length+1} of 24</strong> data</span>
        <div>
          <span>Page</span>
          <button type="button" aria-label="Previous page">‹</button>
          <b>1</b>
          <span>of</span>
          <b>5</b>
          <span>pages</span>
          <button className={styles.next} type="button" aria-label="Next page">›</button>
        </div>
      </div>

      <section className={styles.ctaSection} aria-labelledby="blog-cta-title">
        <div className={styles.ctaCard}>
          <div className={styles.ctaOrnament} aria-hidden="true" />
          <div className={styles.ctaContent}>
            <h2 id="blog-cta-title">Your team is spending hours on work<br className={styles.desktopOnly} /> that <em>Synkra</em> can run in seconds</h2>
            <div className={styles.ctaActions}>
              <a className={styles.ctaPrimary} href="#create-account">Create an Account</a>
              <a className={styles.ctaSecondary} href="#talk-to-team">
                Talk to our team instead
                <img src={headphoneIcon} alt="" />
              </a>
            </div>
            <p className={styles.ctaNote}>*Ship your first live playbook in 10 minutes. No credit card, no setup call required.</p>
          </div>
          <div className={styles.ctaQuote}>
            <blockquote>“We don’t just build software, we cultivate an ecosystem where every operational detail is treated<br className={styles.desktopOnly} /> with the reverence of fine art. Reliability is our ultimate aesthetic.”</blockquote>
            <div>
              <strong>PABLO THOMPSON</strong>
              <span>CO-FOUNDER &amp; CHIEF VISIONARY</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Blog;