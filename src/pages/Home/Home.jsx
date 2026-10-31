import Questions from '../../components/questionsComponent/Questions';
import Heroimg from '../../assets/Home/hero-card.svg';
import styles from './Home.module.css';

// Partner / Client brand logos
const companies = ['VOLT', 'SPHERE', 'LUMINA', 'ORBIT', 'NEXUS'];

// Core metrics displayed in the stats section
const stats = [
  {
    number: '240+',
    text: 'Active Team Members',
  },
  {
    number: '1M+',
    text: 'Workflows Processed',
  },
  {
    number: '8.4 hrs',
    text: 'Saved per week',
  },
  {
    number: '12ms',
    text: 'Global latency',
  },
];

/**
  * Hero Section
  * Main landing fold containing value proposition, CTAs, and dashboard preview.
  */
function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroText}>
        <span className={styles.eyebrow}>
          BUILT FOR MODERN OPS TEAMS
        </span>

        <h1>
          Your Ops Brain
          <br />
          for <em>Enterprise</em>
          <br />
          SaaS Teams.
        </h1>

        <p>
          Synkra watches every process in your stack, catches the work
          that falls between tools, and turns it automatically without
          slowing your team down.
        </p>

        <div className={styles.heroButtons}>
          <button className={styles.primaryButton}>
            Get early access
          </button>

          <button className={styles.secondaryButton}>
            Watch Synkra in action
          </button>
        </div>

        <small>
          No credit card required. No complicated setup.
        </small>
      </div>

      <div className={styles.heroImage}>
        <img
          src={Heroimg}
          alt="Synkra workflow dashboard preview"
        />
      </div>
    </section>
  );
}

/**
  * Social Proof Section
  * Displays brand badges and client logos.
  */
function TrustedSection() {
  return (
    <section className={styles.trusted}>
      <p>TRUSTED BY GLOBAL VISIONARIES</p>

      <div className={styles.companyList}>
        {companies.map(function (company) {
          return (
            <span key={company}>
              {company}
            </span>
          );
        })}
      </div>
    </section>
  );
}

/**
  * Performance & ROI Metrics
  * Highlighting platform impact with conversion CTAs.
  */
function StatsSection() {
  return (
    <section className={styles.stats}>
      <h2>Synkra teams move reliably, and faster.</h2>

      <p className={styles.statsIntro}>
        Measured across live teams using Synkra&apos;s built-in run tracking and time saved
        <br />
        reports, not estimated.
      </p>

      <div className={styles.statsList}>
        {stats.map(function (stat) {
          return (
            <div className={styles.statCard} key={stat.number}>
              <strong>{stat.number}</strong>
              <span>{stat.text}</span>
            </div>
          );
        })}
      </div>

      <div className={styles.statsButtons}>
        <button className={styles.statsPrimaryButton}>
          Create an Account
        </button>

        <button className={styles.statsSecondaryButton}>
          Talk to our team instead&nbsp; ◉
        </button>
      </div>

      <p className={styles.statsNote}>
        <b>*</b>Ship your first live playbook in 10 minutes. No credit card, no setup call required.
      </p>
    </section>
  );
}

/**
  * Email Capture Section
  * Newsletter subscription block.
  */
function NewsletterSection() {
  return (
    <section className={styles.newsletter}>
      <div className={styles.newsletterContent}>
        <span className={styles.newsletterLabel}>NEWSLETTER</span>

        <h2>Ops thinking, once a week. No noise.</h2>

        <p>
          Join 4,000+ engineers and product leaders receiving our weekly
          breakdown of the best SaaS ops practices.
        </p>

        <form className={styles.newsletterForm}>
          <input
            type="email"
            placeholder="work@email.com"
            aria-label="Email address"
          />

          <button type="submit">Subscribe</button>
        </form>
      </div>
    </section>
  );
}



/**
 * TestimonialsSection Component
 * 
 * Renders the "Wall of Love" section using scoped CSS Modules.
 * Includes top grid, middle featured hero testimonial, and bottom grid.
 */
 function TestimonialsSection() {

  // Top row testimonial card records
  const topTestimonials = [
    {
      id: 1,
      quote: "Our transition to a centralized data management tool has streamlined reporting processes, reducing the time spent on manual entries by 75%. Now, we can focus on strategic analysis instead of data gathering.",
      author: "Lisa Tran",
      role: "DATA ANALYST, ACME CORP",
      avatar: "https://i.pravatar.cc/150?img=32"
    },
    {
      id: 2,
      quote: "Our PMs own the workflows. Engineering reviews the critical ones, but we're not involved in every change. That separation of concerns is huge for a team our size — we stopped being a bottleneck in our own ops.",
      author: "Jamal Carter",
      role: "PRODUCT MANAGER, TECHNOVATE",
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    {
      id: 3,
      quote: "By adopting a microservices architecture, we have improved our deployment speed and reduced downtime. This shift has empowered our teams to release features bi-weekly instead of quarterly.",
      author: "Sofia Chen",
      role: "SOFTWARE ARCHITECT, NEXTGEN SOLUTIONS",
      avatar: "https://i.pravatar.cc/150?img=47"
    }
  ];

  // Primary highlight testimonial record (Center Banner)
  const featuredTestimonial = {
    quote: "Synkra cut 60% of our manual revenue ops in the first month. The best part isn't the time saved — it's knowing exactly why something failed when it does. That observability alone is worth the subscription",
    author: "Pamela Schmidt",
    role: "CO-FOUNDER, STACKLY (B2B SAAS) · 12-PERSON TEAM",
    avatar: "https://i.pravatar.cc/150?img=44"
  };

  // Bottom row testimonial card records
  const bottomTestimonials = [
    {
      id: 4,
      quote: "Switched from Make after hitting API limits constantly. Synkra's reliability is in a different class — 99.97% execution uptime is real. We've had zero critical failures in 5 months. The run logs make debugging trivial.",
      author: "Alex Kim",
      role: "HR MANAGER, INNOVATE LLC",
      avatar: "https://i.pravatar.cc/150?img=11"
    },
    {
      id: 5,
      quote: "The integration of AI-driven analytics has transformed our customer feedback loop. We're now able to respond in real-time, resulting in a 40% increase in customer satisfaction scores over the last quarter.",
      author: "David Wong",
      role: "CTO, CLOUDTECH INC",
      avatar: "https://i.pravatar.cc/150?img=60"
    },
    {
      id: 6,
      quote: "Utilizing design sprints has accelerated our product development cycle. By validating ideas quickly, we've managed to cut project timelines in half while increasing collaboration across departments.",
      author: "Emma Johnson",
      role: "UX DESIGNER, CREATIVE LABS",
      avatar: "https://i.pravatar.cc/150?img=26"
    }
  ];

  /**
   * Helper function to render individual testimonial cards
   * Prevents JSX code duplication across upper and lower grid sections
   */
  const renderCard = (card) => (
    <div key={card.id} className={styles.card}>
      <p className={styles.cardQuote}>"{card.quote}"</p>
      
      <div className={styles.authorWrapper}>
        <img 
          src={card.avatar} 
          alt={card.author} 
          className={styles.avatar} 
        />
        <div>
          <h4 className={styles.authorName}>{card.author}</h4>
          <p className={styles.authorRole}>{card.role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        
        {/* Section Header: Headline & Badge */}
        <div className={styles.headerGrid}>
          <div>
            <h2 className={styles.mainHeading}>
              Built for the world's most demanding engineering teams.
            </h2>
            <div className={styles.accentLine}></div>
          </div>

          <div>
            <span className={styles.badge}>Wall of Love</span>
            <p className={styles.headerDescription}>
              Most tools fire automations and hope for the best. <strong>Synkra</strong> treats every workflow as a first class system, it listens, decides, acts, and records exactly what happened. So your team can trust the result.
            </p>
          </div>
        </div>

        {/* Upper Grid Layout (Top 3 Cards) */}
        <div className={styles.cardsGrid}>
          {topTestimonials.map(renderCard)}
        </div>

        {/* Featured Hero Banner */}
        <div className={styles.featuredSection}>
          <div className={styles.featuredGrid}>
            
            <blockquote className={styles.featuredQuote}>
              "{featuredTestimonial.quote}"
            </blockquote>

            <div className={styles.featuredMeta}>
              <div className={styles.authorWrapper}>
                <img 
                  src={featuredTestimonial.avatar} 
                  alt={featuredTestimonial.author} 
                  className={styles.avatar} 
                  style={{ width: '48px', height: '48px' }}
                />
                <div>
                  <h3 className={styles.authorName}>{featuredTestimonial.author}</h3>
                  <p className={styles.authorRole}>{featuredTestimonial.role}</p>
                </div>
              </div>

              <div className={styles.quoteBadge}>”</div>
            </div>

          </div>
        </div>

        {/* Lower Grid Layout (Bottom 3 Cards) */}
        <div className={styles.cardsGrid}>
          {bottomTestimonials.map(renderCard)}
        </div>

      </div>
    </section>
  );
}


/**
  * Home View Entry Point
  * Aggregates key landing page sections and UI components.
  */
export default function Home() {
  return (
    <main className={styles.page}>
      <HeroSection />
      <TrustedSection />
      <StatsSection />
      <TestimonialsSection/>
      <Questions />
      <NewsletterSection />
    </main>
  );
}