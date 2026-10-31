import styles from './Challenging.module.css';
import Ellipse26 from '../../assets/challenging/Ellipse26.svg';
import Check from '../../assets/challenging/Check.svg';
import Bug from '../../assets/challenging/Bug.svg';
import Rocket from '../../assets/challenging/Rocket.svg';
import Lightning from '../../assets/challenging/Lightning.svg';
import Improv from '../../assets/challenging/improv.svg';
import IconDesign from '../../assets/challenging/IconDesign.svg';   
import IconDolars from '../../assets/challenging/IconDolars.svg';   
import IconKey from '../../assets/challenging/IconKey.svg';   

// Historical release data schema for the product changelog timeline
const updates = [
  {
    version: 'v6.0 – Current System ', 
    title: 'The Intelligence Update', 
    date: 'Released: May 24, 2024', 
    background: 'white', 
    label: 'NEW FEATURES',
    features: [
      { text: 'Enhanced Automation Engine: Native support for multi-step conditional workflows and cross-platform hooks.' }, 
      { text: 'Synkra AI v2: Context-aware assistant capable of drafting entire project briefs based on raw notes.' }
    ],
    secondLabel: 'IMPROVEMENTS', 
    secondFeature: { 
      text: 'Integrated Design System documentation directly within the editor for real-time brand alignment.', 
      icon: 'improvement' 
    },
  },
  {
    version: 'v5.0',
    title: 'Digital Architect', 
    date: 'Released: February 12, 2024', 
    background: 'gray', 
    label: 'NEW FEATURES',
    features: [
      { text: 'Visual Overhaul: Complete redesign of the interface focusing on focus-modes and structural logic layers.' }, 
      { text: 'Real-time Observation: Live tracking of infrastructure health and workflow throughput.' }
    ],
  },
  {
    version: 'v4.0', 
    title: 'Editorial Studio', 
    date: 'Released: October 05, 2023', 
    background: 'gray', 
    label: 'NEW FEATURES',
    features: [
      { text: 'Editorial Studio: A dedicated space for long-form documentation and collaborative writing.' }
    ],
    secondLabel: 'BUG FIXES', 
    secondFeature: { 
      text: 'Resolved precision UI component rendering issues on high-DPI displays.', 
      icon: 'bug' 
    },
  },
  {
    version: 'v1.0 – v3.0', 
    title: 'Foundation Era', 
    date: '2022 – Early 2023', 
    background: 'gray', 
    label: 'CORE INFRASTRUCTURE',
    features: [
      { text: 'The building blocks that made Synkra possible. Initial focus was on stability, core workflow triggers, and secure data handling.', icon: null }, 
      { text: 'Initial platform launch with workspace management.', icon: 'rocket' }, 
      { text: 'Basic workflow triggers and integration layer.', icon: 'lightning' }
    ],
  },
];

/**
 * Maps asset keys to static SVG public assets.
 */
function ItemIcon({ name }) {
  const iconFiles = {
    check: Check,
    improvement: Improv,
    bug: Bug,
    rocket: Rocket,
    lightning: Lightning,
    design: IconDesign,  
    Key: IconKey,      
    dolars: IconDolars, 
  };

  return <img className={styles.itemIcon} src={iconFiles[name]} alt="" aria-hidden="true" />;
}

/**
 * Single feature entry with an optional status icon.
 */
function FeatureRow({ text, icon = 'check' }) {
  return (
    <div className={styles.featureRow}>
      {icon && <ItemIcon name={icon} />}
      <span>{text}</span>
    </div>
  );
}

/**
 * Render block for grouped release notes, features, and fixes.
 */
function ReleaseCard({ release }) {
  return (
    <div className={`${styles.releaseCard} ${styles[release.background]}`}>
      <span className={styles.cardLabel}>{release.label}</span>
      {release.features.map((feature) => (
        <FeatureRow key={feature.text} text={feature.text} icon={feature.icon} />
      ))}
      {release.secondFeature && (
        <>
          <span className={`${styles.cardLabel} ${styles.greenLabel}`}>{release.secondLabel}</span>
          <FeatureRow text={release.secondFeature.text} icon={release.secondFeature.icon} />
        </>
      )}
    </div>
  );
}

/**
 * Alternating timeline container node for individual releases.
 */
function TimelineItem({ release, index }) {
  return (
    <article className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}>
      <div className={styles.releaseInfo}>
        <span className={`${styles.version} ${index === 0 ? styles.current : ''}`}>
          {release.version.includes('v5.0') && (
            <img src={IconKey} alt="" style={{ width: '12px', height: '12px', marginRight: '5px', verticalAlign: '-1px', display: 'inline-block' }} />
          )}
          {release.version.includes('v4.0') && (
            <img src={IconDesign} alt="" style={{ width: '12px', height: '12px', marginRight: '5px', verticalAlign: '-1px', display: 'inline-block' }} />
          )}
          {release.version.includes('v1.0 – v3.0') && (
            <img src={IconDolars} alt="" style={{ width: '12px', height: '12px', marginRight: '5px', verticalAlign: '-1px', display: 'inline-block' }} />
          )}
          {release.version}
        </span>
        <h2>{release.title}</h2>
        <p>{release.date}</p>
      </div>
      <ReleaseCard release={release} />
    </article>
  );
}

/**
 * Bottom converting banner and brand quote section.
 */
function CallToAction() {
  return (
    <section className={styles.callToAction}>
      <img className={styles.ctaOverlay} src={Ellipse26} alt="" aria-hidden="true" />
      <img className={styles.ctaEllipse} src={Ellipse26} alt="" aria-hidden="true" />
      <h2>Your team is spending hours on work<br />that <em>Synkra</em> can run in seconds</h2>
      <div className={styles.ctaButtons}>
        <a className={styles.primaryButton} href="#signup">Create an Account</a>
        <a className={styles.secondaryButton} href="#contact">Talk to our team instead <span>♧</span></a>
      </div>
      <p className={styles.ctaNote}>
        <span className={styles.ctaStar}>*</span>Ship your first live playbook in 10 minutes. No credit card, no setup call required.
      </p>
      <p className={styles.quote}>
        “We don&apos;t just build software, we cultivate an ecosystem where every operational detail is treated with the reverence of fine art. Reliability is our ultimate aesthetic.”
      </p>
      <div className={styles.author}>
        <strong>PABLO THOMPSON</strong>
        <span>– CO-FOUNDER &amp; CHIEF VISIONARY –</span>
      </div>
    </section>
  );
}

export default function Challenging() {
  return (
    <div className={styles.page}>
      <main>
        {/* Page Header Header */}
        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>◷ &nbsp;CHANGELOG</span>
            <h1>What&apos;s new in<br />Synkra</h1>
            <div className={styles.blueLine} />
          </div>
          <p>
            Refining modern workflows with precision and intelligence. Explore the evolution of <em>Synkra</em> as we build the future of collaborative productivity.
          </p>
        </section>

        {/* Release Timeline */}
        <section className={styles.timeline}>
          {updates.map(function (update, index) {
            return <TimelineItem key={update.version} release={update} index={index} />;
          })}
        </section>

        {/* Conversion CTA Footer */}
        <CallToAction />
      </main>
    </div>
  );
}