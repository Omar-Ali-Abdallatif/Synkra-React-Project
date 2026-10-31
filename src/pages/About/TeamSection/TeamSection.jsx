import React from 'react';
import styles from './TeamSection.module.css';

// يمكنك استبدال هذه الصور بصور حقيقية أو استيرادها من مجلد الـ images لديك
import member1 from '../images/member1.png';
import member2 from '../images/member2.png';
import member3 from '../images/member3.png';
import member4 from '../images/member4.png';
import member5 from '../images/member5.png';
import member6 from '../images/member6.png';
import member7 from '../images/member7.png';
import member8 from '../images/member8.png';

const teamMembers = [
  {
    name: 'Pablo Thompson',
    role: 'Founder & Chief Visionary',
    tag: 'DESIGN',
    image: member1,
  },
  {
    name: 'Elena Thorne',
    role: 'CEO & Co-founder',
    tag: 'DEVELOPMENT',
    image: member2,
  },
  {
    name: 'Marcus Lee',
    role: 'CTO & Co-founder',
    tag: 'MARKETING',
    image: member3,
  },
  {
    name: 'Sofia Patel',
    role: 'Head of Product',
    tag: 'USER RESEARCH',
    image: member4,
  },
  {
    name: 'James Kim',
    role: 'Product Lead',
    tag: 'PRODUCT MANAGEMENT',
    image: member5,
  },
  {
    name: 'Oliver Chen',
    role: 'Quality Assurance',
    tag: 'QUALITY ASSURANCE',
    image: member6,
  },
  {
    name: 'Aisha Gomez',
    role: 'Data Analysis',
    tag: 'DATA ANALYSIS',
    image: member7,
  },
  {
    name: 'Natalie Brown',
    role: 'Customer Support',
    tag: 'CUSTOMER SUPPORT',
    image: member8,
  },
];

const TeamSection = () => {
  return (
    <section className={styles.teamContainer}>
      <div className={styles.teamHeader}>
        <div className={styles.headerTextGroup}>
          <h2 className={styles.teamTitle}>The Digital Craftmen of Synkra</h2>
          <p className={styles.teamSubtitle}>
            Former builders from Stripe, Linear, and HubSpot, obsessed with operational clarity.
          </p>
        </div>
        <button className={styles.growButton}>
          <span className={styles.sparkleIcon}>✨</span> We’re growing. See open roles →
        </button>
      </div>

      <div className={styles.teamGrid}>
        {teamMembers.map((member, index) => (
          <div key={index} className={styles.teamCard}>
            <div className={styles.imageContainer}>
              <img src={member.image} alt={member.name} className={styles.memberImage} />
              <span className={styles.memberTag}>{member.tag}</span>
            </div>
            <div className={styles.memberInfo}>
              <h3 className={styles.memberName}>{member.name}</h3>
              <p className={styles.memberRole}>{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;