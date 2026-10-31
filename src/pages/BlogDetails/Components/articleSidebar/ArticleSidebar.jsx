import styles from './ArticleSidebar.module.css';
import NewsLetterCard from './NewsletterCard';


function ArticleSidebar () {
  return (
    <div className={styles.articleSidebar}>
      <div className={styles.asideCardPlain}>
        <p className={styles.asideTitle}>IN THIS ARTICLE</p>
        <div className={styles.tocList}>
          <div className={styles.tocItemActive}>
            <span className={styles.dot}></span>
            <p>The Cost of Silent Entropy</p>
          </div>
          <div>
            <p className={styles.tocItem}>Mapping the Decision Chain</p>
            <p className={styles.tocItem}>Structuring for Scale</p>
          </div>
        </div>
      </div>
      <NewsLetterCard/>
    </div>
  );
}

export default ArticleSidebar;